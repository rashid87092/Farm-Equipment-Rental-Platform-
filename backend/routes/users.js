const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Helper functions
async function readUsersData() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// GET /api/users - Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const users = await readUsersData();
    // Remove passwords from response
    const usersResponse = users.map(({ password, ...user }) => user);
    
    res.json({
      success: true,
      count: usersResponse.length,
      data: usersResponse
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});

module.exports = router;
