
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

// Restaurant data
var restaurants = [
  {
    title: 'Chick-fil-A',
    image: '../design/chickfila.jpg',
    rating: 5,
    type: 'American',
    phone: '(858) 450-4417',
    website: 'chick-fil-a.com',
    address: '3351 Nobel Dr, La Jolla, CA 92037',
    hours: '8 AM - 11 PM',
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
  },
  {
    title: 'Default Restaurant',
    image: '../design/cardCover_default.jpg',
    rating: 5,
    type: 'American',
    phone: '(xxx) xxx-xxxx',
    website: 'website.com',
    address: 'Address Address San Diego, CA',
    hours: '10 AM - 9 PM'
  }
];

var currentIndex = 0;

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

function goNext() {
  currentIndex = (currentIndex + 1) % restaurants.length;
  renderRestaurant();
}

function goPrev() {
  currentIndex = (currentIndex - 1 + restaurants.length) % restaurants.length;
  renderRestaurant();
}

function goBack() {
  window.history.back();
}

function editDeck() {
  alert('Navigate to deck editor');
}

// Set up everything when page loads
window.onload = function() {
  var nextBtn = document.getElementById('next');
  var prevBtn = document.getElementById('prev');
  var editBtn = document.getElementById('edit-deck');
  
  if (nextBtn) nextBtn.onclick = goNext;
  if (prevBtn) prevBtn.onclick = goPrev;
  if (editBtn) editBtn.onclick = editDeck;
  
  // Render first restaurant
  renderRestaurant();
};

// inside-card.html
let card = document.querySelector('.card')

card.addEventListener('click', () => {
  let restaurant = restaurants[currentIndex];
  console.log('⬇️ saving restaurant:', restaurant);
  sessionStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
  window.location.href = 'inside-card.html'
});
