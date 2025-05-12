const { randomNumGen } = require("../code-to-unit-test/rng.js");

test("randomNumGen returns a number", () => {
    expect(typeof randomNumGen(1,10)).toBe("number");
});

test("randomNumGen returns a number between 0 and 100", () => {
    const num = randomNumGen(0,100);
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThanOrEqual(100);
});

test("randomNumGen throws error when called with a non-number", () => {
    expect(() => randomNumGen("string")).toThrow("Input must be a number");
});

test("randomNumGen throws error when min is greater than max", () => {
    expect(() => randomNumGen(10, 5)).toThrow("Min should be less than max");
});

test("randomNumGen returns min when min and max are equal", () => {
    expect(randomNumGen(5, 5)).toBe(5);
});