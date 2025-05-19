// Function templates tied to html elements

document.addEventListener('DOMContentLoaded', () => {
    const navLogo = document.querySelector('.nav-logo'); // Navigation logo
    const mainContent = document.querySelector('.main-content'); // Section below nav bar
    const subText = document.querySelector('.subtext'); // subtext below heading in main content
    const cardButton = document.querySelector('.card-button'); // ?? button that says cards
    const cardContainer = document.querySelector('.card-container'); // A single card component
    const card = document.querySelector('.card'); // sub div inside a single card component
    const cardFront = document.querySelector('.card-front'); // Front of card
    const cardBack = document.querySelector('.card-back'); // Back of card
    const card_ = document.getElementById('flip-card'); // same as .card

    // Card Button
    cardButton.addEventListener('click', () => {
        console.log('Cards button clicked');
    });


    // Card (sub div inside card component)
    card_.addEventListener('click', () => {
        const isFlipped = card_.classList.toggle('flipped');
        if (isFlipped) {
            card_.innerHTML = cardBack.innerHTML;
        } else {
            card_.innerHTML = cardFront.innerHTML;
        }
    });
})
