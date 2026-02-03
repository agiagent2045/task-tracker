# MongoDB Installation and Setup Guide

This guide provides multiple methods to install and run MongoDB for the Task Tracker application.

## Quick Start with Docker (Recommended for Development)

If you have Docker installed, this is the fastest way to get MongoDB running:

```bash
# Pull and run MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v mongodb_data:/data/db \
  mongo:7.0

# Check if MongoDB is running
docker ps | grep mongodb

# View MongoDB logs
docker logs mongodb

# Connect to MongoDB shell
docker exec -it mongodb mongosh

# Stop MongoDB
docker stop mongodb

# Start MongoDB (after stopping)
docker start mongodb

# Remove MongoDB container (data persists in volume)
docker rm -f mongodb
```

### Update your .env file for Docker MongoDB:

```env
MONGODB_URI=mongodb://admin:password@localhost:27017/task-tracker?authSource=admin
```

---

## Method 1: Native Installation on Ubuntu

### Ubuntu 24.04 / 22.04 / 20.04

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check MongoDB status
sudo systemctl status mongod

# View logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Verify Installation

```bash
# Check if mongod is running
ps aux | grep mongod

# Check port
sudo netstat -tulpn | grep 27017

# Connect to MongoDB shell
mongosh
```

---

## Method 2: Installation on macOS

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB as a service
brew services start mongodb-community@7.0

# Or run manually
mongod --config /usr/local/etc/mongod.conf

# Stop MongoDB service
brew services stop mongodb-community@7.0

# Check status
brew services list | grep mongodb
```

---

## Method 3: Installation on Windows

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows version
   - Download the MSI installer

2. **Install:**
   - Run the installer
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify:**
   - Open Command Prompt as Administrator
   - Run: `mongod --version`

4. **Start MongoDB:**
   - If installed as service: automatically starts
   - Manual start: `net start MongoDB`
   - Stop: `net stop MongoDB`

---

## Method 4: MongoDB Atlas (Cloud - No Installation)

**Best for:** Production, no local setup needed, free tier available

1. **Sign Up:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Setup Access:**
   - Add your IP address to whitelist (or use 0.0.0.0/0 for development)
   - Create database user with username and password

4. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

5. **Update .env:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
   ```

---

## Configuration

### Default MongoDB Settings

- **Port:** 27017
- **Data Directory:** `/var/lib/mongodb` (Linux) or `/usr/local/var/mongodb` (macOS)
- **Log File:** `/var/log/mongodb/mongod.log` (Linux)
- **Config File:** `/etc/mongod.conf` (Linux) or `/usr/local/etc/mongod.conf` (macOS)

### Custom Data Directory

If you want to use a custom directory for MongoDB data:

```bash
# Create directory
mkdir -p ~/mongodb/data

# Set permissions (Linux)
sudo chown -R mongodb:mongodb ~/mongodb/data

# Start MongoDB with custom path
mongod --dbpath ~/mongodb/data
```

---

## Testing MongoDB Connection

### Using MongoDB Shell (mongosh)

```bash
# Connect to local MongoDB
mongosh

# Or specify connection string
mongosh "mongodb://localhost:27017"

# Basic commands
show dbs                  # List databases
use task-tracker         # Switch to database
show collections         # List collections
db.users.find()          # Query users collection
exit                     # Exit shell
```

### Using Node.js Application

```bash
# Navigate to backend directory
cd backend

# Make sure .env is configured
cat .env | grep MONGODB_URI

# Start the backend server
npm start
```

If MongoDB is running correctly, you should see:
```
✓ MongoDB Connected: localhost
Server is running on port 5000
```

---

## Troubleshooting

### MongoDB won't start

**Check if port 27017 is in use:**
```bash
sudo lsof -i :27017
# or
sudo netstat -tulpn | grep 27017
```

**Check MongoDB logs:**
```bash
# Linux
sudo tail -50 /var/log/mongodb/mongod.log

# macOS
tail -50 /usr/local/var/log/mongodb/mongo.log

# Docker
docker logs mongodb
```

