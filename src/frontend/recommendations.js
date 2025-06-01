// recommendations.js
// This module tracks clicks on .card elements and updates a "Recommended for You" section
// Can be connected to the real card components when they are ready

// Click count object
let cardClickCounts = {};

// Function: Track clicks on cards
function trackCardClicks(cardElement) {
  const cardName = cardElement.innerText.trim();
  if (cardClickCounts[cardName]) {
    cardClickCounts[cardName]++;
  } else {
    cardClickCounts[cardName] = 1;
  }
  updateRecommendations();
}

// Function: Update recommendations list
function updateRecommendations() {
  const sortedCards = Object.entries(cardClickCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const recList = document.getElementById("recommendation-list"); //TODO: Make section in html
  recList.innerHTML = ""; // Clear old list


  if (sortedCards.length > 0) {
      const ul = document.createElement("ul");
      sortedCards.slice(0, 3).forEach(cardName => {
        const li = document.createElement("li");
        li.textContent = cardName;
        ul.appendChild(li);
      });
      recList.appendChild(ul);
  }

  saveClickData();
}

// Function: Initialize tracking (connect to cards)
function initCardTracking() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", () => trackCardClicks(card));
  });
}

// Run the tracking setup on page load
document.addEventListener("DOMContentLoaded", () => {
  loadClickData(); // Load saved data first
  initCardTracking();
});

// Save/load click data to localStorage
function saveClickData() {
  localStorage.setItem('cardClickCounts', JSON.stringify(cardClickCounts));
}

function loadClickData() {
  const saved = localStorage.getItem('cardClickCounts');
  if (saved) {
    cardClickCounts = JSON.parse(saved);
    updateRecommendations();
  }
}
