// Loading Screen Animation
        const loadingScreen = document.getElementById('loading-screen');
        const loadingProgress = document.getElementById('loading-progress');
        const loadingProgressText = document.getElementById('loading-progress-text');
        const loadingText = document.getElementById('loading-text');
        
        const loadingMessages = [
            "Initializing stellar components...",
            "Configuring cosmic parameters...",
            "Loading space-time continuum...",
            "Booting up nebula interfaces...",
            "Calibrating quantum processors...",
            "Establishing wormhole connections..."
        ];
        
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            loadingProgress.style.width = `${progress}%`;
            loadingProgressText.textContent = `${Math.floor(progress)}%`;
            
            // Change loading text randomly
            if (Math.random() > 0.7) {
                loadingText.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
            }
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Initialize cosmic background after loading
                    createCosmicBackground();
                    // Initialize particle network
                    initParticleNetwork();
                }, 1000);
            }
        }, 200);
        
        // Create Cosmic Background
        function createCosmicBackground() {
            const starsContainer = document.getElementById('stars-container');
            const starCount = 200;
            
            // Create stars
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Random properties
                const size = Math.random() * 3;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const opacity = Math.random() * 0.8 + 0.2;
                const duration = Math.random() * 5 + 3;
                
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                star.style.opacity = opacity;
                star.style.setProperty('--opacity', opacity);
                star.style.setProperty('--duration', `${duration}s`);
                
                // Random twinkle delay
                star.style.animationDelay = `${Math.random() * 5}s`;
                
                starsContainer.appendChild(star);
            }
            
            // Create comets
            createComet();
            setTimeout(createComet, 5000);
            setTimeout(createComet, 10000);
            
            // Animate nebulas
            const nebula1 = document.getElementById('nebula-1');
            const nebula2 = document.getElementById('nebula-2');
            
            let nebula1X = 20;
            let nebula1Y = 10;
            let nebula2X = 10;
            let nebula2Y = 15;
            
            function animateNebulas() {
                nebula1X += Math.random() * 0.2 - 0.1;
                nebula1Y += Math.random() * 0.2 - 0.1;
                nebula2X += Math.random() * 0.2 - 0.1;
                nebula2Y += Math.random() * 0.2 - 0.1;
                
                // Constrain movement
                nebula1X = Math.max(5, Math.min(35, nebula1X));
                nebula1Y = Math.max(5, Math.min(25, nebula1Y));
                nebula2X = Math.max(5, Math.min(25, nebula2X));
                nebula2Y = Math.max(10, Math.min(30, nebula2Y));
                
                nebula1.style.left = `${nebula1X}%`;
                nebula1.style.top = `${nebula1Y}%`;
                nebula2.style.right = `${nebula2X}%`;
                nebula2.style.bottom = `${nebula2Y}%`;
                
                requestAnimationFrame(animateNebulas);
            }
            
            animateNebulas();
        }
        
        // Create Comet Animation
        function createComet() {
            const cosmicBg = document.querySelector('.cosmic-bg');
            const comet = document.createElement('div');
            comet.className = 'comet';
            
            // Random properties
            const x = Math.random() * 20;
            const y = Math.random() * 20;
            const duration = Math.random() * 20 + 10;
            const size = Math.random() * 4 + 2;
            
            comet.style.left = `${x}%`;
            comet.style.top = `${y}%`;
            comet.style.width = `${size}px`;
            comet.style.height = `${size}px`;
            comet.style.setProperty('--duration', `${duration}s`);
            
            cosmicBg.appendChild(comet);
            
            // Remove comet after animation
            setTimeout(() => {
                comet.remove();
            }, duration * 1000);
        }
        
        // Particle Network Animation
        function initParticleNetwork() {
            const canvas = document.getElementById('particle-network');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Particle class
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 1;
                    this.speedX = Math.random() * 1 - 0.5;
                    this.speedY = Math.random() * 1 - 0.5;
                    this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    // Bounce off edges
                    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                }
                
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Create particles
            const particles = [];
            const particleCount = Math.floor(canvas.width * canvas.height / 10000);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
            
            // Connect particles
            function connect() {
                for (let a = 0; a < particles.length; a++) {
                    for (let b = a; b < particles.length; b++) {
                        const dx = particles[a].x - particles[b].x;
                        const dy = particles[a].y - particles[b].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            
            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                
                connect();
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // Handle resize
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });
        
        // Terminal Functionality
        const terminal = document.querySelector('.terminal');
        const terminalToggle = document.getElementById('terminal-toggle');
        const terminalClose = document.getElementById('terminal-close');
        const terminalMinimize = document.getElementById('terminal-minimize');
        const terminalMaximize = document.getElementById('terminal-maximize');
        const terminalBody = document.getElementById('terminal-body');
        
        let terminalOpen = false;
        let terminalMaximized = false;
        
        terminalToggle.addEventListener('click', () => {
            terminalOpen = !terminalOpen;
            if (terminalOpen) {
                terminal.classList.add('active');
            } else {
                terminal.classList.remove('active');
            }
        });
        
        terminalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            terminalOpen = false;
            terminal.classList.remove('active');
        });
        
        terminalMinimize.addEventListener('click', (e) => {
            e.stopPropagation();
            terminalOpen = false;
            terminal.classList.remove('active');
        });
        
        terminalMaximize.addEventListener('click', (e) => {
            e.stopPropagation();
            terminalMaximized = !terminalMaximized;
            if (terminalMaximized) {
                terminal.style.width = '90%';
                terminal.style.height = '80vh';
                terminal.style.bottom = '10vh';
                terminal.style.right = '5%';
            } else {
                terminal.style.width = '500px';
                terminal.style.height = '';
                terminal.style.bottom = '';
                terminal.style.right = '';
            }
        });
        
        // Add interactive terminal commands
        terminalBody.addEventListener('click', () => {
            if (terminalOpen) {
                const newCommand = document.createElement('div');
                newCommand.className = 'terminal-line';
                newCommand.innerHTML = `
                    <span class="terminal-prompt">$</span>
                    <span class="terminal-command pulse">_</span>
                `;
                terminalBody.appendChild(newCommand);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
        
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
        
        // Back to Top Button
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Scroll Animation
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.experience-item, .skill-category, .project-card, .contact-item, .contact-form');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('visible');
                }
            });
        };
        
        // Initialize animations
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
        
        // Animate skill bars on scroll
        const skillsSection = document.getElementById('skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
        
        // Form submission
        const contactForm = document.querySelector('.contact-form');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
        
        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
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
        }
        
        // Set current year in footer
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Easter egg - Konami code
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                
                if (konamiIndex === konamiCode.length) {
                    // Konami code completed
                    document.body.classList.add('konami');
                    setTimeout(() => {
                        document.body.classList.remove('konami');
                    }, 5000);
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });