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
        const packageCategory = package.getAttribute('data-category');
        const packageDuration = parseInt(package.getAttribute('data-duration'));
        const packagePrice = parseInt(package.getAttribute('data-price'));
        
        // Get package text content for search
        const title = package.querySelector('h3').textContent.toLowerCase();
        const description = package.querySelector('p').textContent.toLowerCase();
        const category = package.querySelector('.package-category').textContent.toLowerCase();
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
