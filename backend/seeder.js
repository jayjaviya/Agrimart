const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://localhost:27017/agrimart')
  .then(async () => {
    console.log('MongoDB Connected.');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'jdjaviya98790@gmail.com' });
    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit();
    }

    // Create admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('jayid@026', salt);

    await Admin.create({
      name: 'jay javiya',
      email: 'jdjaviya98790@gmail.com',
      password: hashedPassword
    });

    console.log('Admin account created successfully.');
    process.exit();
  })
  .catch(err => {
    console.error('MongoDB Error:', err);
    process.exit(1);
  });
