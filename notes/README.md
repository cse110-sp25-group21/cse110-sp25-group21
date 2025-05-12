# Ryan's Notes about the project

Project Outline (what i think at least):

user research -> design -> build -> user feedback -> loop!

# Description
- web application that allows for various *"decks"* of *"restraunt cards"* that allow users to click on a certain deck (it can be food type, location, wtv they want, possibly need to allow for nested decks)
- why are we doing this? ppl are indecisive when it comes to choosing/finding food
- for extra lazy users we have some preset decks 
  - could generat them based on the location of the user (possibly via perms when we ask)
- possibly scrape yelp or use yelp api

# MVP Features 
- single deck
  - holds arbitrary amt of cards
- swipe through deck of cards (might acc need a linked list LOL, to prevent large latency )
  - swipe left:
    - send curr card to end of deck and display next card to the front of UI
  - swipe right:
    - get last card in the deck and bring to the front and display 
- Rate a card (restaurant)
  - personal user rating $\frac{x}{5}$
  - personal reviews that only u can see (will expand to community share)
  - 
- Views
  - Deck library view
  - Card view
    - 

# NTH Features (nice to have)
- 
 