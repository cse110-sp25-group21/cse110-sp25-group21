/**
 * @fileoverview Restaurant card selector application for Powell's Bowells
 * Manages restaurant data display and navigation between cards
 * @author Powell's Bowells Team
 * @version 1.0.0
 */

/* global getDecks, createDeck, addCardToDeck */

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
 * @property {string} [menu] - Comma-separated list of menu items
 * @property {string} [deck] - ID of the deck this restaurant belongs to
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
    type: 'Fast Food',
    phone: '(858) 450-4417',
    website: 'https://www.chick-fil-a.com/locations/ca/la-jolla-village?utm_source=yext&utm_medium=link',
    address: '3351 Nobel Dr, La Jolla, CA 92037',
    hours: '8 AM - 11 PM'
  },
    {
    title: 'Chick-fil',
    image: '../design/chickfila.jpg',
    rating: 5,
    type: 'Fast Food',
    phone: '(858) 450-4417',
    website: 'https://www.chick-fil-a.com/locations/ca/la-jolla-village?utm_source=yext&utm_medium=link',
    address: '3351 Nobel Dr, La Jolla, CA 92037',
    hours: '8 AM - 11 PM'
  },
  // {
  //   title: 'McDonalds',
  //   image: '../design/mcdonalds.png',
  //   rating: 4,
  //   type: "Fast Food",
  //   phone: '(858) 626-2708',
  //   website: 'https://www.mcdonalds.com/us/en-us/location/CA/SAN-DIEGO/4260-NOBEL-DR/11181.html?cid=RF:YXT:GMB::Clicks',
  //   address: '4260 Nobel Dr, San Diego, CA 92122',
  //   hours: 'Open 24 hours'
  // },
  {
    title: 'KFC',
    image: '../design/kfc.png',
    rating: 3,
    type: 'Fast Food',
    phone: '(858) 274-1287',
    website: 'https://locations.kfc.com/ca/san-diego/4290-clairemont-mesa-blvd',
    address: '4290 Clairemont Mesa Blvd, San Diego, CA 92117',
    hours: '9:30 AM-11:30 PM'
  },
  {
    title: 'Makai',
    image: '../design/makai.png',
    rating: 5,
    type: 'Japanese',
    phone: '(858) 822-5268',
    website: 'https://sixth.ucsd.edu/residence-life/index.html',
    address: '9690 Scholars Drive North, La Jolla. CA 92093',
    hours: '8 AM - 11 PM'
  },
  {
    title: 'UMI',
    image: '../design/UMI.png',
    rating: 2,
    type: 'Japanese',
    phone: '(858) 534-4663',
    website: 'https://revelle.ucsd.edu/contact/index.html',
    address: '2980 Theatre District Drive, La Jolla, CA 92093',
    hours: '8 AM - 11 PM'
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
 * Updates navigation arrow visibility based on number of restaurants
 * Hides arrows when there's 0 or 1 restaurant, shows them when there are 2+
 * @function
 * @returns {void}
 */
function updateArrowVisibility() {
  var nextBtn = document.getElementById('next');
  var prevBtn = document.getElementById('prev');
  
  if (nextBtn && prevBtn) {
    if (restaurants.length <= 1) {
      // Hide arrows when there's 0 or 1 restaurant
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
    } else {
      // Show arrows when there are 2+ restaurants
      nextBtn.style.display = 'block';
      prevBtn.style.display = 'block';
    }
  }
}

/**
 * Generates a star rating string representation
 * Creates filled (★) and empty (☆) stars based on rating value
 * @function
 * @param {number} rating - Rating value from 1-5
 * @returns {string} String containing star symbols representing the rating
 */
function generateStarRating(rating) {
  var stars = '';
  for (var i = 0; i < rating; i++) {
    stars += '★';
  }
  for (var j = rating; j < 5; j++) {
    stars += '☆';
  }
  return stars;
}
/**
 * Updates DOM elements with restaurant information
 * Safely updates image source, title text, and rating display
 * @function
 * @param {HTMLElement|null} imageElement - Image element to update
 * @param {HTMLElement|null} titleElement - Title element to update
 * @param {HTMLElement|null} ratingElement - Rating element to update
 * @param {Restaurant} restaurant - Restaurant object containing data to display
 * @returns {void}
 */
function updateRestaurantElements(imageElement, titleElement, ratingElement, restaurant) {
  if (imageElement) imageElement.src = restaurant.image;
  if (titleElement) titleElement.textContent = restaurant.title;
  if (ratingElement) ratingElement.textContent = generateStarRating(restaurant.rating);
}
/**
 * Renders the current restaurant's information to the DOM elements
 * Updates the restaurant image, title, and star rating display
 * Called whenever the user navigates between restaurants
 * Handles empty deck case by showing appropriate placeholder content
 * @function
 * @returns {void}
 */
function renderRestaurant() {
  var restaurantImageElement = document.getElementById('restaurant-image');
  var restaurantTitleElement = document.getElementById('restaurant-title');
  var restaurantRatingElement = document.getElementById('restaurant-rating');
  
  // Handle empty deck case
  if (restaurants.length === 0) {
    if (restaurantImageElement) restaurantImageElement.src = '../design/cardCover_default.jpg';
    if (restaurantTitleElement) restaurantTitleElement.textContent = 'No restaurants in this deck';
    if (restaurantRatingElement) restaurantRatingElement.textContent = '';
    return;
  }

  var restaurant = restaurants[currentIndex];
  updateRestaurantElements(restaurantImageElement, restaurantTitleElement, restaurantRatingElement, restaurant);
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
 * Navigates directly to the deck editor page with current deck ID
 * @function
 * @returns {void}
 */
function editDeck() {
  const params = new URLSearchParams(window.location.search);
  const currentDeckId = params.get("deck");
  
  if (currentDeckId) {
    window.location.href = `deck-editor.html?deck=${encodeURIComponent(currentDeckId)}`;
  } else {
    console.error('No deck ID found in URL');
  }
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
  console.log('saving restaurant:', restaurant);
  sessionStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));

  // Redirect to restaurant detail page
  window.location.href = 'inside-card.html';
}

