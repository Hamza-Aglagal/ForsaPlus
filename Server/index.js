const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/auth');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('ForsaPlus API is running');
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

// Use the correct MongoDB connection string to match your MongoDB Compass connection
const MONGODB_URI = 'mongodb+srv://hamzaaglagalhamza:nucWGzZK6VmP6iEl@cluster0.en0smm3.mongodb.net/Forsa?retryWrites=true&w=majority';

console.log('Attempting to connect to MongoDB Atlas...');

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }); 