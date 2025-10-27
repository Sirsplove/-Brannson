// DOM Elements
const stickyNav = document.getElementById('stickyNav');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section[id]');

// Sticky Navigation
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Show/hide sticky nav
    if (currentScrollY > 100) {
        stickyNav.classList.add('visible');
    } else {
        stickyNav.classList.remove('visible');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Trigger scroll animations
    triggerScrollAnimations();
    
    lastScrollY = currentScrollY;
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Only prevent default for internal anchor links (starting with #)
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for sticky nav height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // For external links (like portal-coming-soon.html), let the browser handle navigation normally
    });
});

// Update active navigation link
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll-triggered animations
function triggerScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add fade-in class to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature, .project-item, .contact-info, .contact-form, .image-section');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initial trigger
    triggerScrollAnimations();
});

// Contact Form Handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    contactForm.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        // Here you would integrate with your preferred form service
        // For now, we'll simulate a successful submission
        await simulateFormSubmission(data);
        
        // Show success message
        showSuccessMessage();
        contactForm.reset();
        
    } catch (error) {
        // Show error message
        showErrorMessage('There was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        contactForm.classList.remove('loading');
    }
});

// Simulate form submission (replace with actual integration)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                console.log('Form data:', data);
                resolve(data);
            } else {
                reject(new Error('Simulated error'));
            }
        }, 2000);
    });
}

// Show success message
function showSuccessMessage() {
    const existingMessage = contactForm.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
    
    contactForm.appendChild(successDiv);
    
    // Scroll to form
    contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    const existingMessage = contactForm.querySelector('.error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    contactForm.appendChild(errorDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Form validation
function validateForm() {
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    // Email validation
    const emailField = contactForm.querySelector('#email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        emailField.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add real-time validation
const formInputs = contactForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            input.classList.add('error');
        }
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error') && input.value.trim()) {
            input.classList.remove('error');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature, .project-item, .contact-info, .contact-form, .image-section');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Add mobile menu button if needed
function addMobileMenuButton() {
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        const existingButton = navContainer.querySelector('.mobile-menu-button');
        
        if (!existingButton) {
            const button = document.createElement('button');
            button.className = 'mobile-menu-button';
            button.innerHTML = '☰';
            button.onclick = toggleMobileMenu;
            navContainer.appendChild(button);
        }
    }
}

// Initialize mobile menu on load and resize
window.addEventListener('load', addMobileMenuButton);
window.addEventListener('resize', addMobileMenuButton);

// Portal button click tracking (for analytics)
document.querySelector('.portal-button')?.addEventListener('click', () => {
    // Track portal access
    console.log('Portal accessed');
    // Add your analytics tracking here
});

// CTA button click tracking
document.querySelector('.cta-button')?.addEventListener('click', () => {
    // Track CTA clicks
    console.log('CTA clicked');
    // Add your analytics tracking here
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
    triggerScrollAnimations();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Luxury loading animation
function showLuxuryLoader() {
    const loader = document.createElement('div');
    loader.className = 'luxury-loader';
    loader.innerHTML = `
        <div class="luxury-loader-content">
            <div class="luxury-spinner"></div>
            <div class="luxury-text">BRÅNNSON STUDIO</div>
            <div class="luxury-subtitle">Loading Luxury Experience...</div>
        </div>
    `;
    
    // Add loader styles
    const style = document.createElement('style');
    style.textContent = `
        .luxury-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 50%, #2c2c2c 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.8s ease-out;
        }
        
        .luxury-loader-content {
            text-align: center;
            color: white;
        }
        
        .luxury-spinner {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(212, 165, 116, 0.3);
            border-top: 3px solid #d4a574;
            border-radius: 50%;
            animation: luxurySpin 1s linear infinite;
            margin: 0 auto 2rem;
        }
        
        .luxury-text {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 500;
            letter-spacing: 2px;
            margin-bottom: 0.5rem;
            color: #d4a574;
        }
        
        .luxury-subtitle {
            font-size: 0.9rem;
            opacity: 0.8;
            letter-spacing: 1px;
        }
        
        @keyframes luxurySpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                style.remove();
            }, 800);
        }, 1000);
    });
}

// Enhanced scroll animations with luxury effects
function addLuxuryScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const luxuryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('luxury-visible');
                
                // Add luxury glow effect to project items
                if (entry.target.classList.contains('project-item')) {
                    setTimeout(() => {
                        entry.target.style.animation = 'luxuryFloat 2s ease-out';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for luxury animations
    const luxuryElements = document.querySelectorAll('.feature, .project-item, .contact-info, .contact-form, .image-section');
    luxuryElements.forEach(element => {
        element.classList.add('luxury-fade-in');
        luxuryObserver.observe(element);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Brånnson Studio luxury website loaded');
    
    // Show luxury loader
    showLuxuryLoader();
    
    // Add luxury scroll effects
    addLuxuryScrollEffects();
    
    // Initialize existing functionality
    updateActiveNavLink();
    triggerScrollAnimations();
});
