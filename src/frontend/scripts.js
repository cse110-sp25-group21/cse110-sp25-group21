/**
 * @fileoverview Scripts for any front end elements like cards flipping
 */
/**
 * Initialize flip-card behavior as soon as the DOM is ready.
 * Finds the button with class `.card-button` and the card with
 * id `#flip-card`, then wires up a click listener to toggle
 * the `flipped` CSS class on the card.
 * @listens document#DOMContentLoaded
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".card-button");
  const card = document.getElementById("flip-card");

  if (!button || !card) {
    console.warn("Flip-card elements not found in DOM");
    return;
  }

  /**
   * Toggle the flipped state of the card element.
   * @param {MouseEvent} event – the click event object
   * @returns {void}
   * @listens HTMLButtonElement#click
   */
  button.addEventListener("click", (event) => {
    card.classList.toggle("flipped");
  });
});
