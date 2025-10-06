// Packages Page JavaScript

// Global filter state
let currentFilters = {
    category: 'all',
    duration: 'all',
    maxPrice: 50000,
    searchTerm: ''
};

// Combined filter functionality - this is the main filter function
function applyAllFilters() {
    const packages = document.querySelectorAll('.package-card');
    let visibleCount = 0;
    
    packages.forEach(package => {
        const packageCategory = package.getAttribute('data-category') || '';
        const packageDurationAttr = package.getAttribute('data-duration');
        const packagePriceAttr = package.getAttribute('data-price');
        
        // Safely parse numeric values with fallback
        const packageDuration = packageDurationAttr ? parseInt(packageDurationAttr) : 0;
        const packagePrice = packagePriceAttr ? parseInt(packagePriceAttr) : 0;
        
        // Get package text content for search with null checks
        const titleElement = package.querySelector('h3');
        const descriptionElement = package.querySelector('p');
        const categoryElement = package.querySelector('.package-category');
        
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';
        const category = categoryElement ? categoryElement.textContent.toLowerCase() : '';
        const packageText = (title + ' ' + description + ' ' + category).toLowerCase();
        
        let showPackage = true;
        
        // Search filter
        if (currentFilters.searchTerm && !packageText.includes(currentFilters.searchTerm.toLowerCase())) {
            showPackage = false;
        }
        
        // Category filter
        if (currentFilters.category !== 'all' && packageCategory !== currentFilters.category) {
            showPackage = false;
        }
        
        // Duration filter
        if (currentFilters.duration !== 'all') {
            switch(currentFilters.duration) {
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
        if (packagePrice > currentFilters.maxPrice) {
            showPackage = false;
        }
        
        // Show or hide package
        if (showPackage) {
            package.style.display = 'block';
            package.classList.add('fade-in');
            package.classList.remove('hidden');
            visibleCount++;
        } else {
            package.style.display = 'none';
            package.classList.remove('fade-in');
            package.classList.add('hidden');
        }
    });
    
    updateResultsCount(visibleCount, packages.length);
}

// Individual filter functions that update the global state
function filterBySearch(searchTerm) {
    currentFilters.searchTerm = searchTerm;
    applyAllFilters();
}

function filterByCategory(category) {
    currentFilters.category = category;
    applyAllFilters();
}

function filterByDuration(duration) {
    currentFilters.duration = duration;
    applyAllFilters();
}

function filterByPrice(maxPrice) {
    currentFilters.maxPrice = maxPrice;
    applyAllFilters();
}

function clearAllFilters() {
    // Reset global filter state
    currentFilters = {
        category: 'all',
        duration: 'all',
        maxPrice: 50000,
        searchTerm: ''
    };
    
    // Reset all filter controls
    document.getElementById('search-filter').value = '';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('duration-filter').value = 'all';
    document.getElementById('price-range').value = 50000;
    document.getElementById('price-output').textContent = '₹50,000';
    
    // Apply filters (which will show all packages)
    applyAllFilters();
}

function updateResultsCount(visibleCount, totalCount) {
    const resultsCounter = document.getElementById('results-counter');
    if (resultsCounter) {
        if (visibleCount === totalCount) {
            resultsCounter.textContent = `Showing all ${totalCount} packages`;
        } else {
            resultsCounter.textContent = `Showing ${visibleCount} of ${totalCount} packages`;
        }
    }
    
}

// Helper function to format price with commas
function formatPrice(price) {
    return price.toLocaleString('en-IN');
}

// Package detail modal/redirect functionality
function openPackageDetails(packageId) {
    // For now, we'll show an alert with package info
    // In a real application, this would open a detailed page or modal
    
    const packageInfo = {
        'gokarna-spiritual': {
            title: 'Gokarna Spiritual Retreat',
            description: 'Serene beaches, ancient temples and laid-back coastal vibes perfect for spiritual rejuvenation and peaceful relaxation.',
            highlights: [
                'Beach Yoga Sessions at Om Beach',
                'Ancient Mahabaleshwar Temple Visit',
                'Kudle Beach and Paradise Beach hopping',
                'Spiritual meditation sessions',
                'Local coastal cuisine experience',
                'Sunset views from Gokarna Beach'
            ],
            includes: 'Accommodation, breakfast, yoga sessions, temple visits, beach transfers',
            price: '₹15,999 per person'
        },
        'udaipur-royal': {
            title: 'Udaipur Royal Heritage',
            description: 'City of Lakes with magnificent palaces, royal heritage, and rich culture of Rajasthan perfect for family exploration.',
            highlights: [
                'City Palace Complex guided tour',
                'Lake Pichola boat ride with sunset views',
                'Jagdish Temple and local market visits',
                'Royal sunset views from palace terraces',
                'Traditional Rajasthani dinner',
                'Heritage hotel accommodation'
            ],
            includes: 'Accommodation, breakfast, palace visits, boat rides, cultural shows',
            price: '₹17,999 for family of 4'
        },
        'manali-adventure': {
            title: 'Manali Mountain Adventure',
            description: 'Snow-capped mountains, adventure sports and scenic valleys through Solang Valley, Rohtang Pass and pristine nature.',
            highlights: [
                'Solang Valley adventure activities',
                'Rohtang Pass excursion (weather permitting)',
                'Paragliding and skiing opportunities',
                'River rafting in Beas River',
                'Visit to Hadimba Temple',
                'Local Himachali cuisine experience'
            ],
            includes: 'Accommodation, breakfast, adventure activities, local transfers',
            price: '₹19,999 per person'
        },
        'kerala-romance': {
            title: 'Kerala Backwaters Romance',
            description: 'Experience romance in God\'s Own Country with houseboat stays, spice plantations, and serene backwaters perfect for couples.',
            highlights: [
                'Luxury Houseboat Stay in Alleppey',
                'Munnar Hill Station with tea gardens',
                'Spice plantation tours in Thekkady',
                'Ayurvedic couple spa treatments',
                'Traditional Kerala cuisine',
                'Backwater cruises with sunset views'
            ],
            includes: 'Accommodation, breakfast, houseboat stay, spa treatments, sightseeing',
            price: '₹19,999 per couple'
        }
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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const priceRange = document.getElementById('price-range');
    const priceOutput = document.getElementById('price-output');
    const searchFilter = document.getElementById('search-filter');
    const categoryFilter = document.getElementById('category-filter');
    const durationFilter = document.getElementById('duration-filter');
    
    // Set initial values
    if (priceRange && priceOutput) {
        priceRange.value = currentFilters.maxPrice;
        priceOutput.textContent = '₹' + formatPrice(currentFilters.maxPrice);
        
        priceRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            priceOutput.textContent = '₹' + formatPrice(value);
            filterByPrice(value);
        });
    }
    
    // Add search functionality with debouncing
    if (searchFilter) {
        let searchTimeout;
        searchFilter.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterBySearch(this.value);
            }, 300); // Wait 300ms after user stops typing
        });
    }
    
    // Add event listeners for other filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterByCategory(this.value);
        });
    }
    
    if (durationFilter) {
        durationFilter.addEventListener('change', function() {
            filterByDuration(this.value);
        });
    }
    
    // Initialize page
    const totalPackages = document.querySelectorAll('.package-card').length;
    updateResultsCount(totalPackages, totalPackages);
    
    // Add smooth scrolling to filter section when coming from other pages
    if (window.location.hash === '#packages') {
        document.querySelector('.filters-section').scrollIntoView({
            behavior: 'smooth'
        });
    }
});