### Permission Issues (Linux)

```bash
# Fix ownership of data directory
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown -R mongodb:mongodb /var/log/mongodb

# Restart MongoDB
sudo systemctl restart mongod
```

### Can't Connect from Application

1. **Check MongoDB is running:**
   ```bash
   ps aux | grep mongod
   ```

2. **Check connection string in .env:**
   ```bash
   cat backend/.env | grep MONGODB_URI
   ```

3. **Test connection manually:**
   ```bash
   mongosh "mongodb://localhost:27017/task-tracker"
   ```

4. **Check firewall:**
   ```bash
   sudo ufw status
   # Allow MongoDB port if needed
   sudo ufw allow 27017
   ```

### MongoDB Service Issues

```bash
# Check service status
sudo systemctl status mongod

# View detailed logs
sudo journalctl -u mongod -n 50

# Restart service
sudo systemctl restart mongod

# If service fails to start, check config
sudo nano /etc/mongod.conf
```

---

## Uninstalling MongoDB

### Ubuntu/Debian

```bash
# Stop service
sudo systemctl stop mongod

# Remove packages
sudo apt-get purge mongodb-org*

# Remove data and logs (optional)
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

### macOS

```bash
# Stop service
brew services stop mongodb-community

# Uninstall
brew uninstall mongodb-community

# Remove data (optional)
rm -rf /usr/local/var/mongodb
rm -rf /usr/local/var/log/mongodb
```

### Docker

```bash
# Stop and remove container
docker stop mongodb
docker rm mongodb

# Remove volume (deletes all data)
docker volume rm mongodb_data

# Remove image
docker rmi mongo:7.0
```

---

## Security Best Practices

1. **Change Default Port (Production):**
   Edit `/etc/mongod.conf`:
   ```yaml
   net:
     port: 27018  # Use different port
   ```

2. **Enable Authentication:**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Create admin user
   use admin
   db.createUser({
     user: "admin",
     pwd: "securePassword",
     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
   })
   
   # Enable authentication in config
   # Edit /etc/mongod.conf
   security:
     authorization: enabled
   ```

3. **Bind to Localhost Only (Development):**
   In `/etc/mongod.conf`:
   ```yaml
   net:
     bindIp: 127.0.0.1
   ```

4. **Use Environment Variables:**
   Never commit database credentials to git. Always use `.env` files.

---

## Quick Reference Commands

```bash
# Start MongoDB
sudo systemctl start mongod          # Linux (systemd)
brew services start mongodb-community # macOS
docker start mongodb                  # Docker
net start MongoDB                     # Windows

# Stop MongoDB
sudo systemctl stop mongod           # Linux
brew services stop mongodb-community # macOS
docker stop mongodb                  # Docker
net stop MongoDB                     # Windows

# Check Status
sudo systemctl status mongod         # Linux
brew services list                   # macOS
docker ps                            # Docker
sc query MongoDB                     # Windows

# Connect
mongosh                              # Local default
mongosh "mongodb://localhost:27017"  # Specify connection
docker exec -it mongodb mongosh      # Docker

# View Logs
sudo tail -f /var/log/mongodb/mongod.log  # Linux
tail -f /usr/local/var/log/mongodb/*.log  # macOS
docker logs -f mongodb                     # Docker
```

---

## Additional Resources

- **Official MongoDB Documentation:** https://docs.mongodb.com/
- **MongoDB University (Free Courses):** https://university.mongodb.com/
- **MongoDB Compass (GUI):** https://www.mongodb.com/products/compass
- **MongoDB Shell (mongosh):** https://www.mongodb.com/docs/mongodb-shell/

---

## Next Steps

After installing MongoDB:

1. **Start MongoDB** using your preferred method
2. **Update backend/.env** with correct connection string
3. **Start backend server:** `cd backend && npm start`
4. **Test API:** `npm test`
5. **See QUICKSTART.md** for application-specific setup

---

**Need Help?** Check the troubleshooting section or refer to the official MongoDB documentation.
