# CloudNotes - Full-Stack Notes App

A modern, secure notes application built with Node.js, Express, MongoDB, and Next.js.

## Features
- **User Authentication**: Secure register and login with JWT and Bcrypt.
- **Protected Routes**: Notes are user-scoped and protected by JWT middleware.
- **Notes CRUD**: Create, Read, and Delete notes.
- **Premium UI**: Modern dark theme with glassmorphism and smooth transitions.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB account (local or Atlas)

## Setup

### Backend
1. Go to `backend/` folder.
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server: `npm run dev`

### Frontend
1. Go to `frontend/` folder.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and get JWT.
- `GET /api/notes`: Get all notes for the logged-in user.
- `POST /api/notes`: Create a new note.
- `DELETE /api/notes/:id`: Delete a note.
