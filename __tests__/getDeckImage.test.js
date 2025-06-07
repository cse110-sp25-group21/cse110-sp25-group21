const { getDeckImage } = require("../controllers/deck.controller");

describe("getDeckImage", () => {
  test("should return default image path for any deck", () => {
    const deck = { id: "test", name: "Test Deck" };
    const imagePath = getDeckImage(deck);
    expect(imagePath).toBe("design/cardCover_default.jpg");
  });
});
