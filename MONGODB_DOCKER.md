# MongoDB Docker Quick Reference

## Quick Commands

### Start MongoDB
```bash
docker start mongodb
```

### Stop MongoDB
```bash
docker stop mongodb
```

### Check Status
```bash
docker ps | grep mongodb
```

### View Logs
```bash
docker logs mongodb
docker logs -f mongodb  # Follow logs
```

### Connect to MongoDB Shell
```bash
docker exec -it mongodb mongosh
```

### MongoDB Shell Commands
```javascript
// Inside mongosh:
show dbs                        // List all databases
use task-tracker               // Switch to task-tracker database
show collections               // Show collections in current database
db.users.find()                // Find all users
db.tasks.find()                // Find all tasks
db.users.countDocuments()      // Count users
exit                           // Exit shell
```

## Remove MongoDB (if needed)

### Stop and Remove Container
```bash
docker stop mongodb
docker rm mongodb
```

### Remove with Data Volume
```bash
docker stop mongodb
docker rm mongodb
docker volume ls  # List volumes
docker volume rm <volume-name>  # Remove specific volume
```

## Reinstall MongoDB

```bash
# Pull latest image
docker pull mongo:7.0

# Run new container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=task-tracker \
  mongo:7.0
```

## Backup and Restore

### Backup Database
```bash
docker exec mongodb mongodump --db=task-tracker --out=/tmp/backup
docker cp mongodb:/tmp/backup ./mongodb-backup
```

### Restore Database
```bash
docker cp ./mongodb-backup mongodb:/tmp/backup
docker exec mongodb mongorestore --db=task-tracker /tmp/backup/task-tracker
```

## Troubleshooting

### MongoDB won't start
```bash
# Check if port is already in use
sudo lsof -i :27017

# Check container logs
docker logs mongodb

# Restart container
docker restart mongodb
```

### Can't connect from application
```bash
# Check if MongoDB is running
docker ps | grep mongodb

# Test connection
docker exec mongodb mongosh --eval "db.adminCommand('ping')"

# Check .env file
cat backend/.env | grep MONGODB_URI
```

### Performance Issues
```bash
# Check container stats
docker stats mongodb

# Increase memory limit
docker update --memory="1g" mongodb
```

## Integration with Backend

### .env Configuration
```env
MONGODB_URI=mongodb://localhost:27017/task-tracker
```

### Test Connection
```bash
cd backend
npm start
# Should see: "✓ MongoDB Connected: localhost"
```

### Run API Tests
```bash
cd backend
npm test
```

## Advanced: MongoDB with Authentication

```bash
# Run MongoDB with authentication
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secretPassword \
  -e MONGO_INITDB_DATABASE=task-tracker \
  mongo:7.0

# Update .env
MONGODB_URI=mongodb://admin:secretPassword@localhost:27017/task-tracker?authSource=admin
```

## MongoDB Compass (GUI Tool)

Download MongoDB Compass from: https://www.mongodb.com/products/compass

Connection String: `mongodb://localhost:27017`

---

**For more details, see:** `MONGODB_SETUP.md`
