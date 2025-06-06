const { saveToFavorites } = require("../controllers/deck.controller");

describe("saveToFavorites", () => {
  test("should accept any user ID and restaurant ID", () => {
    const userId = "user123";
    const restaurantId = "rest456";
    expect(() => saveToFavorites(userId, restaurantId)).not.toThrow();
  });
});
