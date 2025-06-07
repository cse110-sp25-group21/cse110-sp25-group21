/**
 * Deck Controller Frontend
 */

// Load decks from localStorage key "restaurantsData"
let decks = [];

/**
 * Clear corrupted localStorage for testing
 */
function clearLocalStorage() {
  localStorage.removeItem("restaurantsData");
  console.log("Cleared localStorage");
}

/**
 * Initialize decks on first load
 */
function loadDecks() {
  let savedData = JSON.parse(localStorage.getItem("restaurantsData")) || {};
  
  // Fix: Handle corrupted data structure (when savedData is an array instead of object)
  if (Array.isArray(savedData)) {
    console.log("Found corrupted array structure, converting to proper format");
    savedData = { restaurants: savedData, decks: [] };
    // Save the corrected structure
    localStorage.setItem("restaurantsData", JSON.stringify(savedData));
  }
  
  console.log("loadDecks() called - savedData:", savedData);
  console.log("savedData.decks:", savedData.decks);
  console.log("savedData.decks length:", savedData.decks ? savedData.decks.length : "undefined");
  
  // If decks exist in localStorage, use them
  if (savedData.decks && savedData.decks.length > 0) {
    decks = savedData.decks;
    console.log("Loaded existing decks from localStorage:", decks);
  } else {
    // If no decks exist, create the default ones
    decks = [
      {
        id: "fast_food",
        name: "Fast Food Favorites",
        isAtomic: true,
        cards: ["Chick-fil-A", "KFC"]
      },
      {
        id: "ucsd_dining_halls",
        name: "UCSD Dining Halls",
        isAtomic: true,
        cards: ["Makai", "UMI"]
      }
    ];
  
    saveDecks(); // Save the defaults
    console.log("Created default decks:", decks);
  }
}

/**
 * Save current decks into restaurantsData key
 */
function saveDecks() {
  let currentData = JSON.parse(localStorage.getItem("restaurantsData")) || {};
  
  // Fix: Ensure currentData is always an object, not an array
  if (Array.isArray(currentData)) {
    console.log("Found array in localStorage, converting to proper structure");
    currentData = { restaurants: currentData, decks: [] };
  }
  
  // Ensure restaurants property exists
  if (!currentData.restaurants) {
    currentData.restaurants = [];
  }
  
  currentData.decks = decks;
  localStorage.setItem("restaurantsData", JSON.stringify(currentData));
  console.log("Saved decks to localStorage:", currentData);
}

/**
 * Return the current list of decks
 * @returns Current deck list
 */
function getDecks() {
  if (decks.length === 0) {
    loadDecks(); // Only load if decks is empty
  }
  return decks;
}

/**
 * Create a new deck
 * @param {string} name - Name of Deck
 * @param {boolean} isAtomic - Whether the deck is atomic (true) or composite (false)
 * @returns {Object} Newly created deck
 */
function createDeck(name, isAtomic = false) {
  // Make sure decks are loaded
  if (decks.length === 0) {
    loadDecks();
  }
  
  const id = name.toLowerCase().replace(/\s+/g, "_");
  if (decks.some((deck) => deck.id === id)) {
    console.error(`Deck with name "${name}" already exists`);
    return null;
  }
  
  const newDeck = { id, name, isAtomic, cards: [] };
  decks.push(newDeck);
  saveDecks();
  console.log("Created new deck:", newDeck);
  return newDeck;
}

/**
 * Delete a deck
 * @param {string} deckId - ID of the deck to delete
 * @returns {boolean} true if deck was deleted, false if deck wasn't found
 */
function deleteDeck(deckId) {
  const initialLength = decks.length;
  decks = decks.filter((deck) => deck.id !== deckId);
  const changed = decks.length !== initialLength;
  if (changed) saveDecks();
  return changed;
}

/**
 * Adds a card to a deck
 * @param {string} deckID - ID of the deck to add card to
 * @param {string} restaurantId - ID of the restaurant to add as a card
 * @returns {boolean} true if card was added, false if it already exists or deck not found
 */
function addCardToDeck(deckID, restaurantId) {
  const deck = decks.find((d) => d.id === deckID);
  if (!deck) return false;
  if (!deck.cards.includes(restaurantId)) {
    deck.cards.push(restaurantId);
    saveDecks();
    return true;
  }
  return false;
}

/**
 * Remove a card from a deck
 * @param {string} deckId - ID of the deck to remove card from
 * @param {string} restaurantId ID of the restaurant to add as a card
 * @returns {boolean} true if card was removed, false if it wasn't found or deck not found
 */
function removeCardFromDeck(deckId, restaurantId) {
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) return false;
  const index = deck.cards.indexOf(restaurantId);
  if (index !== -1) {
    deck.cards.splice(index, 1);
    
    // Check if this restaurant is used in any other deck
    const isUsedInOtherDecks = decks.some(d => 
      d.id !== deckId && d.cards.includes(restaurantId)
    );
    
    // If not used in any other deck, remove from global restaurant storage
    if (!isUsedInOtherDecks) {
      removeRestaurantFromStorage(restaurantId);
    }
    
    saveDecks();
    return true;
  }
  return false;
}

/**
 * Remove a restaurant from global storage completely
 * @param {string} restaurantId - Name/ID of the restaurant to remove
 */
function removeRestaurantFromStorage(restaurantId) {
  let currentData = JSON.parse(localStorage.getItem('restaurantsData')) || {};
  
  if (currentData.restaurants && Array.isArray(currentData.restaurants)) {
    // Remove restaurant from the global storage
    currentData.restaurants = currentData.restaurants.filter(restaurant => 
      restaurant.title !== restaurantId
    );
    
    localStorage.setItem('restaurantsData', JSON.stringify(currentData));
  }
}

/**
 * Returns deck cover image (custom or default)
 * @param {Object} deck - Deck object (can also accept deckID for backward compatibility)
 * @returns {string} - path or data URL for deck cover image
 */
function getDeckImage(deck) {
  // Handle backward compatibility - if passed a string, find the deck
  if (typeof deck === 'string') {
    const deckId = deck;
    const decks = getDecks();
    deck = decks.find(d => d.id === deckId);
  }
  
  // Return custom image if it exists, otherwise default
  if (deck && deck.customImage) {
    return deck.customImage;
  }
  return "../design/deckCover_default.jpg";
}

/**
 * Update deck image
 * @param {string} deckId - ID of the deck to update
 * @param {string} imageData - Base64 image data
 * @returns {boolean} true if successful, false otherwise
 */
function updateDeckImage(deckId, imageData) {
  const deck = decks.find(d => d.id === deckId);
  if (!deck) {
    console.error(`Deck not found: ${deckId}`);
    return false;
  }
  
  // Update the deck with custom image
  deck.customImage = imageData;
  saveDecks();
  
  console.log(`Updated image for deck: ${deckId}`);
  return true;
}

// Expose to global scope
window.getDecks = getDecks;
window.getDeckImage = getDeckImage;
window.updateDeckImage = updateDeckImage;
window.createDeck = createDeck;
window.deleteDeck = deleteDeck;
window.addCardToDeck = addCardToDeck;
window.removeCardFromDeck = removeCardFromDeck;
window.removeRestaurantFromStorage = removeRestaurantFromStorage;
window.clearLocalStorage = clearLocalStorage;