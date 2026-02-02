# Visual Guide: What You'll See When Running the App

## Starting the Server

When you run `npm start`, you'll see:

```
> backend@1.0.0 start
> node server.js

MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
Server is running on port 5000
```

✅ **Success!** Your server is running.

## Running the Test Suite

When you run `npm test`, you'll see:

```
╔═══════════════════════════════════════════════════╗
║   Task Tracker API Test Suite                    ║
╚═══════════════════════════════════════════════════╝

[TEST 1] Checking if server is running...
✓ Server is running
  Response: {"message":"Welcome to Task Tracker API"}

[TEST 2] Testing user registration...
✓ User registered successfully
  User: Test User (test1696847123456@example.com)
  Token: eyJhbGciOiJIUzI1NiI...

[TEST 3] Testing user login...
✓ Login successful
  User: Login Test

[TEST 4] Testing get current user...
✓ Current user retrieved
  User: Test User (test1696847123456@example.com)

[TEST 5] Testing task creation...
✓ Task created successfully
  Task: Test Task
  ID: 6543219876abcdef12345678

[TEST 6] Testing get all tasks...
✓ Tasks retrieved successfully
  Total tasks: 1

[TEST 7] Testing task update...
✓ Task updated successfully
  Status: in-progress
  Priority: medium

[TEST 8] Testing task deletion...
✓ Task deleted successfully
  Message: Task deleted successfully

═══════════════════════════════════════════════════

Test Summary:
  Total: 8
  Passed: 8
  Failed: 0

✓ All tests passed! Your API is working correctly.
```

✅ **Perfect!** All endpoints are working.

## API Examples

### 1. Register a New User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "_id": "6543219876abcdef12345678",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDMyMTk4NzZhYmNkZWYxMjM0NTY3OCIsImlhdCI6MTY5Njg0NzEyMywiZXhwIjoxNjk3NDUxOTIzfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### 2. Login

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "_id": "6543219876abcdef12345678",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Create a Task

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "priority": "high",
    "status": "todo"
  }'
```

**Response:**
```json
{
  "_id": "6543219876abcdef12345679",
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the API",
  "status": "todo",
  "priority": "high",
  "assignee": {
    "_id": "6543219876abcdef12345678",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdBy": {
    "_id": "6543219876abcdef12345678",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2024-11-02T10:30:00.000Z",
  "updatedAt": "2024-11-02T10:30:00.000Z"
}
```

### 4. Get All Tasks

**Request:**
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
[
  {
    "_id": "6543219876abcdef12345679",
    "title": "Complete project documentation",
    "description": "Write comprehensive docs for the API",
    "status": "todo",
    "priority": "high",
    "assignee": {
      "_id": "6543219876abcdef12345678",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdBy": {
      "_id": "6543219876abcdef12345678",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-11-02T10:30:00.000Z",
    "updatedAt": "2024-11-02T10:30:00.000Z"
  },
  {
    "_id": "6543219876abcdef12345680",
    "title": "Review pull requests",
    "description": "Check and approve pending PRs",
    "status": "in-progress",
    "priority": "medium",
    "assignee": {
      "_id": "6543219876abcdef12345678",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdBy": {
      "_id": "6543219876abcdef12345678",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-11-02T11:15:00.000Z",
    "updatedAt": "2024-11-02T11:45:00.000Z"
  }
]
```

### 5. Update a Task

**Request:**
```bash
curl -X PUT http://localhost:5000/api/tasks/6543219876abcdef12345679 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "status": "completed",
    "priority": "low"
  }'
```

**Response:**
```json
{
  "_id": "6543219876abcdef12345679",
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the API",
  "status": "completed",
  "priority": "low",
  "assignee": {...},
  "createdBy": {...},
  "createdAt": "2024-11-02T10:30:00.000Z",
  "updatedAt": "2024-11-02T14:20:00.000Z"
}
```

### 6. Delete a Task

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/6543219876abcdef12345679 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## Error Examples

### Unauthorized Access (No Token)

**Request:**
```bash
curl http://localhost:5000/api/tasks
```

**Response:**
```json
{
  "message": "Not authorized, no token"
}
```

### Invalid Credentials

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"wrongpassword"}'
```

**Response:**
```json
{
  "message": "Invalid email or password"
}
```

### Missing Required Fields

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token..." \
  -d '{"title":"Task without description"}'
```

**Response:**
```json
{
  "message": "Please provide title and description"
}
```

## Using Postman (Visual Tool)

If you prefer a GUI, use Postman:

1. **Download Postman:** https://www.postman.com/downloads/
2. **Import these requests:**
   - Create a new collection "Task Tracker"
   - Add requests for each endpoint
   - Set Authorization type to "Bearer Token"
   - Paste your JWT token in the Token field

This is much easier than using curl commands!

## Summary

You now have:
- ✅ A working backend API
- ✅ User authentication
- ✅ Task management
- ✅ Automated tests
- ✅ Complete documentation

**Next:** Add a frontend or start using the API with Postman!
