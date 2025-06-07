const { getDecks } = require("../controllers/deck.controller");

describe("getDecks", () => {
  beforeEach(() => {
    // Reset decks array before each test
    global.decks = [
      { id: "favorites", name: "Favorites", isAtomic: true },
      { id: "chinese", name: "Chinese", isAtomic: false },
    ];
  });

  test("should return all decks", () => {
    const decks = getDecks();
    expect(decks).toHaveLength(2);
    expect(decks).toEqual(global.decks);
  });

  test("should return empty array when no decks exist", () => {
    global.decks = [];
    const decks = getDecks();
    expect(decks).toHaveLength(0);
  });

  test("should return decks with correct structure", () => {
    const decks = getDecks();
    decks.forEach((deck) => {
      expect(deck).toHaveProperty("id");
      expect(deck).toHaveProperty("name");
      expect(deck).toHaveProperty("isAtomic");
    });
  });
});
