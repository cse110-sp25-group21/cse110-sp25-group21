const { createDeck } = require("../controllers/deck.controller");

describe("createDeck", () => {
  beforeEach(() => {
    // Reset decks array before each test
    global.decks = [
      { id: "favorites", name: "Favorites", isAtomic: true },
      { id: "chinese", name: "Chinese", isAtomic: false },
    ];
  });

  test("should create a new deck with valid parameters", () => {
    const newDeck = createDeck("Italian Food", false);
    expect(newDeck).toEqual({
      id: "italian_food",
      name: "Italian Food",
      isAtomic: false,
    });
    expect(global.decks).toHaveLength(3);
  });

  test("should throw error when creating deck with duplicate name", () => {
    expect(() => createDeck("Chinese", false)).toThrow(
      'Deck with name "Chinese" already exists'
    );
  });

  test("should create deck with default isAtomic value", () => {
    const newDeck = createDeck("Mexican Food");
    expect(newDeck.isAtomic).toBe(false);
  });
});
