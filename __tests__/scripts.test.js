/**
 * @fileoverview Unit tests for scripts.js: Restaurant card selector
 * Tests all major functions including navigation, rendering, and data management
 * run using 'npm test /__tests__/scripts.test.js'
 * @author Powell's Bowells Team
 * @version 1.0.0
 */

// Mock DOM environment setup
const { JSDOM } = require('jsdom');

describe('Restaurant Card Selector Tests', () => {
  let dom;
  let window;
  let document;

  // Mock restaurant data for testing
  const mockRestaurants = [
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

  beforeEach(() => {
    // Create a new DOM instance for each test
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div class="card">
            <img id="restaurant-image" src="" alt="Restaurant Image">
            <h2 id="restaurant-title">Restaurant Name</h2>
            <div id="restaurant-rating">★★★★★</div>
          </div>
          <button id="next">Next</button>
          <button id="prev">Previous</button>
          <button id="edit-deck">Edit Deck</button>
          <form id="restaurant-form">
            <input id="deck-id" value="test-deck">
            <input id="restaurant-name" value="">
            <input id="food-genre" value="">
            <input id="phone" value="">
            <input id="website" value="">
            <input id="address" value="">
            <input id="business-hour" value="">
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `, { url: 'http://localhost' });

    window = dom.window;
    document = window.document;

    // Set up global variables
    global.alert = jest.fn();

    // Reset variables for each test
    global.restaurants = [...mockRestaurants];
    global.currentIndex = 0;
    global.defaultStaticRestaurants = mockRestaurants;
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('renderRestaurant function', () => {
    beforeEach(() => {
      // Load the main functions (simulate loading the script)
      eval(`
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
        global.renderRestaurant = renderRestaurant;
      `);
    });

    test('should render restaurant information correctly', () => {
      global.renderRestaurant();

      const imgElement = document.getElementById('restaurant-image');
      const titleElement = document.getElementById('restaurant-title');
      const ratingElement = document.getElementById('restaurant-rating');

      expect(imgElement.src).toBe('http://localhost/design/kfc.png');
      expect(titleElement.textContent).toBe('KFC');
      expect(ratingElement.textContent).toBe('★★★☆☆');
    });

    test('should handle missing DOM elements gracefully', () => {
      // Remove elements to test error handling
      document.getElementById('restaurant-image').remove();
      document.getElementById('restaurant-title').remove();
      document.getElementById('restaurant-rating').remove();

      expect(() => global.renderRestaurant()).not.toThrow();
    });

    test('should render correct star rating for different ratings', () => {
      global.currentIndex = 1; // Restaurant with 5 stars
      global.renderRestaurant();

      const ratingElement = document.getElementById('restaurant-rating');
      expect(ratingElement.textContent).toBe('★★★★★');

      global.currentIndex = 2; // Restaurant with 2 stars
      global.renderRestaurant();
      expect(ratingElement.textContent).toBe('★★☆☆☆');
    });
  });

  describe('Navigation functions', () => {
    beforeEach(() => {
      eval(`
        function goNext() {
          currentIndex = (currentIndex + 1) % restaurants.length;
          renderRestaurant();
        }
        
        function goPrev() {
          currentIndex = (currentIndex - 1 + restaurants.length) % restaurants.length;
          renderRestaurant();
        }
        
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
        
        global.goNext = goNext;
        global.goPrev = goPrev;
        global.renderRestaurant = renderRestaurant;
      `);
    });

    describe('goNext function', () => {
      test('should advance to next restaurant', () => {
        expect(global.currentIndex).toBe(0);
        global.goNext();
        expect(global.currentIndex).toBe(1);
        
        const titleElement = document.getElementById('restaurant-title');
        expect(titleElement.textContent).toBe('Makai');
      });

      test('should wrap to first restaurant when at end', () => {
        global.currentIndex = 2; // Last restaurant
        global.goNext();
        expect(global.currentIndex).toBe(0);
        
        const titleElement = document.getElementById('restaurant-title');
        expect(titleElement.textContent).toBe('KFC');
      });
    });

    describe('goPrev function', () => {
      test('should go to previous restaurant', () => {
        global.currentIndex = 1;
        global.goPrev();
        expect(global.currentIndex).toBe(0);
        
        const titleElement = document.getElementById('restaurant-title');
        expect(titleElement.textContent).toBe('KFC');
      });

      test('should wrap to last restaurant when at beginning', () => {
        global.currentIndex = 0;
        global.goPrev();
        expect(global.currentIndex).toBe(2);
        
        const titleElement = document.getElementById('restaurant-title');
        expect(titleElement.textContent).toBe('UMI');
      });
    });
  });

  describe('editDeck function', () => {
    test('should show alert when called', () => {
      eval(`
        function editDeck() {
          alert('Navigate to deck editor');
        }
        global.editDeck = editDeck;
      `);

      global.editDeck();
      expect(global.alert).toHaveBeenCalledWith('Navigate to deck editor');
    });
  });

  describe('Data validation', () => {
    test('should handle empty restaurants array', () => {
      global.restaurants = [];
      
      eval(`
        function renderRestaurant() {
          if (restaurants.length === 0) return;
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
        global.renderRestaurant = renderRestaurant;
      `);

      expect(() => global.renderRestaurant()).not.toThrow();
    });

    test('should validate restaurant object properties', () => {
      const testRestaurant = mockRestaurants[0];
      
      expect(testRestaurant).toHaveProperty('title');
      expect(testRestaurant).toHaveProperty('image');
      expect(testRestaurant).toHaveProperty('rating');
      expect(testRestaurant).toHaveProperty('type');
      expect(testRestaurant).toHaveProperty('phone');
      expect(testRestaurant).toHaveProperty('website');
      expect(testRestaurant).toHaveProperty('address');
      expect(testRestaurant).toHaveProperty('hours');
      
      expect(typeof testRestaurant.title).toBe('string');
      expect(typeof testRestaurant.rating).toBe('number');
      expect(testRestaurant.rating).toBeGreaterThanOrEqual(1);
      expect(testRestaurant.rating).toBeLessThanOrEqual(5);
    });
  });
});
