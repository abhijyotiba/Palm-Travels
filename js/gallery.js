// Gallery Page Specific JavaScript - Zero Version Working

console.log('🎯 Zero Version Gallery.js loaded');

// Initialize gallery functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Zero Version initializing...');
    initGalleryFilters();
    initMasonryLayout();
    initLoadMore();
});

// Gallery Filter Functionality
function initGalleryFilters() {
    console.log('🔧 Initializing gallery filters (Zero Version)');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    console.log(`Found ${filterButtons.length} buttons and ${galleryItems.length} items`);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(`🔴 Filter clicked: ${button.getAttribute('data-filter')}`);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            filterGalleryItems(galleryItems, filterValue);
        });
    });
}

function filterGalleryItems(items, filter) {
    items.forEach(item => {
        if (filter === 'all') {
            showGalleryItem(item);
        } else {
            const categories = item.getAttribute('data-category');
            if (categories && categories.includes(filter)) {
                showGalleryItem(item);
            } else {
                hideGalleryItem(item);
            }
        }
    });
}

function showGalleryItem(item) {
    item.style.display = 'block';
    item.classList.remove('hidden');
    setTimeout(() => {
        item.classList.add('fade-in');
    }, 100);
}

function hideGalleryItem(item) {
    item.classList.remove('fade-in');
    item.classList.add('hidden');
    setTimeout(() => {
        item.style.display = 'none';
    }, 300);
}

// Simplified Layout Initialization
function initMasonryLayout() {
    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;

    // Wait for images to load before calculating positions
    const images = grid.querySelectorAll('img');
    let loadedImages = 0;

    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    // All images loaded, layout is ready
                    console.log('Gallery layout initialized');
                }
            });
        }
    });

    if (loadedImages === images.length) {
        console.log('Gallery layout initialized');
    }

    // Recalculate on window resize
    window.addEventListener('resize', debounce(() => {
        console.log('Gallery layout recalculated');
    }, 250));
}

function adjustMasonryLayout() {
    // Simplified layout - no complex calculations needed
    // The CSS grid handles the layout automatically
    console.log('Layout adjusted');
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMorePhotos');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', loadMorePhotos);
}

function loadMorePhotos() {
    const grid = document.querySelector('.masonry-grid');
    const loadMoreBtn = document.getElementById('loadMorePhotos');
    
    // Simulate loading more photos
    const newPhotos = [
        {
            src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=500&fit=crop',
            caption: 'Mountain Lake Reflection',
            category: 'landscapes'
        },
        {
            src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop',
            caption: 'Forest Trail Adventure',
            category: 'landscapes packages'
        },
        {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=450&fit=crop',
            caption: 'Scenic Valley View',
            category: 'destinations landscapes'
        },
        {
            src: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=400&h=550&fit=crop',
            caption: 'Cultural Heritage Site',
            category: 'destinations packages'
        }
    ];

    // Add loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
        newPhotos.forEach((photo, index) => {
            const galleryItem = createGalleryItem(photo);
            grid.appendChild(galleryItem);
            
            // Animate in the new item
            setTimeout(() => {
                galleryItem.classList.add('fade-in');
            }, index * 100);
        });

        // Reset button
        loadMoreBtn.innerHTML = '<i class="fas fa-camera"></i> Load More Photos';
        loadMoreBtn.disabled = false;

        // Recalculate masonry layout
        setTimeout(adjustMasonryLayout, 500);

    }, 1000);
}

function createGalleryItem(photo) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', photo.category);
    galleryItem.setAttribute('data-caption', photo.caption);
    
    galleryItem.innerHTML = `
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
        <div class="gallery-caption">${photo.caption}</div>
    `;
    
    // Add click event for lightbox
    galleryItem.addEventListener('click', () => {
        const allItems = document.querySelectorAll('.gallery-item');
        const index = Array.from(allItems).indexOf(galleryItem);
        window.currentImageIndex = index;
        
        // Update gallery images array
        window.galleryImages = Array.from(allItems).map(item => ({
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt,
            caption: item.dataset.caption || item.querySelector('.gallery-caption')?.textContent || ''
        }));
        
        // Open lightbox (function from main script.js)
        if (typeof openLightbox === 'function') {
            openLightbox();
        }
    });
    
    return galleryItem;
}

// Utility function for debouncing
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

// Smooth scroll animation for navigation
function smoothScrollToGallery() {
    const gallerySection = document.querySelector('.main-gallery');
    if (gallerySection) {
        gallerySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Search functionality for gallery (optional enhancement)
function initGallerySearch() {
    const searchInput = document.getElementById('gallery-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const captionElement = item.querySelector('.gallery-caption');
            const caption = captionElement ? captionElement.textContent.toLowerCase() : '';
            const category = item.getAttribute('data-category') || '';
            
            if (caption.includes(searchTerm) || category.toLowerCase().includes(searchTerm)) {
                showGalleryItem(item);
            } else {
                hideGalleryItem(item);
            }
        });
    });
}

// Lazy loading enhancement
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load if not already loaded
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initGallerySearch();
});

// Export functions for use in other scripts
window.galleryFunctions = {
    filterGalleryItems,
    adjustMasonryLayout,
    loadMorePhotos,
    smoothScrollToGallery
};
