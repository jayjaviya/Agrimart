const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
const adminRoutes = require('./routes/adminRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/admin', adminRoutes);
app.use('/api/tickets', ticketRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/agrimart')
.then(() => console.log('MongoDB Connected successfully.'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Base route
app.get('/', (req, res) => {
  res.send('Agrimart API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