/**
 * Loads user-created restaurants from localStorage safely
 * Handles JSON parsing errors and missing data gracefully
 * @function
 * @returns {Restaurant[]} Array of user restaurants or empty array if none/error
 */
function loadUserCreatedRestaurants() {
  try {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return (data && data.restaurants) ? data.restaurants : [];
  } catch (e) {
    console.warn('Failed to load user restaurants:', e);
    return [];
  }
}
/**
 * Filters restaurants based on current deck selection
 * Returns all restaurants if no deck is specified or getDecks function unavailable
 * @function
 * @param {string|null} currentDeckId - The ID of the current deck
 * @param {Restaurant[]} allRestaurants - All available restaurants to filter from
 * @returns {Restaurant[]} Filtered restaurants for the deck or all restaurants
 */
function filterRestaurantsByDeck(currentDeckId, allRestaurants) {
  if (typeof getDecks !== 'function') {
    return allRestaurants;
  }
  
  const deck = getDecks().find(d => d.id === currentDeckId);
  return deck ? allRestaurants.filter(r => deck.cards.includes(r.title)) : allRestaurants;
}

/**
 * Sets up event listeners for navigation and card interaction
 * Attaches click handlers to navigation buttons and card elements
 * Safely handles missing DOM elements
 * @function
 * @returns {void}
 */
function setupNavigationEventListeners() {
  var nextBtn = document.getElementById('next');
  var prevBtn = document.getElementById('prev');
  var editBtn = document.getElementById('edit-deck');
  var cardElement = document.querySelector('.card');

  if (nextBtn) nextBtn.onclick = goNext;
  if (prevBtn) prevBtn.onclick = goPrev;
  if (editBtn) editBtn.onclick = editDeck;
  if (cardElement) cardElement.onclick = viewRestaurant;
}

/**
 * Initializes the restaurant display components
 * Sets up arrow visibility and renders the initial restaurant view
 * @function
 * @returns {void}
 */
function initializeRestaurantDisplay() {
  updateArrowVisibility();
  renderRestaurant(); // This handles both populated and empty deck cases
}
/**
 * Main initialization function called when the page loads
 * Loads data, sets up event listeners, and initializes the display
 * @function
 * @returns {void}
 */
