// Loading Animation
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.visibility = 'hidden';
    }, 500);
});

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Change active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
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

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonial slider
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        // Add active class to clicked dot
        dot.classList.add('active');
        
        const index = dot.getAttribute('data-index');
        
        // Hide all testimonial cards
        testimonialCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('animate-fade-in');
        });
        
        // Show selected testimonial card
        testimonialCards[index].style.display = 'block';
        setTimeout(() => {
            testimonialCards[index].classList.add('animate-fade-in');
        }, 10);
    });
});

// Auto-rotate testimonials
let currentTestimonial = 0;
function rotateTestimonials() {
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    testimonialCards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('animate-fade-in');
    });
    
    currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
    
    testimonialDots[currentTestimonial].classList.add('active');
    testimonialCards[currentTestimonial].style.display = 'block';
    setTimeout(() => {
        testimonialCards[currentTestimonial].classList.add('animate-fade-in');
    }, 10);
}

// Set interval for auto-rotation (every 5 seconds)
let testimonialInterval = setInterval(rotateTestimonials, 5000);

// Pause auto-rotation when user interacts
testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(rotateTestimonials, 5000);
    });
});

// About tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const tabId = btn.getAttribute('data-tab');
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab content
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    
    btnText.textContent = 'Sending...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    
    // Here you would typically send the form data to a server
    setTimeout(() => {
        console.log({ name, email, subject, message });
        
        // Show success message
        btnText.textContent = 'Message Sent!';
        btnIcon.className = 'fas fa-check';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
        }, 2000);
    }, 1500);
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input');
    const email = emailInput.value;
    const submitBtn = newsletterForm.querySelector('button');
    const btnText = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    
    // Show loading state
    btnText.textContent = 'Subscribing...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    
    // Here you would typically send the email to a newsletter service
    setTimeout(() => {
        console.log(`Subscribed email: ${email}`);
        
        // Show success message
        btnText.textContent = 'Subscribed!';
        btnIcon.className = 'fas fa-check';
        
        // Reset form
        setTimeout(() => {
            newsletterForm.reset();
            btnText.textContent = 'Subscribe';
            btnIcon.className = 'fas fa-envelope';
        }, 2000);
    }, 1500);
});

// Scroll reveal animation
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Tooltip initialization
const tooltipTriggers = document.querySelectorAll('.tooltip');

tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        const tooltip = trigger.querySelector('.tooltip-text');
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    });
    
    trigger.addEventListener('mouseleave', () => {
        const tooltip = trigger.querySelector('.tooltip-text');
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in:not(.active)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize first testimonial
testimonialCards[0].style.display = 'block';
testimonialCards[0].classList.add('animate-fade-in');