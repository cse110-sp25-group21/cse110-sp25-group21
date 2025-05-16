document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".card-button");
  const card = document.getElementById("flip-card");

  button.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});