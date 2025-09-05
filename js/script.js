// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Hero Background Slider
let currentSlideIndex = 0;
let heroSlides = [];
let heroSlideInterval;

function initHeroSlider() {
    heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (heroSlides.length === 0) return;
    
    // Start automatic slideshow
    startSlideshow();
    
    // Add touch support for mobile
    const heroSection = document.querySelector('.hero');
    addTouchSupport(heroSection);
}

function addTouchSupport(element) {
    let startX = 0;
    let startY = 0;
    let isScrolling = undefined;
    
    element.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = undefined;
        pauseSlideshow();
    }, { passive: true });
    
    element.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        if (isScrolling === undefined) {
            isScrolling = Math.abs(currentY - startY) > Math.abs(currentX - startX);
        }
        
        if (!isScrolling) {
            e.preventDefault();
        }
    }, { passive: false });
    
    element.addEventListener('touchend', function(e) {
        if (isScrolling) {
            startSlideshow();
            return;
        }
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Minimum swipe distance
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                previousSlide(); // Swipe right - previous slide
            }
        }
        
        setTimeout(startSlideshow, 100);
    }, { passive: true });
}

function showSlide(index) {
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all slides and dots
    heroSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (heroSlides[index]) {
        heroSlides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlideIndex = index;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    showSlide(index - 1); // Convert from 1-based to 0-based index
    pauseSlideshow();
    startSlideshow(); // Restart the timer
}

function startSlideshow() {
    pauseSlideshow(); // Clear any existing interval
    heroSlideInterval = setInterval(nextSlide, 2500); // Change slide every 2.5 seconds
}

function pauseSlideshow() {
    if (heroSlideInterval) {
        clearInterval(heroSlideInterval);
    }
}

// Initialize hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);

// Smooth Scrolling for Internal Links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Newsletter Form Submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        // Here you would typically send the email to your server
        alert('Thank you for subscribing! We\'ll keep you updated with the latest travel deals.');
        this.querySelector('input[type="email"]').value = '';
    }
});

// Package Buttons Functionality
document.querySelectorAll('.package-btn').forEach(button => {
    button.addEventListener('click', function() {
        const packageCard = this.closest('.package-card');
        const packageTitle = packageCard.querySelector('h3').textContent;
        
        // This would typically redirect to a detailed package page
        // For now, we'll show an alert
        alert(`More details about "${packageTitle}" coming soon! Contact us for immediate booking.`);
    });
});

// Destination Cards Click Handler
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', function() {
        const destinationName = this.querySelector('h3').textContent;
        alert(`Explore packages for ${destinationName}! Contact us for customized itineraries.`);
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.destination-card, .package-card, .feature-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h4');
            animateCounter(statNumbers[0], 5000);
            animateCounter(statNumbers[1], 150);
            animateCounter(statNumbers[2], 15);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
});

// WhatsApp Integration (for later use in contact page)
function openWhatsApp(message = 'Hello! I would like to inquire about your travel packages.') {
    const phoneNumber = '1234567890'; // Replace with actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy Loading for Images - Disabled temporarily to fix visibility issue
// If you want to re-enable, make sure images are properly handled
/*
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Only apply lazy loading if image hasn't loaded yet
                if (!img.complete) {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = function() {
                        this.style.opacity = '1';
                    };
                } else {
                    // Image already loaded, ensure it's visible
                    img.style.opacity = '1';
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});
*/

// Search Functionality (for packages page)
function filterPackages(category) {
    const packages = document.querySelectorAll('.package-card');
    
    packages.forEach(package => {
        const packageCategory = package.querySelector('.package-category').textContent.toLowerCase();
        
        if (category === 'all' || packageCategory === category.toLowerCase()) {
            package.style.display = 'block';
            package.style.animation = 'fadeInUp 0.5s ease';
        } else {
            package.style.display = 'none';
        }
    });
}

// Back to Top Button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Testimonials Slider (Simple)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.style.display = 'block';
            testimonial.style.animation = 'fadeInUp 0.5s ease';
        } else {
            testimonial.style.display = 'none';
        }
    });
}

// Auto-rotate testimonials on mobile
function initTestimonialSlider() {
    if (window.innerWidth <= 768 && testimonials.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
}

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', initTestimonialSlider);
window.addEventListener('resize', initTestimonialSlider);

// Contact Form Validation (for contact page)
function validateContactForm(form) {
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    
    let isValid = true;
    let errors = [];
    
    if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    if (phone.length < 10) {
        errors.push('Please enter a valid phone number');
        isValid = false;
    }
    
    if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
    }
    
    return isValid;
}

// Price Range Slider (for packages page)
function initPriceSlider() {
    const slider = document.getElementById('price-range');
    const output = document.getElementById('price-output');
    
    if (slider && output) {
        slider.oninput = function() {
            output.innerHTML = '$' + this.value;
            filterPackagesByPrice(this.value);
        };
    }
}

function filterPackagesByPrice(maxPrice) {
    const packages = document.querySelectorAll('.package-card');
    
    packages.forEach(package => {
        const priceText = package.querySelector('.package-price').textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));
        
        if (price <= maxPrice) {
            package.style.display = 'block';
        } else {
            package.style.display = 'none';
        }
    });
}

// Photo Gallery Lightbox Functionality
let currentImageIndex = 0;
let galleryImages = [];

function initPhotoGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!lightbox) return;

    // Populate gallery images array
    galleryImages = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt,
        caption: item.dataset.caption || item.querySelector('.gallery-caption')?.textContent || ''
    }));

    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });

    // Close lightbox events
    closeBtn?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation events
    prevBtn?.addEventListener('click', showPrevImage);
    nextBtn?.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });

    function openLightbox() {
        const currentImage = galleryImages[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        lightboxCaption.textContent = currentImage.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        const currentImage = galleryImages[currentImageIndex];
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.alt;
            lightboxCaption.textContent = currentImage.caption;
            lightboxImage.style.opacity = '1';
        }, 150);
    }
}

// Initialize price slider on packages page
document.addEventListener('DOMContentLoaded', function() {
    initPriceSlider();
    initPhotoGallery();
});