window.onload = function () {
  const userCreatedRestaurants = loadUserCreatedRestaurants();
  const params = new URLSearchParams(window.location.search);
  const currentDeckId = params.get("deck");
  const allRestaurants = [...defaultStaticRestaurants, ...userCreatedRestaurants];
  
  restaurants = filterRestaurantsByDeck(currentDeckId, allRestaurants);
  setupNavigationEventListeners();
  initializeRestaurantDisplay();
};
/**
  * Handles the card form submission event.
  * Prevents the default page reload, creates a new restaurant object,
  * appends it to localStorage, and redirects to the main card deck view.
  *  @function
  * @param {Event} event - The form submission event
  * @returns {void}
*/
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('restaurant-form');
  if (form) {
    console.log("Form detected. Adding submit handler.");
    
    // Add real-time duplicate checking as user types
    const restaurantNameInput = document.getElementById('restaurant-name');
    if (restaurantNameInput) {
      restaurantNameInput.addEventListener('input', function() {
        const restaurantName = this.value.trim();
        if (restaurantName.length > 2) { // Only check after user types at least 3 characters
          try {
            const userCreatedRestaurants = loadUserCreatedRestaurants() || [];
            const allRestaurants = [...(window.defaultStaticRestaurants || []), ...userCreatedRestaurants];
            
            const duplicateExists = allRestaurants.some(restaurant => {
              if (!restaurant || !restaurant.title) return false;
              return restaurant.title.toLowerCase() === restaurantName.toLowerCase();
            });
            
            if (duplicateExists) {
              this.style.borderColor = '#ff4444';
              this.title = 'A restaurant with this name already exists';
            } else {
              this.style.borderColor = '';
              this.title = '';
            }
          } catch (error) {
            this.style.borderColor = '';
            this.title = '';
          }
        } else {
          this.style.borderColor = '';
          this.title = '';
        }
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const deckId = document.getElementById('deck-id').value;
      const restaurantName = document.getElementById('restaurant-name').value.trim();
      const menuItem1 = document.getElementById('menu-item-1').value.trim();
      const menuItem2 = document.getElementById('menu-item-2').value.trim();
      const menuItem3 = document.getElementById('menu-item-3').value.trim();
      const ratingElement = document.getElementById('rating');
      const rating = ratingElement ? parseInt(ratingElement.value, 10) : 3;

      const menuItems = [menuItem1, menuItem2, menuItem3].filter(item => item != '');
      const menuString = menuItems.join(',');
      if (!restaurantName){
        alert('Please enter a restaurant name');
        return;
      }
      if (!deckId) {
        alert('Please select a deck');
        return;
      }

      const uploadedImage = window.getUploadedImage ? window.getUploadedImage() : null;
      const newRestaurant = {
        title: document.getElementById('restaurant-name').value.trim(),
        image: uploadedImage || '../design/cardCover_default.jpg',
        rating: isNaN(rating) ? 3 : rating,
        type: document.getElementById('food-genre').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        website: document.getElementById('website').value.trim(),
        address: document.getElementById('address').value.trim(),
        hours: document.getElementById('business-hour').value.trim(),
        menu: menuString,
        deck: deckId
      };

      // Check for duplicate restaurant names globally (across all restaurants)
      try {
        const userCreatedRestaurants = loadUserCreatedRestaurants() || [];
        const allRestaurants = [...(window.defaultStaticRestaurants || []), ...userCreatedRestaurants];
        
        // Check if restaurant name already exists (case-insensitive)
        const duplicateExists = allRestaurants.some(restaurant => {
          if (!restaurant || !restaurant.title) return false;
          return restaurant.title.toLowerCase() === restaurantName.toLowerCase();
        });
        
        if (duplicateExists) {
          alert('Error: A restaurant with this name already exists. Please choose a different name.');
          return;
        }
      } catch (error) {
        // Silent error handling
      }
      
      // Additional check: verify deck-specific duplicates as well
      if (typeof getDecks === 'function') {
        const deck = getDecks().find(d => d.id === deckId);
        if (deck && deck.cards.some(card => card.toLowerCase() === restaurantName.toLowerCase())) {
          alert('Error: A restaurant with this name already exists in this deck. Please choose a different name.');
          return;
        }
      }
      const existing = JSON.parse(localStorage.getItem('restaurantsData')) || {};
      if (!existing.restaurants) existing.restaurants = [];
      existing.restaurants.push(newRestaurant);
      localStorage.setItem('restaurantsData', JSON.stringify(existing));
      const success = addCardToDeck(deckId, restaurantName);
      if (success){
        console.log("Saved new restaurant:", newRestaurant);
        console.log("Add restaurant to deck: ", deckId)
        window.location.href = 'card-deck.html';
      }
    });
  }
});


const editDeckButton = document.getElementById("edit-deck");
if (editDeckButton) {
  const params = new URLSearchParams(window.location.search);
  const currentDeckId = params.get("deck");

  if (currentDeckId) {
    editDeckButton.addEventListener("click", () => {
      window.location.href = `deck-editor.html?deck=${encodeURIComponent(currentDeckId)}`;
    });
  }
}

/**
  * Handles the deck form submission event.
  * Prevents the default page reload, creates a new deck object,
  * appends it to localStorage, and redirects to the deck list view.
  * @function
  * @returns {void}
*/
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('deck-form');
  if (form) {
    console.log("Form detected. Adding submit handler.");

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let deckName = document.getElementById('deck-name').value.trim();
      
      if (!deckName) {
        alert('Please enter a deck name');
        return;
      }

      const newDeck = createDeck(deckName);

      if(!newDeck) {
        alert('Deck with this name already exists');
        return;
      }

      console.log("Saved new deck: ", newDeck);
      alert('Deck created successfully!');
      window.location.href = 'card-deck.html';
    });
  }
});