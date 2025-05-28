// Restaurant data
var restaurants = [
  {
    title: 'Chick-fil-A',
    image: '../design/chickfila.jpg',
    rating: 5
  },
  {
    title: 'Cava Mediterranean',
    image: '../design/cava.jpg',
    rating: 4
  },
  {
    title: 'Hamburger Hut',
    image: '../design/hamburger.jpg',
    rating: 3
  },
  {
    title: 'Tacos El Rey',
    image: '../design/foodspread.png',
    rating: 4
  },
  {
    title: 'Default Restaurant',
    image: '../design/cardCover_default.jpg',
    rating: 5
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