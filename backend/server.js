/**
 * DockerJudge - Secure Code Execution Engine
 * Main Express server entry point
 */

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const executeRoute = require('./routes/execute');
const problemsRoute = require('./routes/problems');
const submitRoute = require('./routes/submit');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
console.log('Loading routes...');
app.use('/api', executeRoute);
app.use('/api', problemsRoute);
app.use('/api', submitRoute);
console.log('Routes loaded successfully');

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 DockerJudge server running at http://${HOST}:${PORT}`);
  console.log(`📝 POST http://${HOST}:${PORT}/api/execute to submit code`);
  console.log(`❤️  GET  http://${HOST}:${PORT}/health for health check`);
});

module.exports = app;
