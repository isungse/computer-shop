// Main JavaScript for 평택컴퓨터 website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initImageLazyLoading();
    initScrollToTop();
    
    console.log('평택컴퓨터 웹사이트가 로드되었습니다.');
});

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu visibility
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
        
        // Update aria-expanded attribute
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        
        // Update button icon
        const icon = mobileMenuButton.querySelector('svg path');
        if (!isExpanded) {
            // Change to X icon
            icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            // Change back to hamburger icon
            icon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
        }
    });
    
    // Close mobile menu when clicking on menu items
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            // Reset icon
            const icon = mobileMenuButton.querySelector('svg path');
            icon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            
            // Reset icon
            const icon = mobileMenuButton.querySelector('svg path');
            icon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
        }
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact form handling with validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (!form || !formMessage) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error messages
        clearErrorMessages();
        
        // Validate form
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error message when user starts typing
            const errorElement = this.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.remove('show');
                errorElement.classList.add('hidden');
            }
        });
    });
    
    function validateForm() {
        let isValid = true;
        
        // Required fields validation
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Email validation
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value && !isValidEmail(emailField.value)) {
            showFieldError(emailField, '올바른 이메일 주소를 입력해주세요.');
            isValid = false;
        }
        
        // Phone validation
        const phoneField = form.querySelector('#phone');
        if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
            showFieldError(phoneField, '올바른 전화번호를 입력해주세요. (예: 010-1234-5678)');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            showFieldError(field, '이 필드는 필수입니다.');
            return false;
        }
        
        if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            showFieldError(field, '올바른 이메일 주소를 입력해주세요.');
            return false;
        }
        
        if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            showFieldError(field, '올바른 전화번호를 입력해주세요.');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            errorElement.classList.add('show');
        }
    }
    
    function clearErrorMessages() {
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.classList.add('hidden');
            element.classList.remove('show');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    function submitForm() {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.textContent = '전송 중...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showFormMessage('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            
            // Reset form
            form.reset();
        }, 2000);
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `text-center font-medium ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
        formMessage.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

/**
 * Lazy loading for images
 */
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Scroll to top functionality
 */
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    scrollToTopButton.className = 'fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-50';
    scrollToTopButton.setAttribute('aria-label', '페이지 상단으로 이동');
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopButton.classList.add('opacity-100');
        } else {
            scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
            scrollToTopButton.classList.remove('opacity-100');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Enhanced card interactions
 */
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

/**
 * Accessibility improvements
 */
function initAccessibility() {
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) link.click();
            }
        });
    });
    
    // Announce page changes for screen readers
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('h2');
                if (sectionTitle) {
                    // Announce section change to screen readers
                    const announcement = document.createElement('div');
                    announcement.setAttribute('aria-live', 'polite');
                    announcement.setAttribute('aria-atomic', 'true');
                    announcement.className = 'sr-only';
                    announcement.textContent = `${sectionTitle.textContent} 섹션입니다.`;
                    document.body.appendChild(announcement);
                    
                    setTimeout(() => {
                        document.body.removeChild(announcement);
                    }, 1000);
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

/**
 * Performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window && 'getEntriesByType' in window.performance) {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log(`페이지 로드 시간: ${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`);
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();
