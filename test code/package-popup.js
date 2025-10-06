// Universal Package Popup JavaScript

// Global variables
let currentSlideIndex = 0;
let currentPackageData = null;

// Package data structure - Easy to maintain and extend
const packageData = {
    'gokarna-spiritual': {
        title: 'Gokarna Spiritual Retreat',
        category: 'Solo',
        price: '₹15,999',
        finalPrice: '₹15,999',
        priceNote: 'per person',
        duration: '5 Days',
        people: '1-2 People',
        rating: '3 Star',
        location: 'Gokarna, Karnataka',
        description: 'Serene beaches, ancient temples and laid-back coastal vibes perfect for spiritual rejuvenation and peaceful relaxation.',
        images: [
            '../images/destinations/gokarna-temple.png',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'
        ],
        highlights: [
            'Beach Yoga Sessions at Om Beach',
            'Ancient Mahabaleshwar Temple Visit',
            'Kudle Beach and Paradise Beach hopping',
            'Spiritual meditation sessions',
            'Local coastal cuisine experience',
            'Sunset views from Gokarna Beach'
        ],
        includes: {
            accommodation: true,
            meals: true,
            transport: true,
            guide: true,
            activities: true,
            permits: false
        },
        itinerary: [
            { day: 'Day 1', title: 'Arrival & Temple Visit', activities: 'Arrive in Gokarna, check into beach resort, visit Mahabaleshwar Temple, evening at Gokarna Beach' },
            { day: 'Day 2', title: 'Beach Hopping', activities: 'Om Beach yoga session, visit Kudle Beach, Paradise Beach trek, sunset meditation' },
            { day: 'Day 3', title: 'Spiritual Activities', activities: 'Temple prayers, spiritual discourse, local market visit, ayurvedic massage' },
            { day: 'Day 4', title: 'Adventure & Relaxation', activities: 'Beach trek, water sports, local cuisine cooking class, bonfire evening' },
            { day: 'Day 5', title: 'Departure', activities: 'Morning meditation, check out, departure with spiritual memories' }
        ],
        whatsappNumber: '+919372495692',
        whatsappMessage: 'Hi! I\'m interested in the Gokarna Spiritual Retreat package. Please share more details and help me book this amazing journey!'
    },
    
    'udaipur-royal': {
        title: 'Udaipur Royal Heritage',
        category: 'Family',
        price: '₹17,999',
        finalPrice: '₹17,999',
        priceNote: 'for family of 4',
        duration: '6 Days',
        people: '4 People',
        rating: '4 Star',
        location: 'Udaipur, Rajasthan',
        description: 'City of Lakes with magnificent palaces, royal heritage, and rich culture of Rajasthan perfect for family exploration.',
        images: [
            '../images/destinations/udaipur-palace.png',
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop'
        ],
        highlights: [
            'City Palace Complex guided tour',
            'Lake Pichola boat ride with sunset views',
            'Jagdish Temple and local market visits',
            'Royal sunset views from palace terraces',
            'Traditional Rajasthani dinner with folk dance',
            'Heritage hotel accommodation experience'
        ],
        includes: {
            accommodation: true,
            meals: true,
            transport: true,
            guide: true,
            activities: true,
            permits: true
        },
        itinerary: [
            { day: 'Day 1', title: 'Royal Arrival', activities: 'Arrive in Udaipur, check into heritage hotel, welcome dinner with Rajasthani folk dance' },
            { day: 'Day 2', title: 'City Palace & Lake Pichola', activities: 'City Palace complex tour, Crystal Gallery visit, evening Lake Pichola boat ride' },
            { day: 'Day 3', title: 'Temples & Markets', activities: 'Jagdish Temple visit, Saheliyon-ki-Bari gardens, local market shopping, cultural show' },
            { day: 'Day 4', title: 'Royal Experiences', activities: 'Bagore-ki-Haveli museum, vintage car museum, royal cooking class, sunset at Monsoon Palace' },
            { day: 'Day 5', title: 'Heritage & Crafts', activities: 'Local artisan visits, miniature painting workshop, traditional Rajasthani lunch' },
            { day: 'Day 6', title: 'Farewell', activities: 'Last minute shopping, check out, departure with royal memories' }
        ],
        whatsappNumber: '+919372495692',
        whatsappMessage: 'Hello! I\'m interested in the Udaipur Royal Heritage package for my family. Please provide details and help us book this royal experience!'
    },
    
    'manali-adventure': {
        title: 'Manali Mountain Adventure',
        category: 'Adventure',
        price: '₹19,999',
        finalPrice: '₹19,999',
        priceNote: 'per person',
        duration: '7 Days',
        people: '2-4 People',
        rating: '3 Star',
        location: 'Manali, Himachal Pradesh',
        description: 'Snow-capped mountains, adventure sports and scenic valleys through Solang Valley, Rohtang Pass and pristine nature.',
        images: [
            '../images/destinations/manali-mountains.avif',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'
        ],
        highlights: [
            'Solang Valley adventure activities',
            'Rohtang Pass excursion (weather permitting)',
            'Paragliding and skiing opportunities',
            'River rafting in Beas River',
            'Visit to ancient Hadimba Temple',
            'Local Himachali cuisine experience'
        ],
        includes: {
            accommodation: true,
            meals: true,
            transport: true,
            guide: true,
            activities: true,
            permits: true
        },
        itinerary: [
            { day: 'Day 1', title: 'Mountain Arrival', activities: 'Arrive in Manali, check into mountain resort, acclimatization walk, welcome dinner' },
            { day: 'Day 2', title: 'Solang Valley Adventure', activities: 'Full day Solang Valley - paragliding, zorbing, cable car ride, photography' },
            { day: 'Day 3', title: 'Rohtang Pass Expedition', activities: 'Early morning Rohtang Pass visit, snow activities, scenic photography, return evening' },
            { day: 'Day 4', title: 'River Rafting & Temples', activities: 'Beas River rafting, Hadimba Temple visit, local market exploration' },
            { day: 'Day 5', title: 'Trekking & Nature', activities: 'Nature trek to Jogini Falls, village walk, local cultural experience' },
            { day: 'Day 6', title: 'Adventure Sports', activities: 'Rock climbing, mountain biking, visit to nearby villages, bonfire evening' },
            { day: 'Day 7', title: 'Mountain Farewell', activities: 'Last minute shopping, check out, departure with adventure memories' }
        ],
        whatsappNumber: '+919372495692',
        whatsappMessage: 'Hi there! I\'m excited about the Manali Mountain Adventure package. Please share details and help me book this thrilling experience!'
    },
    
    'kerala-romance': {
        title: 'Kerala Backwaters Romance',
        category: 'Romantic',
        price: '₹19,999',
        finalPrice: '₹19,999',
        priceNote: 'per couple',
        duration: '6 Days',
        people: '2 People',
        rating: '4 Star',
        location: 'Kerala, India',
        description: 'Experience romance in God\'s Own Country with houseboat stays, spice plantations, and serene backwaters perfect for couples.',
        images: [
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1587036892426-c44c7c128a15?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop'
        ],
        highlights: [
            'Luxury Houseboat Stay in Alleppey backwaters',
            'Munnar Hill Station with tea gardens',
            'Spice plantation tours in Thekkady',
            'Ayurvedic couple spa treatments',
            'Traditional Kerala cuisine experiences',
            'Backwater cruises with romantic sunset views'
        ],
        includes: {
            accommodation: true,
            meals: true,
            transport: true,
            guide: true,
            activities: true,
            permits: false
        },
        itinerary: [
            { day: 'Day 1', title: 'Romantic Arrival', activities: 'Arrive Kochi, check into resort, welcome drink, romantic dinner by backwaters' },
            { day: 'Day 2', title: 'Munnar Tea Gardens', activities: 'Drive to Munnar, tea garden visits, couple photography, cozy hill station evening' },
            { day: 'Day 3', title: 'Spice & Nature', activities: 'Thekkady spice plantations, couple nature walk, elephant safari, romantic dinner' },
            { day: 'Day 4', title: 'Houseboat Romance', activities: 'Check into luxury houseboat, backwater cruise, private dining, stargazing' },
            { day: 'Day 5', title: 'Spa & Relaxation', activities: 'Ayurvedic couple spa, village visits, cooking class together, sunset cruise' },
            { day: 'Day 6', title: 'Sweet Goodbye', activities: 'Last moments together, souvenir shopping, departure with romantic memories' }
        ],
        whatsappNumber: '+919372495692',
        whatsappMessage: 'Hello! We\'re interested in the Kerala Backwaters Romance package for our romantic getaway. Please help us plan this beautiful journey together!'
    }
};

