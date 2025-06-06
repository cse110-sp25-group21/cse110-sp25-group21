// Load decks from localStorage key "restaurantsData"
let decks = [];

// Clear corrupted localStorage for testing
function clearLocalStorage() {
  localStorage.removeItem("restaurantsData");
  console.log("Cleared localStorage");
}

// Initialize decks on first load
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

// Save current decks into restaurantsData key
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

// Return the current list of decks
function getDecks() {
  if (decks.length === 0) {
    loadDecks(); // Only load if decks is empty
  }
  return decks;
}

// Create a new deck
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

// Delete a deck
function deleteDeck(deckId) {
  const initialLength = decks.length;
  decks = decks.filter((deck) => deck.id !== deckId);
  const changed = decks.length !== initialLength;
  if (changed) saveDecks();
  return changed;
}

// Add a card to a deck
function addCardToDeck(deckId, restaurantId) {
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) return false;
  if (!deck.cards.includes(restaurantId)) {
    deck.cards.push(restaurantId);
    saveDecks();
    return true;
  }
  return false;
}

// Remove a card from a deck
function removeCardFromDeck(deckId, restaurantId) {
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) return false;
  const index = deck.cards.indexOf(restaurantId);
  if (index !== -1) {
    deck.cards.splice(index, 1);
    saveDecks();
    return true;
  }
  return false;
}

function getDeckImage(deckID) {
  return "../design/deckCover_default.jpg";
}

// Expose to global scope
window.getDecks = getDecks;
window.getDeckImage = getDeckImage;
window.createDeck = createDeck;
window.deleteDeck = deleteDeck;
window.addCardToDeck = addCardToDeck;
window.removeCardFromDeck = removeCardFromDeck;
window.clearLocalStorage = clearLocalStorage;