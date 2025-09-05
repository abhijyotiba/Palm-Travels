// Smooth Animations and Hover Effects

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Staggered animations
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach(item => {
                        item.classList.add('animate');
                    });
                }
            });
        }, observerOptions);
        
        staggerObserver.observe(container);
    });
}

// Enhanced navbar scroll effect
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Enhanced button interactions
function initButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn, .cta-button, .package-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.classList.add('magnetic', 'ripple');
        
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
        
        // Enhanced ripple effect
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced card hover effects with mobile support
function initCardEffects() {
    const cards = document.querySelectorAll('.destination-card, .package-card, .feature-card, .testimonial-card');
    
    cards.forEach(card => {
        // Desktop hover effects
        card.addEventListener('mouseenter', () => {
            if (!isMobile()) {
                card.style.zIndex = '10';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!isMobile()) {
                card.style.zIndex = '';
            }
        });
        
        // Mobile touch effects
        card.addEventListener('touchstart', (e) => {
            if (isMobile()) {
                card.classList.add('touch-active');
                addRippleEffect(card, e.touches[0]);
            }
        });
        
        card.addEventListener('touchend', () => {
            if (isMobile()) {
                setTimeout(() => {
                    card.classList.remove('touch-active');
                }, 150);
            }
        });
        
        // 3D tilt effect for desktop only
        card.addEventListener('mousemove', (e) => {
            if (!isMobile()) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!isMobile()) {
                card.style.transform = '';
            }
        });
    });
}

// Mobile-specific touch ripple effect
function addRippleEffect(element, touch) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = touch.clientX - rect.left - size / 2;
    const y = touch.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 128, 128, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: mobileRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced mobile navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add staggered animation to menu items
            if (navMenu.classList.contains('active')) {
                navLinks.forEach((link, index) => {
                    link.style.animationDelay = `${(index + 1) * 0.1}s`;
                });
            }
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Mobile-optimized scroll animations
function initMobileScrollAnimations() {
    const observerOptions = {
        threshold: isMobile() ? 0.05 : 0.1,
        rootMargin: isMobile() ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered animation for mobile grid items
                if (isMobile() && entry.target.classList.contains('stagger-container')) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Touch-friendly button effects
function initMobileButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn, .cta-button, .package-btn, .submit-btn');
    
    buttons.forEach(button => {
        // Mobile touch feedback
        button.addEventListener('touchstart', (e) => {
            if (isMobile()) {
                button.style.transform = 'scale(0.98)';
                button.style.filter = 'brightness(1.1)';
                addRippleEffect(button, e.touches[0]);
            }
        });
        
        button.addEventListener('touchend', () => {
            if (isMobile()) {
                setTimeout(() => {
                    button.style.transform = '';
                    button.style.filter = '';
                }, 150);
            }
        });
        
        // Desktop effects remain the same
        if (!isMobile()) {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        }
    });
}

// Mobile device detection
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Mobile-specific animations on load
function initMobileLoadAnimations() {
    if (isMobile()) {
        // Add entrance animations for mobile
        const hero = document.querySelector('.hero');
        const sections = document.querySelectorAll('section');
        
        if (hero) {
            hero.style.animation = 'fadeInUp 1s ease';
        }
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, (index + 1) * 200);
        });
    }
}

// Enhanced mobile form interactions
function initMobileFormEffects() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Mobile-specific focus effects
        input.addEventListener('focus', () => {
            if (isMobile()) {
                input.style.transform = 'scale(1.02)';
                input.style.boxShadow = '0 8px 25px rgba(0, 128, 128, 0.15)';
                
                // Scroll input into view on mobile
                setTimeout(() => {
                    input.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
        
        input.addEventListener('blur', () => {
            if (isMobile()) {
                input.style.transform = '';
                input.style.boxShadow = '';
            }
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced form interactions
function initFormEffects() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-5px) scale(0.9)';
                label.style.color = 'var(--primary-color)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
            
            // Add floating label effect
            if (input.value) {
                label.style.transform = 'translateY(-5px) scale(0.9)';
                label.style.color = 'var(--primary-color)';
            }
        }
    });
}

// Parallax effect for hero sections
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero, .packages-hero, .contact-hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            img.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    });
}

// Enhanced testimonial carousel
function initTestimonialEffects() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    testimonials.forEach((testimonial, index) => {
        testimonial.addEventListener('mouseenter', () => {
            testimonials.forEach((t, i) => {
                if (i !== index) {
                    t.style.opacity = '0.7';
                    t.style.transform = 'scale(0.95)';
                }
            });
        });
        
        testimonial.addEventListener('mouseleave', () => {
            testimonials.forEach(t => {
                t.style.opacity = '';
                t.style.transform = '';
            });
        });
    });
}

// Add animation styles to head
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = animationStyles;
    document.head.appendChild(style);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// CSS animation styles with mobile support
const animationStyles = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes mobileRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
    }
    
    .touch-active {
        transform: scale(0.98) !important;
        filter: brightness(1.05) !important;
    }
    
    /* Mobile-specific styles */
    @media (max-width: 768px) {
        .destination-card:active,
        .package-card:active,
        .feature-card:active {
            transform: scale(0.98);
            border-color: var(--primary-color);
            background: rgba(0, 128, 128, 0.02);
        }
        
        .nav-menu li {
            opacity: 0;
            transform: translateX(-20px);
            animation: slideInFromLeft 0.3s ease forwards;
        }
        
        .cta-button:active,
        .package-btn:active,
        .submit-btn:active {
            transform: scale(0.95) !important;
        }
    }
`;

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    
    // Initialize mobile-specific features
    if (isMobile()) {
        initMobileScrollAnimations();
        initMobileNavigation();
        initMobileButtonEffects();
        initMobileLoadAnimations();
        initMobileFormEffects();
    } else {
        initScrollAnimations();
        initButtonEffects();
        initFormEffects();
    }
    
    // Initialize features for both mobile and desktop
    initNavbarEffects();
    initCardEffects();
    initSmoothScroll();
    initParallaxEffect();
    initLoadingAnimations();
    initTestimonialEffects();
    
    // Add reveal class to elements that should animate on scroll
    const elementsToReveal = document.querySelectorAll('.section-header, .about-content, .destinations-grid, .packages-grid, .features-grid, .testimonials-grid');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Add stagger classes to grid items
    const gridContainers = document.querySelectorAll('.destinations-grid, .packages-grid, .features-grid, .testimonials-grid');
    gridContainers.forEach(container => {
        container.classList.add('stagger-container');
        const items = container.children;
        Array.from(items).forEach(item => {
            item.classList.add('stagger-item');
        });
    });
    
    // Add touch feedback styles for mobile
    if (isMobile()) {
        document.body.classList.add('mobile-device');
    }
});

// Export functions for use in other scripts
window.AnimationHelpers = {
    initScrollAnimations,
    initButtonEffects,
    initCardEffects,
    debounce
};
