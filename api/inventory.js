const express = require('express');
const connectDB = require('../server/config/db');
const inventoryRoutes = require('../server/routes/inventory');
const authMiddleware = require('../server/middleware/auth');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/inventory', authMiddleware, inventoryRoutes);

module.exports = app;