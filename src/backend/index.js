/**
 * Main entry point for the backend application
 * This file exports all the necessary backend modules
 */

const server = require('./server');
const utils = require('./utils');
const config = require('./config');
// const models = require('./models');
// const controllers = require('./controllers');
// const services = require('./services');
// const routes = require('./routes');
// const middleware = require('./middleware');

module.exports = {
  server,
  utils,
  config,
  // models,
  // controllers,
  // services,
  // routes,
  // middleware
}; 