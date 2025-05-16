/**
 * Main server file
 * Entry point for the backend application
 */


// const express = require('express');
// const config = require('./config');
// const routes = require('./routes');
// const middleware = require('./middleware');

// For now, let's expose our utility functions for testing
const utils = require('./utils');

// Function to initialize the server
function initServer() {
  console.log('Server initialized');
  return {
    utils
  };
}

// If this file is run directly (node server.js), start the server
if (require.main === module) {
  console.log('Starting server...');
  initServer();
}

// Export for testing and importing in other files
module.exports = {
  initServer
}; 