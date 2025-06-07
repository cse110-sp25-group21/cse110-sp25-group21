/**
 * recommendations.js
 * This module tracks clicks on .card elements and updates a "Recommended for You" section
 * Can be connected to the real card components
 */

// Click count object - using Map for security
let cardClickCounts = new Map();

/**
 * Track clicks on cards
 * @param {Object} cardElement - Card to be tracked
 * @returns {void}
 */
function trackCardClicks(cardElement) {
  const cardName = cardElement.innerText.trim();
  
  // Validate cardName to prevent injection
  if (typeof cardName !== 'string' || cardName.length === 0) {
    return;
  }
  
  // Use Map methods for secure access
  if (cardClickCounts.has(cardName)) {
    cardClickCounts.set(cardName, cardClickCounts.get(cardName) + 1);
  } else {
    cardClickCounts.set(cardName, 1);
  }
  updateRecommendations();
}

/**
 * Update recommendations list based on click data
 * @returns {void} 
 */
function updateRecommendations() {
  const sortedCards = Array.from(cardClickCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const recList = document.getElementById("recommendation-list"); 
  //TODO: Make section in html
  if (!recList) return; // Safety check
  
  recList.innerHTML = ""; // Clear old list

  if (sortedCards.length > 0) {
      const ul = document.createElement("ul");
      sortedCards.slice(0, 3).forEach(cardName => {
        const li = document.createElement("li");
        // Sanitize output to prevent XSS
        li.textContent = String(cardName);
        ul.appendChild(li);
      });
      recList.appendChild(ul);
  }

  saveClickData();
}

/**
 * Initialize tracking (connect to cards)
 */
function initCardTracking() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", () => trackCardClicks(card));
  });
}

/**
 * Run the tracking setup on page load
 */
document.addEventListener("DOMContentLoaded", () => {
  loadClickData(); // Load saved data first
  initCardTracking();
});

/**
 * Save/load click data to localStorage
 */
function saveClickData() {
  try {
    // Convert Map to Object for JSON serialization
    const dataToSave = Object.fromEntries(cardClickCounts);
    localStorage.setItem('cardClickCounts', JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Failed to save click data:', error);
  }
}

/**
 * Loads click data back into Map and updates recommendations
 */
function loadClickData() {
  try {
    const saved = localStorage.getItem('cardClickCounts');
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Validate and convert back to Map
      if (typeof parsedData === 'object' && parsedData !== null) {
        cardClickCounts = new Map(Object.entries(parsedData));
        updateRecommendations();
      }
    }
  } catch (error) {
    console.error('Failed to load click data:', error);
    cardClickCounts = new Map(); // Reset to empty Map on error
  }
}
