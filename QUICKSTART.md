# Quick Start Guide - Task Tracker Backend

This guide will help you get the Task Tracker backend up and running in minutes.

## Prerequisites

Before you begin, ensure you have:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - **Option A (Easiest):** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free cloud database)
  - **Option B:** Local MongoDB installation

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages (express, mongoose, jsonwebtoken, bcryptjs, dotenv).

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended for Quick Start)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Option B: Local MongoDB

Install MongoDB locally:
- **macOS:** `brew install mongodb-community`
- **Ubuntu:** `sudo apt-get install mongodb`
- **Windows:** [Download installer](https://www.mongodb.com/try/download/community)

Start MongoDB:
```bash
# macOS/Linux
mongod --dbpath /path/to/data/directory

# Or use the default
mongod
```

## Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/task-tracker

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/task-tracker

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

**Important:** Change `JWT_SECRET` to a random secure string!

## Step 4: Start the Server

```bash
cd backend
npm start
```

You should see:
```
MongoDB Connected: your-cluster-host
Server is running on port 5000
```

## Step 5: Test the API

### Test 1: Check if server is running

```bash
curl http://localhost:5000
```

Expected response:
```json
{"message": "Welcome to Task Tracker API"}
```

### Test 2: Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGc..."
}
```

**Save the token** - you'll need it for authenticated requests!

### Test 3: Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test 4: Create a task (requires token)

Replace `YOUR_TOKEN` with the token from registration/login:

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "priority": "high",
    "status": "todo"
  }'
```

### Test 5: Get all tasks

```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Alternative: Use Postman or Thunder Client

Instead of curl, you can use:
- **Postman:** [Download](https://www.postman.com/downloads/)
- **Thunder Client:** VS Code extension
- **Insomnia:** [Download](https://insomnia.rest/download)

Import these endpoints:
- POST `http://localhost:5000/api/auth/register`
- POST `http://localhost:5000/api/auth/login`
- GET `http://localhost:5000/api/auth/me` (with Bearer token)
- GET `http://localhost:5000/api/tasks` (with Bearer token)
- POST `http://localhost:5000/api/tasks` (with Bearer token)
- PUT `http://localhost:5000/api/tasks/:id` (with Bearer token)
- DELETE `http://localhost:5000/api/tasks/:id` (with Bearer token)

## Troubleshooting

### Server won't start

**Issue:** `Error: Cannot find module 'express'`
**Solution:** Run `npm install` in the backend directory

**Issue:** `MongoServerError: bad auth`
**Solution:** Check your MongoDB URI credentials in `.env`

**Issue:** `connect ECONNREFUSED ::1:27017`
**Solution:** 
- MongoDB is not running (start it with `mongod`)
- Or check your MONGODB_URI in `.env`

### Authentication issues

**Issue:** `Not authorized, no token`
**Solution:** Make sure you're including the Authorization header: `Authorization: Bearer YOUR_TOKEN`

**Issue:** `Not authorized, token failed`
**Solution:** Your token might be expired or invalid. Login again to get a new token.

## Next Steps

1. **Build a Frontend:** Create a React, Vue, or Angular frontend
2. **Add More Features:** 
   - Task comments
   - File attachments
   - Email notifications
   - Task sharing between users
3. **Deploy:** 
   - Deploy backend to Heroku, Railway, or AWS
   - Connect to production MongoDB
4. **Add Security:**
   - Rate limiting (express-rate-limit)
   - CORS configuration
   - Helmet.js for security headers

## Quick Reference

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/register` | POST | Register new user | No |
| `/api/auth/login` | POST | Login user | No |
| `/api/auth/me` | GET | Get current user | Yes |
| `/api/tasks` | GET | Get all user tasks | Yes |
| `/api/tasks` | POST | Create new task | Yes |
| `/api/tasks/:id` | GET | Get single task | Yes |
| `/api/tasks/:id` | PUT | Update task | Yes |
| `/api/tasks/:id` | DELETE | Delete task | Yes |

## Support

For more detailed documentation, see `backend/README.md`

**Happy coding! 🚀**
