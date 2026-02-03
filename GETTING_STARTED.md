# How to Run and Use the Task Tracker App

## What You Have Now

You have a fully functional backend API with:
- ✅ User authentication (register/login)
- ✅ Task management (create, read, update, delete)
- ✅ JWT-based security
- ✅ MongoDB integration

## What's Next? (3 Simple Steps)

### Step 1: Set Up MongoDB

You need a MongoDB database. Choose the easiest option for you:

#### Option A: MongoDB Atlas (Recommended - No Installation Required)

This is the **easiest** option - it's free and takes 5 minutes:

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a free cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Edit `backend/.env` and replace the MONGODB_URI:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-tracker
   ```

#### Option B: Local MongoDB

Install MongoDB on your computer:
- **macOS:** `brew tap mongodb/brew && brew install mongodb-community`
- **Ubuntu/Debian:** `sudo apt-get install mongodb`
- **Windows:** Download from https://www.mongodb.com/try/download/community

The `.env` file is already configured for local MongoDB.

### Step 2: Start the Server

```bash
cd backend
npm start
```

You should see:
```
MongoDB Connected: ...
Server is running on port 5000
```

### Step 3: Test the API

Run the automated test:
```bash
npm test
```

This will test all endpoints and show you everything is working!

## Using the API

### Example 1: Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Save the token from the response!**

### Example 2: Create a Task

Replace `YOUR_TOKEN` with the token from registration:

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My first task","description":"Learn the API","priority":"high"}'
```

### Example 3: Get All Tasks

```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Alternative: Use Postman

Instead of curl commands, you can use Postman (https://www.postman.com/downloads/):

1. Open Postman
2. Create a new request
3. Set URL: `http://localhost:5000/api/auth/register`
4. Set method: POST
5. Go to Body → raw → JSON
6. Enter:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```
7. Click Send

## What Each File Does

```
task-tracker/
├── QUICKSTART.md           ← Detailed quick start guide
├── README.md               ← Main documentation
└── backend/
    ├── server.js           ← Main entry point (starts here)
    ├── test-api.js         ← Automated API tests
    ├── .env                ← Your configuration (MongoDB, JWT secret)
    ├── config/
    │   └── db.js          ← Database connection
    ├── models/
    │   ├── User.js        ← User data structure
    │   └── Task.js        ← Task data structure
    ├── controllers/
    │   ├── authController.js    ← Login/register logic
    │   └── taskController.js    ← Task CRUD logic
    ├── routes/
    │   ├── authRoutes.js  ← Auth API endpoints
    │   └── taskRoutes.js  ← Task API endpoints
    └── middlewares/
        ├── authMiddleware.js    ← JWT validation
        └── errorMiddleware.js   ← Error handling
```

## Troubleshooting

### "Cannot connect to MongoDB"

**Problem:** The server can't connect to MongoDB.

**Solution:**
- If using local MongoDB: Make sure it's running (`mongod`)
- If using Atlas: Check your connection string in `.env`

### "Not authorized, no token"

**Problem:** You're trying to access a protected endpoint without a token.

**Solution:** Include the Authorization header: `Authorization: Bearer YOUR_TOKEN`

### "Port 5000 is already in use"

**Problem:** Another app is using port 5000.

**Solution:** Change the PORT in `.env` to something else (like 3000 or 8000)

## Next Steps

1. **Build a Frontend:**
   - React: `npx create-react-app frontend`
   - Vue: `npm create vue@latest`
   - Or use plain HTML/JavaScript

2. **Add More Features:**
   - Task categories
   - Due date reminders
   - Task assignments to other users
   - File attachments

3. **Deploy Your App:**
   - Backend: Heroku, Railway, AWS, or DigitalOcean
   - Database: Keep using MongoDB Atlas

4. **Enhance Security:**
   - Add rate limiting
   - Enable CORS for your frontend
   - Add input validation

## Need Help?

- Check `QUICKSTART.md` for detailed instructions
- Check `backend/README.md` for API documentation
- Run `npm test` to verify everything works

**You're all set! Start building something awesome! 🚀**
