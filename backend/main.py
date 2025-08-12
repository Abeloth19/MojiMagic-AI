from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from emoji_mapper import EmojiMapper
import uvicorn

app = FastAPI(title="MojiMagic API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

emoji_mapper = EmojiMapper()

class TextInput(BaseModel):
    text: str

class EmojiResponse(BaseModel):
    emojis: str
    emotions: dict

@app.get("/")
async def root():
    return {"message": "MojiMagic API is running"}

@app.post("/analyze", response_model=EmojiResponse)
async def analyze_text(input_data: TextInput):
    try:
        if not input_data.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        result = emoji_mapper.text_to_emojis(input_data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
