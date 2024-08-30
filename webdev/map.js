// Initialize the Leaflet map
const map = L.map('map-container').setView([20, 0], 2); // Center the map and set zoom level

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Define pins for the specified countries
const pins = [
    { position: [40.4637, -3.7492], url: 'interns-spain.html', popup: 'Interns in Spain', tooltip: 'Interns from Spain' },       // Spain
    { position: [33.8869, 9.5375], url: 'interns-tunisia.html', popup: 'Interns in Tunisia', tooltip: 'Interns from Tunisia' },    // Tunisia
    { position: [47.5162, 14.5501], url: 'interns-austria.html', popup: 'Interns in Austria', tooltip: 'Interns from Austria' },    // Austria
    { position: [51.9194, 19.1451], url: 'interns-poland.html', popup: 'Interns in Poland', tooltip: 'Interns from Poland' },      // Poland
    { position: [50.8503, 4.3517], url: 'interns-belgium.html', popup: 'Interns in Belgium', tooltip: 'Interns from Belgium' }      // Belgium
];

// Add pins to the map
pins.forEach(pin => {
    L.marker(pin.position)
        .addTo(map)
        .bindPopup(pin.popup)
        .bindTooltip(pin.tooltip, { permanent: false, direction: 'top' }) // Add tooltips
        .on('click', () => {
            window.location.href = pin.url;
        });
});

document.getElementById('translate-button').addEventListener('click', async function() {
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    const textInput = document.getElementById('text-input').value;

    // Example API call (Replace with actual API)
    const response = await fetch('https://api.example.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceLang, targetLang, text: textInput })
    });
    const result = await response.json();

    document.getElementById('translated-text').textContent = result.translatedText;
});

let currentIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-image');
    const totalSlides = slides.length;

    currentIndex += step;

    // Loop back to the first slide if we're on the last one
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Loop back to the last slide if we're on the first one
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    
    const newTransformValue = -currentIndex * 100;

    document.querySelector('.carousel-images').style.transform = `translateX(${newTransformValue}%)`;
}

// Optional: Auto-slide functionality
setInterval(() => moveSlide(1), 5000); // Change slide every 5 seconds

document.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

