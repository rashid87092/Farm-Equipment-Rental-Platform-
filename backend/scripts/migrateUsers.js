const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const connectDB = require('../config/db');
const User = require('../models/User');

const USERS_FILE = path.join(__dirname, '../data/users.json');

async function run() {
  await connectDB();

  const raw = await fs.readFile(USERS_FILE, 'utf8');
  const users = JSON.parse(raw);

  for (const user of users) {
    const existing = await User.findOne({ email: user.email.toLowerCase() });
    if (existing) {
      console.log(`Skipping existing user: ${user.email}`);
      continue;
    }

    await User.create({
      name: user.name,
      email: user.email.toLowerCase(),
      password: user.password,
      userType: user.userType || 'farmer',
      phone: user.phone || '',
      location: user.location || '',
      coordinates: user.coordinates,
      verified: Boolean(user.verified),
      profile: user.profile || {},
    });

    console.log(`Imported user: ${user.email}`);
  }

  console.log('User migration completed');
  process.exit(0);
}

run().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
