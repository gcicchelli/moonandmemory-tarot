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
function getSimpleMoonPhase() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const c = Math.floor(year / 100);
    const e = 2 - c + Math.floor(c / 4);
    const jd = Math.floor(365.25 * (year + 4716)) +
               Math.floor(30.6001 * (month + 1)) +
               day + e - 1524.5;
    const daysSinceNew = jd - 2451549.5;
    const newMoons = daysSinceNew / 29.53058867;
    const phase = newMoons - Math.floor(newMoons);

    if (phase < 0.03 || phase > 0.97) return { emoji: "🌑 New Moon", meaning: "Set intentions for new beginnings." };
    else if (phase < 0.47) return { emoji: "🌒 Waxing", meaning: "Growth and momentum are building." };
    else if (phase < 0.53) return { emoji: "🌕 Full Moon", meaning: "Illumination and fulfillment." };
    else return { emoji: "🌘 Waning", meaning: "Release, reflect, and prepare for renewal." };
}

function setMoonPhase() {
    const moonData = getSimpleMoonPhase();
    document.getElementById('moon-phase').innerHTML = `
        <strong>Moon Phase:</strong> ${moonData.emoji}<br>
        <em>${moonData.meaning}</em>
    `;
}

setMoonPhase();
