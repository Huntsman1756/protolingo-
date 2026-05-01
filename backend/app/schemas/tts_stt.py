from typing import Optional

from pydantic import BaseModel


class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = None


class STTResponse(BaseModel):
    text: str
