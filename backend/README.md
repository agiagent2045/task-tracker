# Task Tracker Backend

Backend API for the Task Tracker web application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Password hashing with bcryptjs
- CRUD operations for tasks
- User-specific task management
- Role-based access control
- MongoDB integration with Mongoose

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/task-tracker
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   ```

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication

#### Register a new user
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get current user
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Tasks

All task endpoints require authentication (Bearer token).

#### Get all tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

#### Get single task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create a task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task tracker backend",
  "priority": "high",
  "status": "todo",
  "dueDate": "2024-12-31"
}
```

#### Update a task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "medium"
}
```

#### Delete a task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

## Project Structure

```
backend/
├── config/           # Database configuration
│   └── db.js
├── controllers/      # Request handlers
│   ├── authController.js
│   └── taskController.js
├── middlewares/      # Custom middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/           # Mongoose models
│   ├── User.js
│   └── Task.js
├── routes/           # API routes
│   ├── authRoutes.js
│   └── taskRoutes.js
├── .env.example      # Environment variables template
├── server.js         # Express app entry point
└── package.json      # Dependencies and scripts
```

## Models

### User Model
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, enum: ['user', 'admin'])
- timestamps

### Task Model
- title (String, required)
- description (String, required)
- status (String, enum: ['todo', 'in-progress', 'completed'])
- priority (String, enum: ['low', 'medium', 'high'])
- dueDate (Date)
- assignee (ObjectId, ref: User)
- createdBy (ObjectId, ref: User)
- timestamps

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes with authentication middleware
- Environment variables for sensitive data

### Future Security Enhancements

For production deployment, consider adding:
- Rate limiting middleware to prevent abuse
- Input validation and sanitization
- CORS configuration
- Helmet.js for security headers
- Request logging and monitoring

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "message": "Error message here",
  "stack": "Stack trace (only in development)"
}
```

## License

ISC
