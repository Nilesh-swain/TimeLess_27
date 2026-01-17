import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ==============================
# LOAD ENV VARIABLES
# ==============================
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = os.getenv(
    "OPENROUTER_URL",
    "https://openrouter.ai/api/v1/chat/completions"
)
LLM_MODEL = os.getenv("LLM_MODEL", "openai/gpt-4o-mini")

if not OPENROUTER_API_KEY:
    raise RuntimeError("OPENROUTER_API_KEY is missing")

# ==============================
# FASTAPI APP
# ==============================
app = FastAPI(
    title="Planet, Climate & Environmental Well-Being Chatbot",
    version="1.0"
)

# ==============================
# CORS
# ==============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# REQUEST MODEL
# ==============================
class QuestionRequest(BaseModel):
    question: str

# ==============================
# OPENROUTER CALL
# ==============================
def call_openrouter(question: str) -> str:
    system_prompt = (
        "You are a chatbot specialized ONLY in Planet, Climate & Environmental Well-Being.\n"
        "Topics allowed:\n"
        "- Climate change & global warming\n"
        "- Air, water, and land pollution\n"
        "- Biodiversity & ecosystem restoration\n"
        "- Sustainable and eco-friendly solutions\n\n"
        "Rules:\n"
        "- Answer in simple, clear language\n"
        "- Maximum 2–4 short sentences\n"
        "- If the question is off-topic, reply exactly:\n"
        "'I can only answer questions about Planet, Climate & Environmental Well-Being.'"
    )

    payload = {
        "model": LLM_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ],
        "temperature": 0.4,
        "max_tokens": 200
    }

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "Climate Chatbot"
    }

    try:
        response = requests.post(
            OPENROUTER_URL,
            json=payload,
            headers=headers,
            timeout=20
        )

        if response.status_code != 200:
            return (
                "I am currently unable to access climate knowledge services. "
                "Please try again later."
            )

        data = response.json()
        return data["choices"][0]["message"]["content"]

    except requests.exceptions.RequestException:
        return (
            "I am currently unable to connect to climate knowledge services. "
            "Please check your network connection."
        )

# ==============================
# CHAT ENDPOINT
# ==============================
@app.post("/ask")
def ask_question(req: QuestionRequest):
    question = req.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    answer = call_openrouter(question)

    return {
        "question": question,
        "answer": answer
    }

# ==============================
# HEALTH CHECK
# ==============================
@app.get("/")
def root():
    return {"status": "Backend is running"}
