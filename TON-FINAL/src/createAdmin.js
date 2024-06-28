const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const createAdminUser = async () => {
  try {
    const adminUser = new User({
      telegramId: 'admin123',
      username: 'admin',
      isAdmin: true,
    });

    await adminUser.save();
    console.log('Admin user created');
    process.exit();
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
};

connectDB().then(createAdminUser);
