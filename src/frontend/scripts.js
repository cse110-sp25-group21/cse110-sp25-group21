/**
 * @fileoverview Restaurant card selector application for Powell's Bowells
 * Manages restaurant data display and navigation between cards
 * @author Powell's Bowells Team
 * @version 1.0.0
 */

/**
 * @typedef {Object} Restaurant
 * @property {string} title - The name of the restaurant
 * @property {string} image - Relative path to the restaurant's image
 * @property {number} rating - Restaurant rating from 1-5 stars
 * @property {string} type - Type of cuisine (e.g., 'American', 'Mediterranean')
 * @property {string} phone - Restaurant phone number in format (xxx) xxx-xxxx
 * @property {string} website - Restaurant website domain
 * @property {string} address - Full street address including city and zip
 * @property {string} hours - Operating hours in format "X AM - Y PM"
 */

const LOCAL_STORAGE_KEY = 'restaurantsData';

/**
 * Array containing all restaurant data for the application
 * Each restaurant represents a local establishment in the La Jolla/San Diego area
 * @type {Restaurant[]}
 */
var defaultStaticRestaurants = [
  {
    title: 'Chick-fil-A',
    image: '../design/chickfila.jpg',
    rating: 5,
    type: 'American',
    phone: '(858) 450-4417',
    website: 'chick-fil-a.com',
    address: '3351 Nobel Dr, La Jolla, CA 92037',
    hours: '8 AM - 11 PM'
  },
  {
    title: 'Cava Mediterranean',
    image: '../design/cava.jpg',
    rating: 4,
    type: "Mediterranean",
    phone: '(858) 433-0356',
    website: 'cava.com',
    address: '8849 Villa La Jolla Dr Suite 301, La Jolla, CA, 92037',
    hours: '10 AM - 10 PM'
  },
  {
    title: 'Hamburger Hut',
    image: '../design/hamburger.jpg',
    rating: 3,
    type: 'American',
    phone: '(760) 230-1999',
    website: 'hamburgerhut.com',
    address: '576 N Coast Hwy 101, Encinitas, CA 92024',
    hours: '11 AM - 9 PM'
  },
  {
    title: 'Tacos El Rey',
    image: '../design/foodspread.png',
    rating: 4,
    type: 'Mexican',
    phone: '(858) 638-0003',
    website: 'primosmex.com',
    address: '7770 Regents Rd #109, San Diego, CA 92122',
    hours: '11 AM - 12 PM'
  }
];
window.defaultStaticRestaurants = defaultStaticRestaurants;

var restaurants = [];

/**
 * Current index of the restaurant being displayed in the card selector
 * Used to track which restaurant is currently shown to the user
 * @type {number}
 */
var currentIndex = 0;

/**
 * Renders the current restaurant's information to the DOM elements
 * Updates the restaurant image, title, and star rating display
 * Called whenever the user navigates between restaurants
 * @function
 * @returns {void}
 */
function renderRestaurant() {
  var restaurant = restaurants[currentIndex];
  var imgElement = document.getElementById('restaurant-image');
  var titleElement = document.getElementById('restaurant-title');
  var ratingElement = document.getElementById('restaurant-rating');

  if (imgElement) imgElement.src = restaurant.image;
  if (titleElement) titleElement.textContent = restaurant.title;
  if (ratingElement) {
    var stars = '';
    for (var i = 0; i < restaurant.rating; i++) {
      stars += '★';
    }
    for (var j = restaurant.rating; j < 5; j++) {
      stars += '☆';
    }
    ratingElement.textContent = stars;
  }
}

/**
 * Advances to the next restaurant in the array
 * Implements circular navigation - wraps to first restaurant when at the end
 * Updates the display with the new restaurant information
 * @function
 * @returns {void}
 */
function goNext() {
  currentIndex = (currentIndex + 1) % restaurants.length;
  renderRestaurant();
}

/**
 * Goes back to the previous restaurant in the array
 * Implements circular navigation - wraps to last restaurant when at the beginning
 * Updates the display with the new restaurant information
 * @function
 * @returns {void}
 */
