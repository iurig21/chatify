# Chatify 

A real-time chat application built with the MERN(MongoDB,Express.js,React and NodeJS) stack.

🔗 **Live Demo:** [https://chatify-zbcq.onrender.com/](https://chatify-zbcq.onrender.com/)

## Features

- Real-time messaging
- User authentication
- Image uploads
- Modern UI

## Tech Stack

**Frontend:** React, Tailwind CSS , DaisyUI  
**Backend:** Node.js, Express, MongoDB, Socket.IO

## API Documentation

### Authentication Endpoints

#### Register a new user
Creates a new user account with email and password.

```http
POST /api/auth/signup
Content-Type: application/json

{
    "fullName": "John Doe",
    "email": "johndoe@gmail.com",
    "password": "1234567"
}
```

#### Login
Authenticates a user and returns a JWT token.

```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "johndoe@gmail.com",
    "password": "1234567"
}
```

#### Logout
Logs out the current user and invalidates the session.

```http
POST /api/auth/logout
```

#### Check authentication status
Verifies if the current user is authenticated.

```http
GET /api/auth/check
```

### Message Endpoints

#### Get all contacts
Retrieves a list of all users available for chatting.

```http
GET /api/messages/contacts
```

#### Get user's chats
Fetches all active chat conversations for the authenticated user.

```http
GET /api/messages/chats
```

#### Get messages with a specific user
Retrieves the message history between the authenticated user and another user.

```http
GET /api/messages/:id
```

#### Send a message
Sends a text message to a specific user.

```http
POST /api/messages/send/:id
Content-Type: application/json

{
    "text": "Your message here"
}
```

## Setup

1. **Clone the repository**
```bash
git clone https://github.com/iurig21/chatify.git
cd chatify
```

2. **Install dependencies**
```bash
npm run build
```

3. **Configure environment variables**

Create `.env` in the `backend` folder:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RESEND_API_KEY=your_resend_key
ARCJET_KEY=your_arcjet_key
PORT=5000
```

4. **Run the app**

Development:
```bash
cd backend && npm run dev
cd frontend && npm run dev
```

Production:
```bash
npm start
```

## Requirements

- Node.js >= 18.17.0
- MongoDB database

Made by [@iurig21](https://github.com/iurig21)
