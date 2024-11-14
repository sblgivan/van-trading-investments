// Check authentication
if (!localStorage.getItem('user')) {
    window.location.href = 'login.html';
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWelcome();
    initializePaymentTimer();
    initializeImageCarousel();
    loadDescription();
});

// Welcome Message
function initializeWelcome() {
    const username = localStorage.getItem('user');
    document.getElementById('username').textContent = username;
    
    // AI-driven welcome messages
    const greetings = [
        "Welcome back",
        "Great to see you again",
        "Hello there",
        "Nice to have you back"
    ];
    
    const timeOfDay = new Date().getHours();
    let timeGreeting = "";
    
    if (timeOfDay < 12) timeGreeting = "Good morning";
    else if (timeOfDay < 18) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    document.querySelector('.welcome-message').textContent = 
        `${timeGreeting} | ${randomGreeting}, ${username}!`;
}

// Payment Timer
function initializePaymentTimer() {
    function updatePaymentProgress() {
        const now = new Date();
        const saturday = new Date();
        saturday.setDate(saturday.getDate() + (6 - saturday.getDay()));
        saturday.setHours(0, 0, 0, 0);
        
        const timeUntilPayment = saturday - now;
        const daysRemaining = Math.ceil(timeUntilPayment / (1000 * 60 * 60 * 24));
        
        const progress = ((7 - daysRemaining) / 7) * 100;
        
        document.getElementById('paymentProgress').style.width = `${progress}%`;
        document.getElementById('daysRemaining').textContent = 
            `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} until next payment`;
    }
    
    updatePaymentProgress();
    setInterval(updatePaymentProgress, 1000 * 60 * 60); // Update every hour
}

// Image Carousel
function initializeImageCarousel() {
    let currentSlide = 0;
    const carousel = document.getElementById('imageCarousel');
    
    // Load images from src folder
    const images = []; // Add your image paths here
    
    function loadImages() {
        images.forEach(imagePath => {
            const div = document.createElement('div');
            div.className = 'carousel-item';
            div.innerHTML = `<img src="${imagePath}" alt="Trading Chart">`;
            carousel.appendChild(div);
        });
    }
    
    function showSlide(index) {
        const slides = document.querySelectorAll('.carousel-item');
        if (slides.length === 0) return;
        
        currentSlide = (index + slides.length) % slides.length;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    document.querySelector('.prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    document.querySelector('.next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Auto-advance slides
    setInterval(() => showSlide(currentSlide + 1), 5000);
    
    loadImages();
}

// Description Loading
function loadDescription() {
    fetch('descriptiontxt')
        .then(response => response.text())
        .then(text => {
            document.getElementById('description').innerHTML = text;
        })
        .catch(error => {
            console.error('Error loading description:', error);
            document.getElementById('description').innerHTML = 
                'Welcome to Van Trading Investments. We specialize in automated trading solutions.';
        });
}

// Logout functionality
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
              }
