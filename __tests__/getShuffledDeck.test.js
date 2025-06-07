const { getShuffledDeck } = require("../controllers/deck.controller");

describe("getShuffledDeck", () => {
  test("should return empty array for any user preferences", () => {
    const userPreferences = {
      cuisine: "italian",
      priceRange: "medium",
    };
    const result = getShuffledDeck(userPreferences);
    expect(result).toEqual([]);
  });
});
