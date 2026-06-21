from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379/0"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    ALLOW_REGISTRATION: bool = True
    FIRST_USER_IS_ADMIN: bool = True
    BLOCKED_EMAIL_DOMAINS: list[str] = []
    LLM_PROVIDER: str = "ollama"
    OLLAMA_BASE_URL: str = "http://host.docker.internal:11434"
    OLLAMA_MODEL: str = "qwen2.5-vl:latest"
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-3-5-haiku-latest"
    DEEPSEEK_API_KEY: str = ""
    DEEPSEEK_MODEL: str = "deepseek-chat"
    NAN_API_KEY: str = ""
    NAN_BASE_URL: str = "https://api.nan.builders/v1"
    NAN_MODEL: str = "qwen3.6"
    NAN_EMBEDDING_MODEL: str = "qwen3-embedding"
    NAN_RERANK_MODEL: str = "rerank"
    NAN_TTS_MODEL: str = "kokoro"
    NAN_TTS_VOICE: str = "af_heart"
    NAN_STT_MODEL: str = "whisper"
    TTS_PROVIDER: str = "local"  # local | openai | nan
    TTS_BASE_URL: str = "http://kokoro:8880"
    TTS_VOICE: str = "af_heart"
    OPENAI_TTS_MODEL: str = "tts-1"
    OPENAI_TTS_VOICE: str = "nova"
    OPENAI_TTS_SPEED: float = 1.0
    STT_PROVIDER: str = "local"  # local | openai | nan
    STT_BASE_URL: str = "http://whisper:9000"
    OPENAI_STT_MODEL: str = "whisper-1"
    RATE_LIMIT_ENABLED: bool = True
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    COOKIE_SECURE: bool = False
    LOG_LEVEL: str = "INFO"

    # Stripe (for paid plans and billing management)
    STRIPE_ENABLED: bool = False
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    STRIPE_PRICE_MONTHLY: str = ""
    STRIPE_PRICE_YEARLY: str = ""
    STRIPE_TRIAL_DAYS: int = 7
    STRIPE_BASE_URL: str = "http://localhost:3000"

    # Display prices (shown on landing page and paywall banner)
    PRICE_MONTHLY: float = 0.0
    PRICE_YEARLY: float = 0.0
    TOTAL_PRICE_MONTHLY: float = 0.0
    TOTAL_PRICE_YEARLY: float = 0.0

    # Email / SMTP
    EMAIL_ENABLED: bool = False
    CONTACT_EMAIL: str = ""
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM: str = "noreply@freelingo.app"
    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    APP_BASE_URL: str = "http://localhost:3000"

    # Listening — path where generated MP3 files are stored (Docker volume)
    AUDIO_STORAGE_PATH: str = "/data/audio"

    # Documents — RAG document storage (Docker volume /data/documents)
    DOCUMENT_STORAGE_PATH: str = "/data/documents"
    DOCUMENT_CHUNK_SIZE: int = 512
    DOCUMENT_CHUNK_OVERLAP: int = 64
    DOCUMENT_MAX_FILE_SIZE: int = 500 * 1024 * 1024  # 500 MB
    DOCUMENT_ALLOWED_EXTENSIONS: list[str] = [".pdf", ".docx", ".txt", ".png", ".jpg", ".jpeg"]
    DOCUMENT_OCR_PROVIDER: str = "ollama"  # ollama | paddleocr | ollama+paddleocr
    NAN_EMBEDDING_BATCH_SIZE: int = 32

    # Multi-language — operator-configured subset of supported target languages.
    AVAILABLE_TARGET_LANGUAGES: list[str] = [
        "en-US",
        "en-GB",
        "de-DE",
        "es-ES",
        "fr-FR",
        "it-IT",
        "pt-PT",
    ]

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
