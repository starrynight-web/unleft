// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close hamburger menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});



// Close hamburger menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Show success message (simulated)
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
    });
}

// Success message function
function showSuccessMessage() {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon!</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">Close</button>
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    // Add styles for success content
    const successContent = successDiv.querySelector('.success-content');
    successContent.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        backdrop-filter: blur(10px);
        max-width: 400px;
        margin: 0 20px;
    `;
    
    // Add styles for icon
    const icon = successDiv.querySelector('i');
    icon.style.cssText = `
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
    `;
    
    // Add styles for text
    const h3 = successDiv.querySelector('h3');
    h3.style.cssText = `
        color: #ffffff;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    `;
    
    const p = successDiv.querySelector('p');
    p.style.cssText = `
        color: #a1a1aa;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    `;
    
    // Add to body
    document.body.appendChild(successDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger skill bars animation when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Simple fade-in effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Canvas particle animation
(function(){
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let W, H, DPR = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    const COUNT = 90; // tweak density

    function resize(){
        const rect = canvas.parentElement.getBoundingClientRect();
        W = rect.width; 
        H = rect.height; 
        canvas.width = W * DPR; 
        canvas.height = H * DPR; 
        canvas.style.width = W+'px'; 
        canvas.style.height = H+'px';
        ctx.setTransform(DPR,0,0,DPR,0,0);
    }

    function rand(min,max){
        return Math.random()*(max-min)+min;
    }

    function spawn(){
        particles = Array.from({length: COUNT}, ()=>({
            x: rand(0,W), 
            y: rand(0,H), 
            vx: rand(-.3,.3), 
            vy: rand(-.3,.3), 
            r: rand(1,3)
        }));
    }

    let mouse = {x:-9999, y:-9999};
    canvas.addEventListener('mousemove', e=>{
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left; 
        mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', ()=>{mouse.x = mouse.y = -9999});

    function step(){
        ctx.clearRect(0,0,W,H);
        // draw connections
        for(let i=0;i<particles.length;i++){
            const p = particles[i];
            p.x+=p.vx; 
            p.y+=p.vy;
            if(p.x<0||p.x>W) p.vx*=-1; 
            if(p.y<0||p.y>H) p.vy*=-1;
            const dx = p.x - mouse.x, dy = p.y - mouse.y; 
            const dist = Math.hypot(dx,dy);
            if(dist < 120){ // subtle mouse repulsion
                p.vx += dx / 20000; 
                p.vy += dy / 20000;
            }
            // draw particle
            ctx.beginPath(); 
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2); 
            ctx.fillStyle = 'rgba(167,139,250,.85)'; 
            ctx.fill();
            // connect to nearby
            for(let j=i+1;j<particles.length;j++){
                const q = particles[j];
                const d = (p.x-q.x)**2 + (p.y-q.y)**2;
                if(d < 120*120){
                    ctx.globalAlpha = 1 - (d**.5)/120; 
                    ctx.strokeStyle = 'rgba(103,232,249,.6)'; 
                    ctx.lineWidth = 1;
                    ctx.beginPath(); 
                    ctx.moveTo(p.x,p.y); 
                    ctx.lineTo(q.x,q.y); 
                    ctx.stroke(); 
                    ctx.globalAlpha = 1;
                }
            }
        }
        requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(()=>{resize(); spawn()});
    ro.observe(canvas.parentElement);
    resize(); spawn(); step();
})();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add scroll to top functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'translateY(-3px)';
        scrollButton.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'translateY(0)';
        scrollButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);
