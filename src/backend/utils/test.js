/**
 * Test file to demonstrate backend usage
 * This is a temporary file for development purposes
 */

// Import backend modules
const backend = require('./index');

// Test utility functions
console.log('Hello World function:', backend.utils.helloWorld());
console.log('Sum function (2 + 3):', backend.utils.sum(2, 3));
console.log('Random number between 1 and 10:', backend.utils.randomNumGen(1, 10));

// Initialize server
const server = backend.server.initServer();
console.log('Server initialized successfully');

// This is just a test file, add more tests as needed
console.log('Backend test completed successfully');
