const { removeCardFromDeck } = require("../controllers/deck.controller");

describe("removeCardFromDeck", () => {
  beforeEach(() => {
    // Reset decks array before each test
    global.decks = [
      {
        id: "favorites",
        name: "Favorites",
        isAtomic: true,
        cards: ["rest1", "rest2"],
      },
      { id: "chinese", name: "Chinese", isAtomic: false, cards: ["rest3"] },
    ];
  });

  test("should successfully remove a card from deck", () => {
    const result = removeCardFromDeck("favorites", "rest1");
    expect(result).toBe(true);
    expect(global.decks[0].cards).not.toContain("rest1");
    expect(global.decks[0].cards).toContain("rest2");
  });

  test("should return false when card does not exist in deck", () => {
    const result = removeCardFromDeck("chinese", "rest1");
    expect(result).toBe(false);
    expect(global.decks[1].cards).toHaveLength(1);
  });

  test("should return false when deck does not exist", () => {
    const result = removeCardFromDeck("nonexistent", "rest1");
    expect(result).toBe(false);
  });
});
