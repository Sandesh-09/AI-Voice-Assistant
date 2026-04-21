# 🎙️ AI-Powered Virtual Voice Assistant (MERN Stack)

A full-stack MERN application that combines authentication, assistant personalization, browser-based speech recognition, and spoken responses into a single AI voice assistant experience. Users can create an account, configure their own assistant identity, talk to it using voice commands, and receive both on-screen and text-to-speech responses backed by a Node/Express API and MongoDB persistence.

## 🚀 What This Project Delivers

This project goes beyond a static chatbot UI by connecting a responsive React frontend with protected REST APIs, JWT-based session handling, MongoDB user storage, image upload support, and an AI intent-processing layer. The assistant can recognize spoken commands, respond audibly, keep command history per user, and trigger real browser actions such as search flows and utility shortcuts.

## 🧰 Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- Mongoose
- Axios
- Multer
- Cloudinary
- Moment.js

### Database
- MongoDB

### Authentication & Security
- JWT for authenticated sessions
- `httpOnly` cookie-based token storage
- bcryptjs for password hashing

### Voice & AI
- Web Speech API for speech recognition
- Browser Speech Synthesis API for text-to-speech
- Gemini API integration for intent parsing and assistant replies

## ✨ Features

- User registration and sign-in with password hashing and JWT-based authentication
- Protected user routes for profile retrieval, assistant updates, and AI interaction
- Assistant personalization with custom name and avatar selection
- Support for uploading a custom assistant image via Cloudinary
- Automatic voice listening flow using browser speech recognition
- Spoken assistant replies using text-to-speech
- Real-time display of heard user input and assistant response
- Command history saved per user in MongoDB
- Intent-aware actions for:
  - Google search
  - YouTube search and play requests
  - Opening Instagram and Facebook
  - Opening a calculator
  - Weather lookup
  - Date, time, day, and month queries
- Responsive interface with mobile menu support

## 🗂️ Project Structure

```text
pp1/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── gemini.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── assets/
│   └── vite.config.js
└── README.md
```

## 🔐 API Overview

### Auth Routes
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/logout`

### User Routes
- `GET /api/user/current`
- `POST /api/user/update`
- `POST /api/user/asktoassistant`

## ⚙️ How To Run

### 1. Clone the project

```bash
git clone <your-repository-url>
cd pp1
```

### 2. Install dependencies

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

### 3. Configure backend environment

Create `backend/.env` and add:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_URL=your_gemini_api_endpoint
```

`PORT=8000` is recommended because the frontend currently calls the backend at `http://localhost:8000`.

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

### 6. Open the app

Visit:

```text
http://localhost:5173
```

## 🧪 Usage Flow

1. Sign up or sign in.
2. Choose an assistant image or upload your own.
3. Set a custom assistant name.
4. Allow microphone access in the browser.
5. Speak a command containing the assistant name.
6. Receive a text reply, voice reply, and action when applicable.

## 📌 Key Highlights

- Blends frontend UX, REST APIs, authentication, database persistence, and browser voice APIs in one project
- Demonstrates real-world user flows instead of isolated demo screens
- Stores assistant personalization and interaction history per authenticated user
- Uses AI output as a decision layer for both conversational and action-based responses
- Includes cloud media upload support for customizable assistant avatars

## 💡 Key Learnings

- Designing authenticated full-stack flows with React, Express, MongoDB, and JWT cookies
- Integrating browser-native voice capabilities into a modern frontend
- Translating natural language into structured assistant actions through an AI API
- Handling user personalization, file uploads, and persistent interaction history in a single application

## 🔮 Future Improvements

- Add chat history UI with timestamps and searchable conversations
- Introduce refresh tokens and production-ready secure cookie settings
- Add role-based prompts and richer assistant memory
- Support multilingual recognition and speech synthesis options
- Add automated tests for API routes and frontend flows
- Replace hardcoded configuration values with environment-based frontend config
- Expand intent handling to support productivity workflows and external integrations

## 👨‍💻 Author

**Sandesh Gupta**

“This project demonstrates my ability to build secure, full-stack AI-powered applications with real-world features.”
