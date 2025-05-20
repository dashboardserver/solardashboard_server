const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const exists = await User.findOne({ username: 'adminsolar' });
    if (exists) {
      console.log('❗️Admin already exists');
      return process.exit(0);
    }

    const hashed = await bcrypt.hash('@admin1234', 10);
    await User.create({
      username: 'adminsolar',
      password: hashed,
      role: 'admin'
    });

    console.log('✅ Admin user created');
    process.exit(0);
  });
