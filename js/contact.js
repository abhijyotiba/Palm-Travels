// Contact Page JavaScript

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Check for URL parameters (e.g., from package inquiry)
    checkURLParameters();
    
    // Initialize form validation
    initializeFormValidation();
});

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        clearValidationStates(form);
        
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    
    // Required fields validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && !validateEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phoneField = form.querySelector('[type="tel"]');
    if (phoneField && !validatePhone(phoneField.value)) {
        showFieldError(phoneField, 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Specific validation for different field types
    if (field.type === 'email') {
        if (!validateEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (field.type === 'tel') {
        if (!validatePhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    if (field.tagName === 'TEXTAREA' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Enhanced phone validation for international numbers
    const re = /^[\+]?[\d\s\-\(\)]{10,15}$/;
    return re.test(phone.trim());
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    // Remove error message
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearValidationStates(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value.trim()) {
                validateField(field);
            }
        });
        
        field.addEventListener('input', () => {
            const formGroup = field.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(field);
            }
        });
    });
}

function showSuccessMessage() {
    // Create success modal or notification
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <button onclick="closeSuccessModal()" class="success-btn">OK</button>
        </div>
    `;
    
    // Add styles
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const content = successModal.querySelector('.success-modal-content');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    const icon = successModal.querySelector('.success-icon i');
    icon.style.cssText = `
        font-size: 3rem;
        color: #27ae60;
        margin-bottom: 1rem;
    `;
    
    const button = successModal.querySelector('.success-btn');
    button.style.cssText = `
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
    `;
    
    document.body.appendChild(successModal);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.remove();
    }
}

// FAQ functionality
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.closest('.faq-item').querySelector('.faq-answer').classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        button.classList.add('active');
        answer.classList.add('active');
    }
}

// WhatsApp functionality
function openWhatsApp(customMessage = null) {
    const defaultMessage = 'Hello! I would like to inquire about your travel packages and services.';
    const message = customMessage || defaultMessage;
    const phoneNumber = '919372495692'; // Updated WhatsApp number for India
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Check URL parameters for pre-filled form data
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageName = urlParams.get('package');
    
    if (packageName) {
        // Pre-fill inquiry type and message
        const inquiryTypeSelect = document.getElementById('inquiryType');
        const messageTextarea = document.getElementById('message');
        
        if (inquiryTypeSelect) {
            inquiryTypeSelect.value = 'booking';
        }
        
        if (messageTextarea) {
            messageTextarea.value = `I'm interested in booking the "${packageName}" package. Could you please provide more details about availability, pricing, and what's included?`;
        }
    }
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});

// Form field suggestions/autocomplete
function initializeFieldSuggestions() {
    const destinationField = document.getElementById('destination');
    
    if (destinationField) {
        const destinations = [
            'Paris, France',
            'Bali, Indonesia',
            'Tokyo, Japan',
            'Santorini, Greece',
            'Rome, Italy',
            'Maldives',
            'Thailand',
            'Nepal',
            'Iceland',
            'Vietnam'
        ];
        
        destinationField.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            // You could implement a dropdown suggestion here
        });
    }
}

// Contact form tracking (for analytics)
function trackFormInteraction(action, field = null) {
    // Example analytics tracking
    
    // You could integrate with Google Analytics, Facebook Pixel, etc.
    // gtag('event', action, {
    //     event_category: 'Contact Form',
    //     event_label: field
    // });
}

// Real-time form saving (optional)
function initializeFormAutoSave() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.addEventListener('input', () => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            localStorage.setItem('contactFormDraft', JSON.stringify(data));
        });
    });
    
    // Restore form data on page load
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
            }
        });
    }
}

// Clear saved form data after successful submission
function clearFormDraft() {
    localStorage.removeItem('contactFormDraft');
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeFieldSuggestions();
    initializeFormAutoSave();
    
    // Track form view
    trackFormInteraction('form_view');
});

// Form step validation for better UX
function validateFormStep(stepElement) {
    const fields = stepElement.querySelectorAll('[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Keyboard navigation for FAQ
document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('faq-question')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFAQ(e.target);
        }
    }
});

// Form submission with actual API integration (example)
async function submitFormToAPI(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            return { success: true };
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        return { success: false, error: error.message };
    }
}
