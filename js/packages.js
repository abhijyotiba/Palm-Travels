// Packages Page JavaScript

// Filter functionality
function filterByCategory(category) {
    const packages = document.querySelectorAll('.package-card');
    
    packages.forEach(package => {
        const packageCategory = package.getAttribute('data-category');
        
        if (category === 'all' || packageCategory === category) {
            package.style.display = 'block';
            package.classList.add('fade-in');
        } else {
            package.style.display = 'none';
            package.classList.remove('fade-in');
        }
    });
    
    updateResultsCount();
}

function filterByDuration(duration) {
    const packages = document.querySelectorAll('.package-card');
    
    packages.forEach(package => {
        const packageDuration = parseInt(package.getAttribute('data-duration'));
        let showPackage = false;
        
        switch(duration) {
            case 'all':
                showPackage = true;
                break;
            case 'short':
                showPackage = packageDuration <= 5;
                break;
            case 'medium':
                showPackage = packageDuration >= 6 && packageDuration <= 10;
                break;
            case 'long':
                showPackage = packageDuration >= 11;
                break;
        }
        
        if (showPackage) {
            package.style.display = 'block';
            package.classList.add('fade-in');
        } else {
            package.style.display = 'none';
            package.classList.remove('fade-in');
        }
    });
    
    updateResultsCount();
}

function filterByPrice(maxPrice) {
    const packages = document.querySelectorAll('.package-card');
    
    packages.forEach(package => {
        const packagePrice = parseInt(package.getAttribute('data-price'));
        
        if (packagePrice <= maxPrice) {
            package.style.display = 'block';
            package.classList.add('fade-in');
        } else {
            package.style.display = 'none';
            package.classList.remove('fade-in');
        }
    });
    
    updateResultsCount();
}

function clearAllFilters() {
    // Reset all filter selects
    document.getElementById('category-filter').value = 'all';
    document.getElementById('duration-filter').value = 'all';
    document.getElementById('price-range').value = 5000;
    document.getElementById('price-output').textContent = '$5000';
    
    // Show all packages
    const packages = document.querySelectorAll('.package-card');
    packages.forEach(package => {
        package.style.display = 'block';
        package.classList.add('fade-in');
    });
    
    updateResultsCount();
}

function updateResultsCount() {
    const visiblePackages = document.querySelectorAll('.package-card[style*="display: block"], .package-card:not([style*="display: none"])');
    const totalPackages = document.querySelectorAll('.package-card').length;
    
    // You can add a results counter here if needed
    console.log(`Showing ${visiblePackages.length} of ${totalPackages} packages`);
}

// Price range slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const priceRange = document.getElementById('price-range');
    const priceOutput = document.getElementById('price-output');
    
    if (priceRange && priceOutput) {
        priceRange.addEventListener('input', function() {
            priceOutput.textContent = '$' + this.value;
            filterByPrice(parseInt(this.value));
        });
    }
});

// Package detail modal/redirect functionality
function openPackageDetails(packageId) {
    // For now, we'll show an alert with package info
    // In a real application, this would open a detailed page or modal
    
    const packageInfo = {
        'romantic-paris': {
            title: 'Romantic Paris Getaway',
            description: 'Experience the magic of Paris with your loved one. This 7-day romantic package includes luxury accommodations, gourmet dining, and guided tours of iconic landmarks.',
            highlights: [
                'Seine River dinner cruise with live music',
                'Private Eiffel Tower photoshoot',
                'Louvre Museum skip-the-line access',
                'Luxury 5-star hotel in the heart of Paris',
                'Professional local guide',
                'Champagne welcome package'
            ],
            includes: 'Flights, accommodation, breakfast, guided tours, entrance fees',
            price: '$2,499 per person'
        },
        'santorini-romance': {
            title: 'Santorini Sunset Romance',
            description: 'Watch breathtaking sunsets in Santorini with your loved one. Perfect for honeymoons and anniversaries.',
            highlights: [
                'Sunset wine tasting tour',
                'Private beach access',
                'Couples spa treatment',
                'Island hopping adventure',
                'Traditional Greek cooking class',
                'Romantic dinners with sea views'
            ],
            includes: 'Flights, accommodation, breakfast, sunset tours, spa treatment',
            price: '$1,899 per person'
        },
        // Add more package details as needed
    };
    
    const info = packageInfo[packageId];
    if (info) {
        let message = `${info.title}\n\n${info.description}\n\nHighlights:\n`;
        info.highlights.forEach(highlight => {
            message += `• ${highlight}\n`;
        });
        message += `\nIncludes: ${info.includes}\nPrice: ${info.price}\n\nContact us to book this amazing package!`;
        
        alert(message);
    } else {
        alert('Package details coming soon! Contact us for more information and booking.');
    }
}

// Load more packages functionality
let currentPackageCount = 10; // Initial number of packages shown
const packagesPerLoad = 6;

function loadMorePackages() {
    // In a real application, this would fetch more packages from a server
    // For now, we'll simulate loading by showing a message
    
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        alert('More packages coming soon! We\'re constantly adding new destinations and experiences.');
        loadMoreBtn.textContent = 'Load More Packages';
        loadMoreBtn.disabled = false;
    }, 1000);
}

