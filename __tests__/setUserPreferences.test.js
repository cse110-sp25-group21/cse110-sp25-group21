const { setUserPreferences } = require("../controllers/deck.controller");

describe("setUserPreferences", () => {
  test("should accept any user ID and preferences", () => {
    const userId = "user123";
    const preferences = {
      cuisine: "italian",
      priceRange: "medium",
      distance: 5,
    };
    expect(() => setUserPreferences(userId, preferences)).not.toThrow();
  });
});
