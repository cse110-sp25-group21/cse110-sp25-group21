const { deleteDeck } = require("../controllers/deck.controller");

describe("deleteDeck", () => {
  beforeEach(() => {
    // Reset decks array before each test
    global.decks = [
      { id: "favorites", name: "Favorites", isAtomic: true },
      { id: "chinese", name: "Chinese", isAtomic: false },
    ];
  });

  test("should successfully delete an existing deck", () => {
    const result = deleteDeck("chinese");
    expect(result).toBe(true);
    expect(global.decks).toHaveLength(1);
    expect(global.decks.find((d) => d.id === "chinese")).toBeUndefined();
  });

  test("should return false when trying to delete non-existent deck", () => {
    const result = deleteDeck("nonexistent");
    expect(result).toBe(false);
    expect(global.decks).toHaveLength(2);
  });

  test("should not affect other decks when deleting one deck", () => {
    deleteDeck("chinese");
    expect(global.decks.find((d) => d.id === "favorites")).toBeDefined();
  });
});
