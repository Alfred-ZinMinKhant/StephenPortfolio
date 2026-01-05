// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            // Add hide class first
            item.classList.add('hide');
            
            setTimeout(() => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Initialize portfolio items
portfolioItems.forEach(item => {
    item.classList.add('show');
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.btn');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Reset form
        this.reset();
        
        showNotification('Thank you! Your message has been sent successfully.', 'success');
    }, 2000);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: #2d3748;
            color: #f7fafc;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #28a745;
        }
        
        .notification-error {
            border-left: 4px solid #dc3545;
        }
        
        .notification-info {
            border-left: 4px solid #17a2b8;
        }
        
        .notification-content {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-message {
            flex: 1;
            margin-right: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Improved scroll animations
const createObserver = (options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
    };
    
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
                // Stop observing once animated to prevent re-triggers
                entry.target.observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);
};

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Create different observers for different element types
    const mainObserver = createObserver();
    const aboutObserver = createObserver({ threshold: 0.2, rootMargin: '0px' });
    
    // Portfolio and general elements
    const portfolioElements = document.querySelectorAll('.portfolio-item');
    portfolioElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        el.observer = mainObserver;
        mainObserver.observe(el);
    });
    
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        el.observer = mainObserver;
        mainObserver.observe(el);
    });
    
    // About section elements (more controlled)
    const aboutElements = document.querySelectorAll('.about-text h3, .experience-item, .skill-item');
    aboutElements.forEach((el, index) => {
        // Check if element is in viewport on load
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInViewport) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            el.observer = aboutObserver;
            aboutObserver.observe(el);
        }
    });
    
    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.observer = mainObserver;
        mainObserver.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start) + '+';
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            const statNumbers = [50, 25, 3, 1000000];
            const statElements = document.querySelectorAll('.stat-item h3');
            
            statElements.forEach((element, index) => {
                setTimeout(() => {
                    animateCounter(element, statNumbers[index]);
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    const loaderStyles = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1a202c;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeOut 0.5s ease 1s forwards;
        }
        
        .loader-content {
            text-align: center;
            color: #f7fafc;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #4a5568;
            border-top: 4px solid #4fd1c7;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 1500);
});

// Add smooth reveal animations for sections
const revealElements = document.querySelectorAll('.section-title, .section-subtitle');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

// Add active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const navStyles = document.createElement('style');
navStyles.textContent = `
    .nav-link.active {
        color: #4fd1c7 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
        background: #4fd1c7 !important;
    }
`;
document.head.appendChild(navStyles);
function setupModalHandlers(campaign) {
    const modalId = `portfolio-modal-${campaign}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;


    // Tag buttons for this card
    const tagButtons = document.querySelectorAll(`.portfolio-item[data-category='${campaign}'] .tag-btn`);
    tagButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            tagButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const modalKey = btn.getAttribute('data-modal');
            showModalContent(campaign, modalKey.replace(`${campaign}-`, ''), modal);
            // Show modal when any tag is clicked
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal on outside click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Slideshow navigation
    const prevBtn = modal.querySelector(`#prev-slide-${campaign}`);
    const nextBtn = modal.querySelector(`#next-slide-${campaign}`);
    let currentSlide = 0;
    let currentTag = 'highlighted';

    function showSlide(idx) {
        const data = campaignModalData[campaign][currentTag];
        if (!data || !data.images) return;
        const imagesDiv = modal.querySelector(`#slideshow-images-${campaign}`);
        const radiosDiv = modal.querySelector(`#slideshow-radios-${campaign}`);
        // build radios
        radiosDiv.innerHTML = '';
        if (data.images && data.images.length) {
            for (let i = 0; i < data.images.length; i++) {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `slideshow-radio-${campaign}`;
                radio.className = 'slideshow-radio';
                radio.checked = i === idx;
                radio.addEventListener('click', () => {
                    currentSlide = i;
                    showSlide(currentSlide);
                });
                radiosDiv.appendChild(radio);
            }

            // reuse existing img element to avoid layout reflow; crossfade on load
            let img = imagesDiv.querySelector('img.modal-slide-img');
            const imgSrc = data.images[idx];
            if (!img) {
                img = document.createElement('img');
                img.alt = `${campaign} slide ${idx + 1}`;
                img.className = 'modal-slide-img';
                img.style.cursor = 'zoom-in';
                img.style.opacity = '0';
                img.style.transition = 'opacity 220ms ease';
                // Lightbox effect
                img.addEventListener('click', () => {
                    const overlay = document.createElement('div');
                    overlay.className = 'lightbox-overlay';
                    overlay.innerHTML = `<img src='${imgSrc}' class='lightbox-img' style='max-width:90vw;max-height:90vh;display:block;margin:auto;'/>`;
                    overlay.style.position = 'fixed';
                    overlay.style.top = 0;
                    overlay.style.left = 0;
                    overlay.style.width = '100vw';
                    overlay.style.height = '100vh';
                    overlay.style.background = 'rgba(0,0,0,0.85)';
                    overlay.style.zIndex = 99999;
                    overlay.addEventListener('click', () => overlay.remove());
                    document.body.appendChild(overlay);
                });
                imagesDiv.appendChild(img);
            } else {
                img.style.opacity = '0';
            }

            img.onload = () => {
                img.style.opacity = '1';
            };
            img.src = imgSrc;
        }
    }

    function showModalContent(campaign, tag, modal) {
        currentTag = tag;
        currentSlide = 0;
        const descDiv = modal.querySelector(`#modal-description-${campaign}`);
        const slideshowDiv = modal.querySelector(`#modal-slideshow-${campaign}`);
        if (campaignModalData[campaign][tag].images) {
            slideshowDiv.style.display = '';
            showSlide(currentSlide);
            descDiv.innerHTML = campaignModalData[campaign][tag].description || '';
        } else if (campaignModalData[campaign][tag].table) {
            slideshowDiv.style.display = 'none';
            descDiv.innerHTML = campaignModalData[campaign][tag].table;
        }
    }


    // Initial content (default to highlighted)
    showModalContent(campaign, 'highlighted', modal);

    // Make Highlighted Posts active and open modal by default
    const highlightedBtn = document.querySelector(`.portfolio-item[data-category='${campaign}'] .tag-btn[data-modal='${campaign}-highlighted']`);
    if (highlightedBtn) {
        highlightedBtn.classList.add('active');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Slideshow navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const data = campaignModalData[campaign][currentTag];
            if (!data || !data.images) return;
            currentSlide = (currentSlide - 1 + data.images.length) % data.images.length;
            showSlide(currentSlide);
        });
        nextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const data = campaignModalData[campaign][currentTag];
            if (!data || !data.images) return;
            currentSlide = (currentSlide + 1) % data.images.length;
            showSlide(currentSlide);
        });
    }
}

if (typeof campaignModalData !== 'undefined' && campaignModalData && Object.keys(campaignModalData).length) {
    Object.keys(campaignModalData).forEach(setupModalHandlers);
} else {
    // campaignModalData not available — skip modal setup to avoid runtime errors
    console.warn('campaignModalData is not defined; portfolio modals will not be initialized.');
}