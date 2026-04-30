from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatHistoryItem(BaseModel):
    role: str
    content: str


class ChatHistoryResponse(BaseModel):
    messages: list[ChatHistoryItem]
