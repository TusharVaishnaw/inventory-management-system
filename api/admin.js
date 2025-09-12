const express = require('express');
const connectDB = require('../server/config/db');
const adminRoutes = require('../server/routes/admin');
const authMiddleware = require('../server/middleware/auth');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/admin', authMiddleware, adminRoutes);

module.exports = app;