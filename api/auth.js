const express = require('express');
const connectDB = require('../server/config/db');
const authRoutes = require('../server/routes/auth');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

module.exports = app;