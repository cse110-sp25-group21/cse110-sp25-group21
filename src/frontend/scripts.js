
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


/**
  * Toggle the flipped state of the card element.
  * @returns {void}
  * @listens HTMLButtonElement#click
*/
function flipCard() {
  const button = document.querySelector(".card-button");
  const card   = document.getElementById("flip-card");
  if (!button || !card) return;
  button.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
}

document.addEventListener("DOMContentLoaded", flipCard);


//module.exports = { flipCard };

