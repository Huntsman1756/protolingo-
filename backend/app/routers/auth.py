import logging
import base64
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, File, HTTPException, Request, Response, UploadFile
from redis.asyncio import Redis
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.limiter import limiter
from app.core.security import (
    create_access_token,
    create_refresh_token,
    dummy_verify,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.services import email_service
from app.schemas.auth import (
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
    TokenResponse,
    UserResponse,
    UserUpdateRequest,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["auth"])


async def get_redis():
    redis = Redis.from_url(settings.REDIS_URL, decode_responses=True)
    try:
        yield redis
    finally:
        await redis.aclose()


@router.post("/register", response_model=RegisterResponse)
@limiter.limit("5/minute")
async def register(
    request: Request,
    data: RegisterRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
):
    if not settings.ALLOW_REGISTRATION:
        if data.invite_token:
            valid = await redis.get(f"invite:{data.invite_token}")
            if not valid:
                raise HTTPException(status_code=403, detail="Invalid or expired invite")
            await redis.delete(f"invite:{data.invite_token}")
        else:
            raise HTTPException(status_code=403, detail="Registration is closed")
    else:
        pass

    existing = await db.execute(
        select(User).where(
            User.username == data.username
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Username already taken")

    email_check = await db.execute(
        select(User).where(User.email == data.email)
    )
    if email_check.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Email already taken")

    user_count = await db.scalar(select(func.count(User.id)))
    role = "admin" if (user_count == 0 and settings.FIRST_USER_IS_ADMIN) else "user"

    user = User(
        username=data.username,
        email=data.email,
        display_name=data.display_name or data.username,
        hashed_password=hash_password(data.password),
        native_language=data.native_language,
        target_language=data.target_language,
        role=role,
        is_active=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # Auto-login: issue tokens so the frontend can redirect to /onboarding
    access_token = create_access_token(user.id, user.role)
    refresh_token = create_refresh_token()

    ttl = settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400
    await redis.setex(f"refresh:{refresh_token}", ttl, str(user.id))

    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        max_age=ttl,
    )

    # Send verification email asynchronously (fire-and-forget style — errors are logged, not raised)
    if user.email and settings.EMAIL_ENABLED:
        verify_token = str(uuid.uuid4())
        await redis.setex(f"verify_email:{verify_token}", 86400, str(user.id))  # 24h
        await email_service.send_verification_email(user.email, user.display_name, verify_token, locale=user.native_language)
        await email_service.send_welcome_email(user.email, user.display_name, locale=user.native_language)

    return RegisterResponse(
        id=user.id,
        username=user.username,
        role=user.role,
        access_token=access_token,
    )


@router.post("/login", response_model=TokenResponse)
@limiter.limit("10/minute")
async def login(
    request: Request,
    data: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    # Always run bcrypt to prevent timing-based user enumeration
    if user:
        password_ok = verify_password(data.password, user.hashed_password)
    else:
        dummy_verify()
        password_ok = False

    if not password_ok or not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user.last_login = datetime.now(timezone.utc).replace(tzinfo=None)
    await db.commit()

    access_token = create_access_token(user.id, user.role)
    refresh_token = create_refresh_token()

    ttl = settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400
    await redis.setex(f"refresh:{refresh_token}", ttl, str(user.id))

    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        max_age=ttl,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/refresh", response_model=TokenResponse)
@limiter.limit("20/minute")
async def refresh(
    request: Request,
    response: Response,
    redis: Redis = Depends(get_redis),
    db: AsyncSession = Depends(get_db),
):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Missing refresh token")

    user_id = await redis.get(f"refresh:{token}")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    await redis.delete(f"refresh:{token}")

    new_refresh = create_refresh_token()
    ttl = settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400
    await redis.setex(f"refresh:{new_refresh}", ttl, user_id)

    response.set_cookie(
        "refresh_token",
        new_refresh,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        max_age=ttl,
    )

    user = await db.get(User, int(user_id))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return {"access_token": create_access_token(user.id, user.role), "token_type": "bearer"}


@router.post("/logout")
async def logout(
    request: Request,
    response: Response,
    redis: Redis = Depends(get_redis),
):
    token = request.cookies.get("refresh_token")
    if token:
        await redis.delete(f"refresh:{token}")
    response.delete_cookie("refresh_token")
    return {"detail": "Logged out"}


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.patch("/me", response_model=UserResponse)
async def update_me(
    data: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if data.display_name is not None:
        current_user.display_name = data.display_name
    if data.email is not None and data.email != current_user.email:
        dup = await db.execute(select(User).where(User.email == data.email))
        if dup.scalar_one_or_none():
            raise HTTPException(status_code=409, detail="Email already taken")
        current_user.email = data.email
    if data.password is not None:
        current_user.hashed_password = hash_password(data.password)
    if data.native_language is not None:
        current_user.native_language = data.native_language
    if data.target_language is not None:
        current_user.target_language = data.target_language
    if data.conversation_max_duration is not None:
        current_user.conversation_max_duration = data.conversation_max_duration
    if data.conversation_inactivity_timeout is not None:
        current_user.conversation_inactivity_timeout = data.conversation_inactivity_timeout

    await db.commit()
    await db.refresh(current_user)
    return current_user


_MAX_AVATAR_BYTES = 2 * 1024 * 1024  # 2 MB
_ALLOWED_AVATAR_TYPES = {"image/jpeg", "image/png"}


@router.post("/me/avatar", response_model=UserResponse)
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if file.content_type not in _ALLOWED_AVATAR_TYPES:
        raise HTTPException(status_code=400, detail="Only JPEG and PNG images are allowed")
    data = await file.read(_MAX_AVATAR_BYTES + 1)
    if len(data) > _MAX_AVATAR_BYTES:
        raise HTTPException(status_code=400, detail="Image too large (max 2 MB)")
    b64 = base64.b64encode(data).decode()
    current_user.avatar = f"data:{file.content_type};base64,{b64}"
    await db.commit()
    await db.refresh(current_user)
    return current_user


@router.delete("/me/avatar", response_model=UserResponse)
async def delete_avatar(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    current_user.avatar = None
    await db.commit()
    await db.refresh(current_user)
    return current_user


@router.delete("/me", status_code=204)
async def delete_me(
    request: Request,
    response: Response,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
):
    if current_user.role == "admin":
        raise HTTPException(status_code=403, detail="Admin accounts cannot be self-deleted")
    token = request.cookies.get("refresh_token")
    if token:
        await redis.delete(f"refresh:{token}")
    response.delete_cookie("refresh_token")
    await db.delete(current_user)
    await db.commit()


@router.get("/quota")
async def get_my_quota(
    current_user: User = Depends(get_current_user),
    redis: Redis = Depends(get_redis),
):
    """Return conversation quota status for the current user."""
    from app.services.quota_service import get_quota_status  # noqa: PLC0415
    return await get_quota_status(
        redis,
        current_user.id,
        current_user.conversation_weekly_sessions,
        current_user.conversation_daily_minutes,
        current_user.conversation_weekly_minutes,
    )


# ---------------------------------------------------------------------------
# Email verification
# ---------------------------------------------------------------------------

@router.get("/verify-email")
@limiter.limit("10/minute")
async def verify_email(
    request: Request,
    token: str,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
):
    user_id_str = await redis.get(f"verify_email:{token}")
    if not user_id_str:
        raise HTTPException(status_code=400, detail="Invalid or expired verification token")
    user = await db.get(User, int(user_id_str))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_verified = True
    await db.commit()
    await redis.delete(f"verify_email:{token}")
    return {"detail": "Email verified successfully"}


@router.post("/resend-verification")
@limiter.limit("3/minute")
async def resend_verification(
    request: Request,
    current_user: User = Depends(get_current_user),
    redis: Redis = Depends(get_redis),
):
    if current_user.is_verified:
        return {"detail": "Already verified"}
    if not current_user.email:
        raise HTTPException(status_code=400, detail="No email address on file")
    if not settings.EMAIL_ENABLED:
        raise HTTPException(status_code=503, detail="Email not configured")
    verify_token = str(uuid.uuid4())
    await redis.setex(f"verify_email:{verify_token}", 86400, str(current_user.id))
    await email_service.send_verification_email(current_user.email, current_user.display_name, verify_token, locale=current_user.native_language)
    return {"detail": "Verification email sent"}


# ---------------------------------------------------------------------------
# Password reset (public — no auth required)
# ---------------------------------------------------------------------------

@router.post("/forgot-password")
@limiter.limit("5/minute")
async def forgot_password(
    request: Request,
    data: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
):
    # Always return 200 to avoid user enumeration
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if user and settings.EMAIL_ENABLED:
        reset_token = str(uuid.uuid4())
        await redis.setex(f"reset_password:{reset_token}", 3600, str(user.id))  # 1h
        await email_service.send_reset_password_email(user.email, user.display_name, reset_token, locale=user.native_language)
    return {"detail": "If that email is registered you will receive a reset link shortly"}


@router.post("/reset-password")
@limiter.limit("5/minute")
async def reset_password(
    request: Request,
    data: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
):
    user_id_str = await redis.get(f"reset_password:{data.token}")
    if not user_id_str:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    user = await db.get(User, int(user_id_str))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.hashed_password = hash_password(data.new_password)
    await db.commit()
    await redis.delete(f"reset_password:{data.token}")
    return {"detail": "Password updated successfully"}
