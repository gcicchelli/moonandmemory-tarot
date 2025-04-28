let cards = [];
fetch('tarot_cards.json')
    .then(response => response.json())
    .then(data => {
        cards = data;
    })
    .catch(error => console.error('Error loading tarot cards:', error));
function drawSingleCard() {
    if (cards.length === 0) return;
    const readingArea = document.getElementById('reading-area');
    readingArea.innerHTML = '';
    const card = cards[Math.floor(Math.random() * cards.length)];
    readingArea.appendChild(createCardElement(card));
}
function drawThreeCards() {
    if (cards.length === 0) return;
    const readingArea = document.getElementById('reading-area');
    readingArea.innerHTML = '';
    const shuffled = [...cards].sort(() => 0.5 - Math.random()).slice(0, 3);
    shuffled.forEach((card, index) => {
        const element = createCardElement(card);
        const heading = ['Past', 'Present', 'Future'][index];
        const headingElement = document.createElement('h3');
        headingElement.textContent = heading;
        element.insertBefore(headingElement, element.firstChild);
        readingArea.appendChild(element);
    });
}
function createCardElement(card) {
    const div = document.createElement('div');
    div.className = 'card';
    const img = document.createElement('img');
    img.src = 'images/' + encodeURIComponent(card.image);
    const title = document.createElement('h2');
    title.textContent = card.name;
    const description = document.createElement('p');
    description.textContent = card.meaning;
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(description);
    return div;
}
function setMoonPhase() {
    const phases = [
        "New Moon", "Waxing Crescent", "First Quarter",
        "Waxing Gibbous", "Full Moon", "Waning Gibbous",
        "Last Quarter", "Waning Crescent"
    ];
    const today = new Date();
    const phase = phases[today.getDate() % phases.length];
    document.getElementById('moon-phase').textContent = `Moon Phase: ${phase}`;
}
setMoonPhase();