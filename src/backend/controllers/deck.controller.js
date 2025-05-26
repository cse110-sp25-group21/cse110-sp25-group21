// src/backend/controllers/deckController.js

/**
 * Get a shuffled deck of restaurant cards based on user preferences
 * @param {Object} userPreferences - User's preferences for restaurant recommendations
 * @return {Array} an array of shuffled restaurant cards  
*/
function getShuffledDeck(userPreferences) {
  console.log("getShuffledDeck called with:", userPreferences);
  return [];
}

/** 
 * Save a restaurant to the user's favorites
 * @param {string} userId - Unique identifier for the user
 * @param {string} restaurantId - Unique identifier for the restaurant
 * @return {void}
*/
function saveToFavorites(userId, restaurantId) {
  console.log(`saveToFavorites called with userId=${userId}, restaurantId=${restaurantId}`);
}

/** 
 * Remove a restaurant from the user's favorites
 * @param {string} userId - Unique identifier for the user
 * @param {string} restaurantId - Unique identifier for the restaurant
 * @return {void}
*/
function removeFromFavorites(userId, restaurantId) {
  console.log(`removeFromFavorites called with userId=${userId}, restaurantId=${restaurantId}`);
}

/** 
 * Get current user preferences
 * @param {string} userId - Unique identifier for the user
 * @return {Object} User preferences object containing settings like cuisine, price range, etc.
*/
function getUserPreferences(userId) {
  console.log(`getUserPreferences called for userId=${userId}`);
  return {};
}

/**
 * Update user preferences
 * @param {string} userId - Unique identifier for the user
 * @param {Object} preferences - New preferences to set (e.g., cuisine, price range)
 * @return {void}
 */
function setUserPreferences(userId, preferences) {
  console.log(`setUserPreferences called with userId=${userId}, preferences=`, preferences);
}

module.exports = {
  getShuffledDeck,
  saveToFavorites,
  removeFromFavorites,
  dismissRestaurant,
  getUserPreferences,
  setUserPreferences
};
