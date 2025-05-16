/**
 * Configuration index file
 * Centralized configuration for the application
 */

const config = {
  // Application configuration
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  
  // Database configuration
  database: {
    // url: process.env.DB_URL || 'mongodb://localhost:27017/mydatabase',
    // options: {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }
  }
};

module.exports = config;