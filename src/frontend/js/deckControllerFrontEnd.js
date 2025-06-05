// Define initial decks with empty cards arrays
let decks = [
  { id: "favorites", name: "Favorites", isAtomic: true, cards: [] },
  { id: "chinese", name: "Chinese", isAtomic: false, cards: [] },
];

// Return the current list of decks
function getDecks() {
  return decks;
}


// Create a new deck
function createDeck(name, isAtomic = false) {
  const id = name.toLowerCase().replace(/\s+/g, "_");
  if (decks.some((deck) => deck.id === id)) {
    console.error(`Deck with name "${name}" already exists`);
    return null;
  }

  const newDeck = { id, name, isAtomic, cards: [] };
  decks.push(newDeck);
  return newDeck;
}

// Delete a deck
function deleteDeck(deckId) {
  const initialLength = decks.length;
  decks = decks.filter((deck) => deck.id !== deckId);
  return decks.length !== initialLength;
}

// Add a card to a deck
function addCardToDeck(deckId, restaurantId) {
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) return false;

  if (!deck.cards.includes(restaurantId)) {
    deck.cards.push(restaurantId);
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
    return true;
  }
  return false;
}

function getDeckImage(deckID) {
  return "design/cardCover_default.jpg";
}


// Expose to global scope
window.getDecks = getDecks;
window.getDeckImage = getDeckImage;
window.createDeck = createDeck;
window.deleteDeck = deleteDeck;
window.addCardToDeck = addCardToDeck;
window.removeCardFromDeck = removeCardFromDeck;

