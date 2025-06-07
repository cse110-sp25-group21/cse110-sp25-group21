//this is a mock test for sum.js
const { sum } = require('../code-to-unit-test/sum.js');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 2 + 2 to equal 4', () => {
  expect(sum(2, 2)).toBe(4);
});

test('non-numeric input throws error', () => {
  expect(() => sum(1, 'a')).toThrow('Both arguments must be numbers');
});