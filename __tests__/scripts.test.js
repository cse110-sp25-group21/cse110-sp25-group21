/**
 * @jest-environment jsdom
 */

// tests card flip from src/frontend/scripts.js 
// run using 'npm test /__tests__/scripts.test.js'
const fs = require('fs');
const path = require('path');
const { flipCard } = require('../src/frontend/scripts.js');

describe("flip-card script", () => {
  beforeEach(() => {
    const html = `
      <button class="card-button">Flip</button>
      <div id="flip-card"></div>
    `;
    document.body.innerHTML = html;
    flipCard();
  });

  test("changes 'flipped' class on click", () => {
    const button = document.querySelector(".card-button");
    const card   = document.getElementById("flip-card");

    // initially not flipped
    expect(card.classList.contains("flipped")).toBe(false);

    // click button
    button.click();
    expect(card.classList.contains("flipped")).toBe(true);

    // click to flip again
    button.click();
    expect(card.classList.contains("flipped")).toBe(false);
  });

  test("does nothing if elements missing", () => {
    document.body.innerHTML = ""; // no button or card
    expect(() => flipCard()).not.toThrow();
  });
});
