const { addCardToDeck } = require("../controllers/deck.controller");

describe("addCardToDeck", () => {
  beforeEach(() => {
    // Reset decks array before each test
    global.decks = [
      { id: "favorites", name: "Favorites", isAtomic: true, cards: [] },
      { id: "chinese", name: "Chinese", isAtomic: false, cards: ["rest1"] },
    ];
  });

  test("should successfully add a card to an empty deck", () => {
    const result = addCardToDeck("favorites", "rest2");
    expect(result).toBe(true);
    expect(global.decks[0].cards).toContain("rest2");
  });

  test("should return false when adding duplicate card", () => {
    const result = addCardToDeck("chinese", "rest1");
    expect(result).toBe(false);
    expect(global.decks[1].cards).toHaveLength(1);
  });

  test("should return false when deck does not exist", () => {
    const result = addCardToDeck("nonexistent", "rest2");
    expect(result).toBe(false);
  });
});
