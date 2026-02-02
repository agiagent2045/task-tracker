#!/usr/bin/env node

/**
 * API Test Script for Task Tracker Backend
 * 
 * This script tests all the API endpoints to verify the backend is working correctly.
 * Run: node test-api.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';
let authToken = '';
let taskId = '';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testServerRunning() {
  console.log(`\n${colors.cyan}[TEST 1]${colors.reset} Checking if server is running...`);
  try {
    const response = await makeRequest('GET', '/');
    if (response.status === 200) {
      console.log(`${colors.green}✓${colors.reset} Server is running`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Unexpected response: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Server is not running`);
    console.log(`  Error: ${error.message}`);
    console.log(`\n${colors.yellow}Please start the server first:${colors.reset}`);
    console.log(`  cd backend && npm start`);
    return false;
  }
}

async function testRegister() {
  console.log(`\n${colors.cyan}[TEST 2]${colors.reset} Testing user registration...`);
  const userData = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'test123456',
  };

  try {
    const response = await makeRequest('POST', '/api/auth/register', userData);
    if (response.status === 201 && response.data.token) {
      authToken = response.data.token;
      console.log(`${colors.green}✓${colors.reset} User registered successfully`);
      console.log(`  User: ${response.data.name} (${response.data.email})`);
      console.log(`  Token: ${authToken.substring(0, 20)}...`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Registration failed`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Registration error: ${error.message}`);
    return false;
  }
}

async function testLogin() {
  console.log(`\n${colors.cyan}[TEST 3]${colors.reset} Testing user login...`);
  // Create a new user first
  const email = `login${Date.now()}@example.com`;
  const userData = {
    name: 'Login Test',
    email: email,
    password: 'test123456',
  };

  // Register
  await makeRequest('POST', '/api/auth/register', userData);

  // Now login
  try {
    const response = await makeRequest('POST', '/api/auth/login', {
      email: email,
      password: 'test123456',
    });
    
    if (response.status === 200 && response.data.token) {
      console.log(`${colors.green}✓${colors.reset} Login successful`);
      console.log(`  User: ${response.data.name}`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Login failed`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Login error: ${error.message}`);
    return false;
  }
}

async function testGetCurrentUser() {
  console.log(`\n${colors.cyan}[TEST 4]${colors.reset} Testing get current user...`);
  try {
    const response = await makeRequest('GET', '/api/auth/me', null, authToken);
    if (response.status === 200 && response.data.email) {
      console.log(`${colors.green}✓${colors.reset} Current user retrieved`);
      console.log(`  User: ${response.data.name} (${response.data.email})`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Failed to get current user`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error: ${error.message}`);
    return false;
  }
}

async function testCreateTask() {
  console.log(`\n${colors.cyan}[TEST 5]${colors.reset} Testing task creation...`);
  const taskData = {
    title: 'Test Task',
    description: 'This is a test task created by the API test script',
    priority: 'high',
    status: 'todo',
  };

  try {
    const response = await makeRequest('POST', '/api/tasks', taskData, authToken);
    if (response.status === 201 && response.data._id) {
      taskId = response.data._id;
      console.log(`${colors.green}✓${colors.reset} Task created successfully`);
      console.log(`  Task: ${response.data.title}`);
      console.log(`  ID: ${taskId}`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Failed to create task`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error: ${error.message}`);
    return false;
  }
}

async function testGetTasks() {
  console.log(`\n${colors.cyan}[TEST 6]${colors.reset} Testing get all tasks...`);
  try {
    const response = await makeRequest('GET', '/api/tasks', null, authToken);
    if (response.status === 200 && Array.isArray(response.data)) {
      console.log(`${colors.green}✓${colors.reset} Tasks retrieved successfully`);
      console.log(`  Total tasks: ${response.data.length}`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Failed to get tasks`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error: ${error.message}`);
    return false;
  }
}

async function testUpdateTask() {
  console.log(`\n${colors.cyan}[TEST 7]${colors.reset} Testing task update...`);
  const updateData = {
    status: 'in-progress',
    priority: 'medium',
  };

  try {
    const response = await makeRequest('PUT', `/api/tasks/${taskId}`, updateData, authToken);
    if (response.status === 200 && response.data._id) {
      console.log(`${colors.green}✓${colors.reset} Task updated successfully`);
      console.log(`  Status: ${response.data.status}`);
      console.log(`  Priority: ${response.data.priority}`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Failed to update task`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error: ${error.message}`);
    return false;
  }
}

async function testDeleteTask() {
  console.log(`\n${colors.cyan}[TEST 8]${colors.reset} Testing task deletion...`);
  try {
    const response = await makeRequest('DELETE', `/api/tasks/${taskId}`, null, authToken);
    if (response.status === 200) {
      console.log(`${colors.green}✓${colors.reset} Task deleted successfully`);
      console.log(`  Message: ${response.data.message}`);
      return true;
    } else {
      console.log(`${colors.red}✗${colors.reset} Failed to delete task`);
      console.log(`  Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} Error: ${error.message}`);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log(`${colors.blue}
╔═══════════════════════════════════════════════════╗
║   Task Tracker API Test Suite                    ║
╚═══════════════════════════════════════════════════╝
${colors.reset}`);

  const results = [];

  // Run tests in sequence
  results.push(await testServerRunning());
  if (!results[0]) {
    console.log(`\n${colors.red}Cannot proceed without a running server.${colors.reset}\n`);
    process.exit(1);
  }

  results.push(await testRegister());
  results.push(await testLogin());
  results.push(await testGetCurrentUser());
  results.push(await testCreateTask());
  results.push(await testGetTasks());
  results.push(await testUpdateTask());
  results.push(await testDeleteTask());

  // Summary
  const passed = results.filter(r => r).length;
  const total = results.length;

  console.log(`\n${colors.blue}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`\n${colors.cyan}Test Summary:${colors.reset}`);
  console.log(`  Total: ${total}`);
  console.log(`  ${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`  ${colors.red}Failed: ${total - passed}${colors.reset}`);

  if (passed === total) {
    console.log(`\n${colors.green}✓ All tests passed! Your API is working correctly.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n${colors.yellow}⚠ Some tests failed. Check the output above for details.${colors.reset}\n`);
    process.exit(1);
  }
}

// Run the tests
runTests().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
