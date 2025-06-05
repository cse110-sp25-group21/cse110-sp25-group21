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

let decks = [
  { id: "favorites", name: "Favorites", isAtomic: true },
  { id: "chinese", name: "Chinese", isAtomic: false }
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
 * default picture if user doesn't preset one for the deck is the cardCover_default.jpg we have
 * @param {Object} deckID - The deck object containing id and name
 * @return {string} relative path to the image file for the deck
 */
export function getDeckImage(deckID) {

  img.src = "design/cardCover_default.jpg";
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

/**
 * Adds a card to a deck
 * @param {string} deckId - ID of the deck to add card to
 * @param {string} restaurantId - ID of the restaurant to add as a card
 * @returns {boolean} true if card was added, false if it already exists or deck not found
 */
function addCardToDeck(deckId, restaurantId) {
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) return false;

  if (!deck.cards.includes(restaurantId)) {
    deck.cards.push(restaurantId);
    return true;
  }
  return false;
}

/**
 * Removes a card from a deck
 * @param {string} deckId - ID of the deck to remove card from
 * @param {string} restaurantId - ID of the restaurant to remove from the deck
 * @returns {boolean} true if card was removed, false if it wasn't found or deck not found
 */
function removeCardFromDeck(deckId, restaurantId) {
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) return false;

  const index = deck.cards.indexOf(restaurantId);
  if (index !== -1) {
    deck.cards.splice(index, 1);
    return true;
  }
  return false;
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
  getDecks,
  addCardToDeck,
  removeCardFromDeck
};