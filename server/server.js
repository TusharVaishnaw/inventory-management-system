const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/admin'); 
const apiRoutes = require('./routes/api'); // Centralized route file
const outsetRoutes = require('./routes/outset');
const insetRoutes = require('./routes/insets'); // Add inset routes
const inventoryRoutes = require('./routes/inventory'); // Add inventory routes
const metadataRoutes = require('./routes/metadata'); // metadata

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration - Updated for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://inventorymgmtv1-production.up.railway.app'] 
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware FIRST
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight across all routes

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// API Routes - BEFORE static files
app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/api/outset', outsetRoutes);
app.use('/api/insets', insetRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/metadata', metadataRoutes);

// Serve static files from React build (AFTER API routes)
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch all handler: send back React's index.html file for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});