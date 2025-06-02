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
  console.log(
    `saveToFavorites called with userId=${userId}, restaurantId=${restaurantId}`
  );
}

/**
 * Remove a restaurant from the user's favorites
 * @param {string} userId - Unique identifier for the user
 * @param {string} restaurantId - Unique identifier for the restaurant
 * @return {void}
 */
function removeFromFavorites(userId, restaurantId) {
  console.log(
    `removeFromFavorites called with userId=${userId}, restaurantId=${restaurantId}`
  );
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
  console.log(
    `setUserPreferences called with userId=${userId}, preferences=`,
    preferences
  );
}

// NOTE: I hard Coded Data that we may later change to be ported to a DB

let decks = [
  { id: "favorites", name: "Favorites", isAtomic: true },
  { id: "chinese", name: "Chinese", isAtomic: false },
  { id: "chickfila", name: "Chickfila", isAtomic: false },
];

/**
 * get the current user's decks
 * @return {Array<Object>} - Array of deck objects with id, name, and image metadata
 *
 * Objects = { id, name} - important to have id and name seperate in case we end up expanding mult users
 */

export function getDecks() {
  return decks;
}

/**
 * get the image path for a specific deck
 * safeName: replaces white space w/ _ and sets everything to lower case, assume img is associated w name
 * default picture if user doesn't preset one for the deck is the cardCover_default.jpg we have
 * @param {Object} deck - deck object containing at least a `name` string
 * @return {string} relative path to the image file for the deck
 */
export function getDeckImage(deck) {
  const safeName = deck.name.toLowerCase().replace(/\s+/g, "_");
  const userAssignedPath = `design/${safeName}.jpg`;

  const img = new Image();
  img.src = userAssignedPath;

  // preload image and fallback to default if it fails
  img.onerror = () => {
    img.src = "design/cardCover_default.jpg";
  };

  return img.src;
}

/**
 * Create a new deck
 * @param {string} name - Name of the deck to create
 * @param {boolean} isAtomic - Whether the deck is atomic (true) or composite (false)
 * @return {Object} The newly created deck object
 */
function createDeck(name, isAtomic = false) {
  // Create a safe ID by converting name to lowercase and replacing spaces with underscores
  const id = name.toLowerCase().replace(/\s+/g, "_");

  // Check if deck with same ID already exists
  if (decks.some((deck) => deck.id === id)) {
    throw new Error(`Deck with name "${name}" already exists`);
  }

  const newDeck = {
    id,
    name,
    isAtomic,
  };

  decks.push(newDeck);
  return newDeck;
}

/**
 * Delete a deck by its ID
 * @param {string} deckId - ID of the deck to delete
 * @return {boolean} true if deck was deleted, false if deck wasn't found
 * 
 * this should work lmk if it doesnt -ryunzz
 */
function deleteDeck(deckId) {
  const initialLength = decks.length;
  decks = decks.filter((deck) => deck.id !== deckId);
  return decks.length !== initialLength;
}

module.exports = {
  getShuffledDeck,
  saveToFavorites,
  removeFromFavorites,
  dismissRestaurant,
  getUserPreferences,
  setUserPreferences,
  createDeck,
  deleteDeck,
};