// Combined filter functionality
function applyAllFilters() {
    const category = document.getElementById('category-filter').value;
    const duration = document.getElementById('duration-filter').value;
    const maxPrice = parseInt(document.getElementById('price-range').value);
    
    const packages = document.querySelectorAll('.package-card');
    
    packages.forEach(package => {
        const packageCategory = package.getAttribute('data-category');
        const packageDuration = parseInt(package.getAttribute('data-duration'));
        const packagePrice = parseInt(package.getAttribute('data-price'));
        
        let showPackage = true;
        
        // Category filter
        if (category !== 'all' && packageCategory !== category) {
            showPackage = false;
        }
        
        // Duration filter
        if (duration !== 'all') {
            switch(duration) {
                case 'short':
                    if (packageDuration > 5) showPackage = false;
                    break;
                case 'medium':
                    if (packageDuration < 6 || packageDuration > 10) showPackage = false;
                    break;
                case 'long':
                    if (packageDuration < 11) showPackage = false;
                    break;
            }
        }
        
        // Price filter
        if (packagePrice > maxPrice) {
            showPackage = false;
        }
        
        if (showPackage) {
            package.style.display = 'block';
            package.classList.add('fade-in');
        } else {
            package.style.display = 'none';
            package.classList.remove('fade-in');
        }
    });
    
    updateResultsCount();
}

// Add event listeners for combined filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const durationFilter = document.getElementById('duration-filter');
    const priceRange = document.getElementById('price-range');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyAllFilters);
    }
    
    if (durationFilter) {
        durationFilter.addEventListener('change', applyAllFilters);
    }
    
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('price-output').textContent = '$' + this.value;
            applyAllFilters();
        });
    }
});

// Search functionality (can be added to the filters section)
function searchPackages(searchTerm) {
    const packages = document.querySelectorAll('.package-card');
    const term = searchTerm.toLowerCase();
    
    packages.forEach(package => {
        const title = package.querySelector('h3').textContent.toLowerCase();
        const description = package.querySelector('p').textContent.toLowerCase();
        const category = package.querySelector('.package-category').textContent.toLowerCase();
        
        if (title.includes(term) || description.includes(term) || category.includes(term)) {
            package.style.display = 'block';
            package.classList.add('fade-in');
        } else {
            package.style.display = 'none';
            package.classList.remove('fade-in');
        }
    });
    
    updateResultsCount();
}

// Sort functionality
function sortPackages(sortBy) {
    const container = document.getElementById('packages-container');
    const packages = Array.from(container.querySelectorAll('.package-card'));
    
    packages.sort((a, b) => {
        switch(sortBy) {
            case 'price-low':
                return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            case 'price-high':
                return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
            case 'duration-short':
                return parseInt(a.getAttribute('data-duration')) - parseInt(b.getAttribute('data-duration'));
            case 'duration-long':
                return parseInt(b.getAttribute('data-duration')) - parseInt(a.getAttribute('data-duration'));
            case 'name':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            default:
                return 0;
        }
    });
    
    // Clear container and re-append sorted packages
    container.innerHTML = '';
    packages.forEach(package => container.appendChild(package));
}

// Booking inquiry functionality
function openBookingInquiry(packageTitle) {
    const message = `Hi! I'm interested in booking the "${packageTitle}" package. Could you please provide more details about availability and pricing?`;
    
    // This could open a modal form or redirect to contact page with pre-filled information
    if (confirm('Would you like to send a WhatsApp message for immediate assistance?')) {
        openWhatsApp(message);
    } else {
        // Redirect to contact page with package info
        const contactUrl = `contact.html?package=${encodeURIComponent(packageTitle)}`;
        window.location.href = contactUrl;
    }
}

// Package comparison functionality
let comparisonList = [];

function addToComparison(packageElement) {
    const packageTitle = packageElement.querySelector('h3').textContent;
    const packagePrice = packageElement.querySelector('.package-price').textContent;
    const packageCategory = packageElement.querySelector('.package-category').textContent;
    
    const packageData = {
        title: packageTitle,
        price: packagePrice,
        category: packageCategory,
        element: packageElement
    };
    
    if (comparisonList.length < 3 && !comparisonList.find(p => p.title === packageTitle)) {
        comparisonList.push(packageData);
        updateComparisonUI();
    } else if (comparisonList.length >= 3) {
        alert('You can compare up to 3 packages at a time.');
    } else {
        alert('This package is already in your comparison list.');
    }
}

function removeFromComparison(packageTitle) {
    comparisonList = comparisonList.filter(p => p.title !== packageTitle);
    updateComparisonUI();
}

function updateComparisonUI() {
    // This would update a comparison widget/sidebar
    console.log('Comparison list updated:', comparisonList);
}

// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');

function toggleWishlist(packageElement) {
    const packageTitle = packageElement.querySelector('h3').textContent;
    const packageIndex = wishlist.findIndex(p => p.title === packageTitle);
    
    if (packageIndex === -1) {
        // Add to wishlist
        const packageData = {
            title: packageTitle,
            price: packageElement.querySelector('.package-price').textContent,
            category: packageElement.querySelector('.package-category').textContent,
            image: packageElement.querySelector('img').src
        };
        wishlist.push(packageData);
        alert('Package added to your wishlist!');
    } else {
        // Remove from wishlist
        wishlist.splice(packageIndex, 1);
        alert('Package removed from your wishlist.');
    }
    
    localStorage.setItem('travelWishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    // Update wishlist icon/counter in the navigation
    console.log('Wishlist updated:', wishlist);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateResultsCount();
    updateWishlistUI();
    
    // Add smooth scrolling to filter section when coming from other pages
    if (window.location.hash === '#packages') {
        document.querySelector('.filters-section').scrollIntoView({
            behavior: 'smooth'
        });
    }
});