// Initialize popup functionality
function initializePackagePopup() {
    console.log('Package popup system initialized');
    // Create popup HTML if it doesn't exist
    if (!document.getElementById('package-popup')) {
        console.log('Popup HTML not found, but it should be embedded in the page');
    } else {
        console.log('Popup HTML found and ready');
    }
}

// Open package popup with data
function openPackagePopup(packageId) {
    console.log('🚀 openPackagePopup called with packageId:', packageId);
    console.log('🚀 Available packages:', Object.keys(packageData));
    
    const packageInfo = packageData[packageId];
    if (!packageInfo) {
        console.error('❌ Package data not found for:', packageId);
        alert('Package details not available. Please contact us for more information.');
        return;
    }
    
    currentPackageData = packageInfo;
    currentSlideIndex = 0;
    
    // Update popup content
    updatePopupContent(packageInfo);
    
    // Show popup
    const popup = document.getElementById('package-popup');
    if (popup) {
        console.log('Showing popup for:', packageInfo.title);
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.classList.add('active');
            startAutoSlide(); // Start auto-slide
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Popup element not found in DOM');
        alert('Popup system error. Please refresh the page and try again.');
    }
}

// Close popup
function closePackagePopup() {
    const popup = document.getElementById('package-popup');
    if (popup) {
        stopAutoSlide(); // Stop auto-slide
        popup.classList.remove('active');
        setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Update popup content with package data
function updatePopupContent(packageInfo) {
    // Update basic info
    document.getElementById('popup-category').textContent = packageInfo.category;
    document.getElementById('popup-title').textContent = packageInfo.title;
    document.getElementById('popup-price').textContent = packageInfo.price;
    document.getElementById('popup-final-price').textContent = packageInfo.finalPrice;
    document.getElementById('popup-description').textContent = packageInfo.description;
    
    // Update features
    document.getElementById('popup-duration').textContent = packageInfo.duration;
    document.getElementById('popup-people').textContent = packageInfo.people;
    document.getElementById('popup-rating').textContent = packageInfo.rating;
    document.getElementById('popup-location').textContent = packageInfo.location;
    
    // Update images
    const images = packageInfo.images;
    for (let i = 1; i <= 4; i++) {
        const img = document.getElementById(`slide-img-${i}`);
        if (img && images[i-1]) {
            img.src = images[i-1];
            img.alt = `${packageInfo.title} - Image ${i}`;
        }
    }
    
    // Update highlights
    const highlightsList = document.getElementById('popup-highlights');
    if (highlightsList) {
        highlightsList.innerHTML = '';
        packageInfo.highlights.forEach(highlight => {
            const li = document.createElement('li');
            li.textContent = highlight;
            highlightsList.appendChild(li);
        });
    }
    
    // Update includes
    const includes = packageInfo.includes;
    Object.keys(includes).forEach(key => {
        const element = document.getElementById(`${key}-included`);
        if (element) {
            if (includes[key]) {
                element.classList.add('included');
                element.classList.remove('not-included');
            } else {
                element.classList.add('not-included');
                element.classList.remove('included');
            }
        }
    });
    
    // Update itinerary
    const itineraryContainer = document.getElementById('popup-itinerary');
    if (itineraryContainer && packageInfo.itinerary) {
        itineraryContainer.innerHTML = '';
        packageInfo.itinerary.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'itinerary-day';
            dayElement.innerHTML = `
                <div class="day-title">${day.day}: ${day.title}</div>
                <div class="day-activities">${day.activities}</div>
            `;
            itineraryContainer.appendChild(dayElement);
        });
    }
    
    // Update price note
    const priceNote = document.querySelector('.price-note');
    if (priceNote) {
        priceNote.textContent = packageInfo.priceNote;
    }
    
    // Reset slider
    resetSlider();
}

