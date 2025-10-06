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

// WhatsApp integration for package bookings
function openPackageDetails(packageId) {
    // Create WhatsApp message based on package ID
    const packageName = packageId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const message = `Hi! I'm interested in the ${packageName} package at the current discounted price. I saw the special offer on your website and don't want to miss out on this amazing deal. Please share more details and help me book this package immediately!`;
    
    if (typeof openWhatsApp === 'function') {
        openWhatsApp(message);
    } else {
        // Fallback WhatsApp integration
        const phoneNumber = '919372495692';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
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
