from typing import Optional

from pydantic import BaseModel, Field


class TTSRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)
    voice: Optional[str] = None


class STTResponse(BaseModel):
    text: str