function goPrev() {
  currentIndex = (currentIndex - 1 + restaurants.length) % restaurants.length;
  renderRestaurant();
}

/**
 * Opens the deck editor interface
 * Currently shows an alert placeholder - to be implemented with actual editor
 * @function
 * @returns {void}
 * @todo Implement actual deck editor navigation and functionality
 */
function editDeck() {
  alert('Navigate to deck editor');
}

/**
 * Navigates to restaurant detail page with proper URL validation
 * Saves current restaurant data to sessionStorage and redirects safely
 * @function
 * @returns {void}
 * @throws {Error} May throw if sessionStorage is unavailable
 */
function viewRestaurant() {
  var restaurant = restaurants[currentIndex];
  console.log('⬇️ saving restaurant:', restaurant);
  sessionStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));

  // Redirect to restaurant detail page
  window.location.href = 'inside-card.html';
}

/**
 * Initializes the application when the page loads
 * Sets up event listeners for navigation buttons and renders the first restaurant
 * Ensures all DOM elements are available before attaching event handlers
 * @function
 * @returns {void}
 */
window.onload = function () {
  const userCreatedRestaurants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const params = new URLSearchParams(window.location.search);
  const currentDeckId = params.get("deck");

  const allRestaurants = [...defaultStaticRestaurants, ...userCreatedRestaurants];
  const deck = getDecks().find(d => d.id === currentDeckId); // TODO: getDecks undefined

  if (deck) {
    restaurants = allRestaurants.filter(r => deck.cards.includes(r.title));
  } else {
    restaurants = allRestaurants; 
  }


  var nextBtn = document.getElementById('next');
  var prevBtn = document.getElementById('prev');
  var editBtn = document.getElementById('edit-deck');
  var cardElement = document.querySelector('.card');

  if (nextBtn) nextBtn.onclick = goNext;
  if (prevBtn) prevBtn.onclick = goPrev;
  if (editBtn) editBtn.onclick = editDeck;

  // Set up card click handler with proper event delegation
  if (cardElement) {
    cardElement.onclick = viewRestaurant;
  }

  // Render first restaurant
  renderRestaurant();
};

/**
  * Handles the form submission event.
  * Prevents the default page reload, creates a new restaurant object,
  * appends it to localStorage, and redirects to the main card deck view.
*/
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('restaurant-form');
  if (form) {
    console.log("Form detected. Adding submit handler.");

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const deckId = document.getElementById('deck-id').value;

      const newRestaurant = {
        title: document.getElementById('restaurant-name').value.trim(),
        image: '../design/cardCover_default.jpg',
        type: document.getElementById('food-genre').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        website: document.getElementById('website').value.trim(),
        address: document.getElementById('address').value.trim(),
        hours: document.getElementById('business-hour').value.trim(),
        deck: deckId
      };


      const existing = JSON.parse(localStorage.getItem('restaurantsData')) || [];
      existing.push(newRestaurant);
      localStorage.setItem('restaurantsData', JSON.stringify(existing));

      console.log("Saved new restaurant:", newRestaurant);
      window.location.href = 'card-deck.html';
    });
  }
});


const editDeckButton = document.getElementById("edit-deck");
if (editDeckButton) {
  const params = new URLSearchParams(window.location.search);
  const currentDeckId = params.get("deck");

  if (currentDeckId) {
    editDeckButton.addEventListener("click", () => {
      window.location.href = `deck-editor.html?deck=${currentDeckId}`;
    });
  }
}

/**
  * Handles the deck form submission event.
  * Prevents the default page reload, creates a new deck object,
  * appends it to localStorage, and redirects to the deck editor view.
*/
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('deck-form');
  if (form) {
    console.log("Form detected. Adding submit handler.");

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let deckName = document.getElementById('deck-name').value;
      createDeck(deckName);

      console.log("Saved new deck");
      const deckParam = new URLSearchParams({ deck: deckName });
      window.location.href = `deck-editor.html?${deckParam.toString()}`;
    });
  }
});