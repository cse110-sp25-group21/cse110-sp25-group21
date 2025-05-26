/**
 * Controllers index file
 * Export all controllers from this file
 */

// Example controller export
const UserController = require('./user.controller');
const DeckController = require('./deck.controller');
module.exports = {
  UserController,
  DeckController
}; 