// Image slider functionality
function changeSlide(direction) {
    if (!currentPackageData) return;
    
    const totalSlides = currentPackageData.images.length;
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateSlider();
}

function currentSlide(slideIndex) {
    currentSlideIndex = slideIndex - 1;
    updateSlider();
}

function updateSlider() {
    const slides = document.getElementById('popup-slides');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides) {
        slides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function resetSlider() {
    currentSlideIndex = 0;
    updateSlider();
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Book package via WhatsApp
function bookPackage() {
    if (!currentPackageData) {
        alert('Please select a package first.');
        return;
    }
    
    const phoneNumber = currentPackageData.whatsappNumber;
    const message = encodeURIComponent(currentPackageData.whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`;
    
    window.open(whatsappURL, '_blank');
}

// Make functions globally available
window.openPackagePopup = openPackagePopup;
window.closePackagePopup = closePackagePopup;
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
window.bookPackage = bookPackage;

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing popup system...');
    console.log('openPackagePopup function available:', typeof window.openPackagePopup);
    initializePackagePopup();
    
    // Close popup on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePackagePopup();
        }
    });
    
    // Close popup on overlay click
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('package-popup');
        if (e.target === popup) {
            closePackagePopup();
        }
    });
});

// Pause auto-slide on hover
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const imageSection = document.querySelector('.popup-image-section');
        if (imageSection) {
            imageSection.addEventListener('mouseenter', stopAutoSlide);
            imageSection.addEventListener('mouseleave', startAutoSlide);
        }
    }, 1000);
});

// Ensure functions are globally accessible
window.openPackagePopup = openPackagePopup;
window.closePackagePopup = closePackagePopup;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.bookPackage = bookPackage;