"""Contact form router — receives in-app contact submissions and forwards them by email."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel, EmailStr, Field

from app.core.limiter import limiter
from app.services import email_service

router = APIRouter(prefix="/api/contact", tags=["contact"])


class ContactRequest(BaseModel):
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=5000)


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("5/hour")
async def contact(request: Request, data: ContactRequest) -> None:
    """Forward a contact-form submission to the configured CONTACT_EMAIL address."""
    try:
        await email_service.send_contact_email(
            sender_email=data.email,
            subject=data.subject,
            description=data.description,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to send message. Please try again later.",
        ) from exc
