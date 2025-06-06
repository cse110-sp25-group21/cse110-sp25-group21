const { getUserPreferences } = require("../controllers/deck.controller");

describe("getUserPreferences", () => {
  test("should return empty object for any user ID", () => {
    const result = getUserPreferences("user123");
    expect(result).toEqual({});
  });
});
