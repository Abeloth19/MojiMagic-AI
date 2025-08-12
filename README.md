# MojiMagic ✨🎭

AI-powered text-to-emoji converter that analyzes your text and generates perfect emoji combinations based on detected emotions.

## Features

- 🤖 **AI Emotion Detection**: Uses Hugging Face transformers to analyze text sentiment
- 🎯 **Smart Emoji Mapping**: Maps detected emotions to relevant emojis
- 📱 **Responsive Design**: Beautiful, mobile-first interface with smooth animations
- 📋 **One-Click Copy**: Easy emoji copying functionality
- 💡 **Example Prompts**: Clickable examples to get started quickly

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python + Hugging Face Transformers
- **AI Model**: cardiffnlp/twitter-roberta-base-emotion

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /` - Health check
- `POST /analyze` - Analyze text and return emojis

## Development

Built with modern web technologies and AI/ML capabilities for a seamless user experience.
