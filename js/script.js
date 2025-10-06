// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Add null checks to prevent errors
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when mobile menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
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
    // Look for any hero section on the page
    const heroSection = document.querySelector('.hero, .about-hero, .packages-hero, .gallery-hero, .contact-hero');
    
    if (heroSection && navbar) {
        const heroHeight = heroSection.offsetHeight;
        // Add small offset for mobile devices to handle viewport changes
        const scrollThreshold = window.innerWidth <= 768 ? heroHeight - 50 : heroHeight;
        
        if (window.scrollY > scrollThreshold) {
            // Transparent navbar when scrolled below hero section
            navbar.classList.add('transparent');
        } else {
            // Remove transparent class when in hero section or at top
            navbar.classList.remove('transparent');
        }
    } else if (navbar) {
        // If no hero section found, apply transparency after scrolling past top
        const scrollThreshold = window.innerWidth <= 768 ? 80 : 100;
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    }
}, { passive: true });

// Newsletter Form Submission - Enhanced with Psychology
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        
        if (email) {
            // Visual feedback
            button.innerHTML = '<span>Securing Your Deals...</span><i class="fas fa-check"></i>';
            button.style.background = 'linear-gradient(45deg, #2ed573, #7bed9f)';
            
            setTimeout(() => {
                // Success state
                button.innerHTML = '<span>Welcome to VIP Club!</span><i class="fas fa-crown"></i>';
                this.querySelector('input[type="email"]').value = '';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="background: rgba(46, 213, 115, 0.1); color: #2ed573; padding: 12px; border-radius: 10px; margin-top: 1rem; border: 1px solid rgba(46, 213, 115, 0.3);">
                        🎉 Success! Check your email for exclusive deals. First-time discount coming your way!
                    </div>
                `;
                this.appendChild(successMessage);
                
                // Reset after 3 seconds
                setTimeout(() => {
                    button.innerHTML = '<span>Get My Deals</span><i class="fas fa-gift"></i>';
                    button.style.background = '';
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 3000);
                
                // Track newsletter signup
                trackEvent('Newsletter Signup', { email: email });
                
            }, 1500);
        }
    });
}

// Package Buttons Functionality - Enhanced for Conversion
document.querySelectorAll('.package-btn').forEach(button => {
    button.addEventListener('click', function() {
        const packageCard = this.closest('.package-card');
        const packageTitle = packageCard.querySelector('h3').textContent;
        const packageCategory = packageCard.querySelector('.package-category').textContent;
        const packagePrice = packageCard.querySelector('.current-price')?.textContent || 
                           packageCard.querySelector('.package-price').textContent;
        
        // Create urgency-focused message with discount info
        const originalPriceElement = packageCard.querySelector('.original-price');
        const discountBadge = packageCard.querySelector('.discount-badge');
        const discountInfo = originalPriceElement && discountBadge ? 
            ` (${discountBadge.textContent} discount from ${originalPriceElement.textContent})` : '';
        
        const urgentMessages = [
            `Hi! I'm interested in the ${packageTitle} (${packageCategory}) package for ${packagePrice}${discountInfo}. I noticed there are limited slots left at this discounted price - can you help me secure my booking today?`,
            `Hello! I want to book the ${packageTitle} package urgently at the current discounted rate of ${packagePrice}${discountInfo}. Can you confirm availability and help me with immediate booking?`,
            `Hi! I saw your ${packageTitle} discount offer${discountInfo} and don't want to miss out on this amazing deal. Can you help me book this package right away?`
        ];
        
        const randomMessage = urgentMessages[Math.floor(Math.random() * urgentMessages.length)];
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        this.style.background = '#2ed573';
        this.innerHTML = '<span>Connecting...</span><i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            openWhatsApp(randomMessage);
            
            // Reset button after interaction
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
                this.innerHTML = '<span>Book Now</span><i class="fas fa-lock"></i>';
            }, 1000);
        }, 800);
        
        // Track conversion intent
        trackEvent('Package Interest', {
            package: packageTitle,
            price: packagePrice,
            category: packageCategory
        });
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
    const phoneNumber = '919372495692'; // Updated to correct WhatsApp number
    const enhancedMessage = `${message}\n\n(Sent from Palm Vista website)`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(enhancedMessage)}`;
    window.open(url, '_blank');
    
    // Track WhatsApp clicks
    trackEvent('WhatsApp Click', message);
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

// Handle mobile orientation changes and viewport changes
window.addEventListener('orientationchange', function() {
    // Small delay to ensure viewport has updated
    setTimeout(function() {
        // Recalculate hero heights for navbar transparency
        const navbar = document.querySelector('.navbar');
        const heroSection = document.querySelector('.hero, .about-hero, .packages-hero, .gallery-hero, .contact-hero');
        
        if (heroSection && navbar) {
            const heroHeight = heroSection.offsetHeight;
            const scrollThreshold = window.innerWidth <= 768 ? heroHeight - 50 : heroHeight;
            
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('transparent');
            } else {
                navbar.classList.remove('transparent');
            }
        }
    }, 100);
});

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

// Initialize photo gallery lightbox
document.addEventListener('DOMContentLoaded', function() {
    initPhotoGallery();
    initPsychologyElements();
});

// Psychology-driven UI elements
function initPsychologyElements() {
    // Show floating CTA after 30 seconds
    setTimeout(showFloatingCTA, 30000);
    
    // Show urgency notifications randomly
    setInterval(showRandomUrgencyNotification, 45000);
    
    // Track user engagement
    trackUserEngagement();
}

function showFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA && !localStorage.getItem('cta-dismissed')) {
        floatingCTA.classList.add('show');
    }
}

function closeFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA) {
        floatingCTA.classList.remove('show');
        localStorage.setItem('cta-dismissed', 'true');
        
        // Show again after 1 hour
        setTimeout(() => {
            localStorage.removeItem('cta-dismissed');
        }, 3600000);
    }
}

function showRandomUrgencyNotification() {
    const notifications = [
        { text: "Someone just booked Kerala Backwaters package!", time: "2 minutes ago" },
        { text: "Family from Mumbai booked Rajasthan tour!", time: "5 minutes ago" },
        { text: "Adventure seeker booked Himachal trek!", time: "8 minutes ago" },
        { text: "Couple from Delhi confirmed honeymoon package!", time: "12 minutes ago" },
        { text: "3 bookings in last 30 minutes!", time: "just now" }
    ];
    
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    showUrgencyNotification(randomNotification.text, randomNotification.time);
}

function showUrgencyNotification(text, time) {
    const urgencyNotification = document.getElementById('urgencyNotification');
    if (urgencyNotification && !urgencyNotification.classList.contains('show')) {
        urgencyNotification.querySelector('.urgency-text').textContent = text;
        urgencyNotification.querySelector('.urgency-time').textContent = time;
        urgencyNotification.classList.add('show');
        
        // Auto hide after 8 seconds
        setTimeout(() => {
            urgencyNotification.classList.remove('show');
        }, 8000);
    }
}

function closeUrgencyNotification() {
    const urgencyNotification = document.getElementById('urgencyNotification');
    if (urgencyNotification) {
        urgencyNotification.classList.remove('show');
    }
}

function trackUserEngagement() {
    let scrollDepth = 0;
    let timeOnPage = 0;
    let startTime = Date.now();
    
    // Track scroll depth
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const trackLength = documentHeight - windowHeight;
        const pctScrolled = Math.floor(scrollTop / trackLength * 100);
        
        if (pctScrolled > scrollDepth) {
            scrollDepth = pctScrolled;
            
            // Show special offers based on engagement
            if (scrollDepth > 70 && !localStorage.getItem('offer-shown')) {
                setTimeout(() => {
                    showSpecialOffer();
                }, 2000);
                localStorage.setItem('offer-shown', 'true');
            }
        }
    });
    
    // Track time on page
    setInterval(() => {
        timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    }, 1000);
}

function showSpecialOffer() {
    // Create and show a special offer modal for engaged users
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 400px; text-align: center; position: relative;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
                <h3 style="color: #D4AF8C; margin-bottom: 1rem;">🎉 Special Offer Just for You!</h3>
                <p style="margin-bottom: 1.5rem; color: #333;">Since you're exploring our packages, here's an exclusive 15% discount on your first booking!</p>
                <div style="background: linear-gradient(45deg, #ff4757, #ff6b7a); color: white; padding: 12px; border-radius: 10px; margin-bottom: 1rem; font-weight: bold;">
                    Use Code: EXPLORER15
                </div>
                <button onclick="openWhatsApp('Hi! I saw the EXPLORER15 offer and want to book a package. Can you help?'); this.parentElement.parentElement.remove();" style="background: #25D366; color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; cursor: pointer; width: 100%;">
                    Claim Offer Now!
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}







function trackEvent(eventName, eventData) {
    // Simple analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'custom_parameter': eventData
        });
    }
    
    console.log(`Event: ${eventName}`, eventData);
}
