# Task Tracker

Managing my tasks to make me an effective leader

## 🚀 Quick Start

Want to get the app running immediately? Check out the **[QUICKSTART.md](QUICKSTART.md)** guide!

## 📋 What's Inside

This repository contains a complete backend API for task management built with Node.js, Express, and MongoDB.

### Features
- ✅ User authentication with JWT
- ✅ Task CRUD operations
- ✅ User-specific task management
- ✅ Role-based access control
- ✅ RESTful API design

## 🏃 Getting Started

### Quick Setup (3 steps)

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   ```bash
   # The .env file is already created for local development
   # Edit backend/.env if you want to use MongoDB Atlas or change settings
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

That's it! The API is running at `http://localhost:5000`

### Test the API

Run the automated test script:
```bash
cd backend
npm test
```

This will test all API endpoints and verify everything is working.

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Step-by-step guide to get started
- **[backend/README.md](backend/README.md)** - Detailed API documentation

## 🔧 Requirements

- Node.js v14 or higher
- MongoDB (local or Atlas)

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login user |
| `/api/auth/me` | GET | Get current user |
| `/api/tasks` | GET | Get all tasks |
| `/api/tasks` | POST | Create task |
| `/api/tasks/:id` | PUT | Update task |
| `/api/tasks/:id` | DELETE | Delete task |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC
