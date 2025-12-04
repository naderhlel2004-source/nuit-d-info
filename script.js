// Navigation Toggle for Mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Distribution Finder Logic
document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const options = document.querySelectorAll('.option');
    const recommendation = document.getElementById('recommendation');
    const placeholder = document.querySelector('.result-placeholder');
    
    let currentQuestion = 1;
    let userAnswers = {
        useCase: '',
        hardware: '',
        experience: ''
    };
    
    // Distribution recommendations based on answers
    const distributions = {
        // Use Case: Beginner
        'beginner-old-novice': {
            name: 'Linux Mint',
            desc: 'Perfect for beginners with old hardware. Windows-like interface, very stable.',
            logo: 'mint',
            specs: '2GB RAM, 20GB storage',
            download: 'https://linuxmint.com/download.php',
            alternatives: ['Ubuntu', 'Zorin OS', 'Elementary OS']
        },
        'beginner-modern-novice': {
            name: 'Ubuntu',
            desc: 'Most popular, user-friendly, excellent hardware support and documentation.',
            logo: 'ubuntu',
            specs: '4GB RAM, 25GB storage',
            download: 'https://ubuntu.com/download/desktop',
            alternatives: ['Linux Mint', 'Pop!_OS', 'Fedora']
        },
        // Education
        'education-mixed-intermediate': {
            name: 'Ubuntu Education',
            desc: 'Pre-configured with educational software. Easy to deploy in computer labs.',
            logo: 'ubuntu',
            specs: '4GB RAM, 30GB storage',
            download: 'https://ubuntu.com/download/edu',
            alternatives: ['Edubuntu', 'Debian Edu', 'Fedora']
        },
        // Development/AI
        'development-modern-advanced': {
            name: 'Fedora',
            desc: 'Cutting-edge features, excellent for development and AI/ML with latest tools.',
            logo: 'fedora',
            specs: '8GB RAM, 40GB storage',
            download: 'https://getfedora.org/',
            alternatives: ['Ubuntu', 'Arch Linux', 'openSUSE']
        },
        'development-server-hardware-expert': {
            name: 'Ubuntu Server',
            desc: 'Enterprise-grade stability with long-term support. Perfect for servers.',
            logo: 'ubuntu',
            specs: '2GB RAM, 25GB storage',
            download: 'https://ubuntu.com/download/server',
            alternatives: ['Debian', 'CentOS', 'Rocky Linux']
        }
    };
    
    // Default recommendation
    const defaultDistro = {
        name: 'Ubuntu',
        desc: 'Most popular, user-friendly, excellent hardware support',
        logo: 'ubuntu',
        specs: '4GB RAM, 25GB storage',
        download: 'https://ubuntu.com/download/desktop',
        alternatives: ['Fedora', 'Linux Mint', 'Debian']
    };
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // Store answer based on current question
            if (currentQuestion === 1) {
                userAnswers.useCase = value;
            } else if (currentQuestion === 2) {
                userAnswers.hardware = value;
            } else if (currentQuestion === 3) {
                userAnswers.experience = value;
            }
            
            // Move to next question or show result
            if (currentQuestion < 3) {
                // Hide current question
                document.getElementById(`q${currentQuestion}`).classList.remove('active');
                // Show next question
                currentQuestion++;
                document.getElementById(`q${currentQuestion}`).classList.add('active');
            } else {
                // All questions answered, show recommendation
                showRecommendation();
            }
        });
    });
    
    // Show recommendation based on answers
    function showRecommendation() {
        // Hide questions
        document.querySelector('.finder-questions').style.display = 'none';
        
        // Hide placeholder
        placeholder.style.display = 'none';
        
        // Show recommendation
        recommendation.style.display = 'block';
        
        // Get recommendation key
        const key = `${userAnswers.useCase}-${userAnswers.hardware}-${userAnswers.experience}`;
        
        // Get distribution (or default)
        const distro = distributions[key] || defaultDistro;
        
        // Update recommendation display
        updateDistroDisplay(distro);
    }
    
    // Update distribution display
    function updateDistroDisplay(distro) {
        // Set logo
        const logo = document.querySelector('.distro-logo');
        logo.innerHTML = `<i class="fab fa-${distro.logo}"></i>`;
        
        // Set colors based on distro
        if (distro.logo === 'ubuntu') {
            logo.style.backgroundColor = var('--ubuntu-color');
        } else if (distro.logo === 'fedora') {
            logo.style.backgroundColor = var('--fedora-color');
        } else if (distro.logo === 'mint') {
            logo.style.backgroundColor = var('--mint-color');
        } else if (distro.logo === 'debian') {
            logo.style.backgroundColor = var('--debian-color');
        }
        
        // Update text
        document.querySelector('.distro-info h3').textContent = distro.name;
        document.querySelector('.distro-desc').textContent = distro.desc;
        document.querySelector('.btn-distro').href = distro.download;
        
        // Update alternatives
        const alternativesContainer = document.querySelector('.alternatives');
        alternativesContainer.innerHTML = '';
        
        distro.alternatives.forEach(alt => {
            const altDiv = document.createElement('div');
            altDiv.className = 'alt-distro';
            
            // Determine logo class
            let logoClass = 'fab fa-linux';
            if (alt.toLowerCase().includes('ubuntu')) logoClass = 'fab fa-ubuntu';
            else if (alt.toLowerCase().includes('fedora')) logoClass = 'fab fa-fedora';
            else if (alt.toLowerCase().includes('debian')) logoClass = 'fab fa-debian';
            else if (alt.toLowerCase().includes('mint')) logoClass = 'fab fa-linux';
            
            altDiv.innerHTML = `
                <div class="alt-logo ${alt.toLowerCase().replace(/\s+/g, '-')}">
                    <i class="${logoClass}"></i>
                </div>
                <div class="alt-info">
                    <h5>${alt}</h5>
                    <p>${getAltDescription(alt)}</p>
                </div>
            `;
            
            alternativesContainer.appendChild(altDiv);
        });
    }
    
    function getAltDescription(distroName) {
        const descs = {
            'Ubuntu': 'User-friendly, popular',
            'Fedora': 'Cutting-edge features',
            'Linux Mint': 'Windows-like experience',
            'Debian': 'Extremely stable',
            'Arch Linux': 'Complete customization',
            'Zorin OS': 'Windows/macOS familiar',
            'Elementary OS': 'Beautiful, macOS-like',
            'Pop!_OS': 'Great for developers',
            'Edubuntu': 'Educational focus',
            'Debian Edu': 'School deployment ready'
        };
        
        return descs[distroName] || 'Excellent alternative';
    }
    
    // E-Waste Calculator
    const machinesInput = document.getElementById('machines');
    const extendedYears = document.getElementById('extended-years');
    const costSavings = document.getElementById('cost-savings');
    const ewastePrevented = document.getElementById('ewaste-prevented');
    
    if (machinesInput) {
        machinesInput.addEventListener('input', updateCalculator);
        updateCalculator(); // Initial calculation
    }
    
    function updateCalculator() {
        const machines = parseInt(machinesInput.value) || 1;
        
        // Calculations
        const yearsExtended = Math.round(5 + (machines / 100)); // 5+ years
        const savings = machines * 1500; // €1500 per machine saved
        const ewaste = (machines * 0.05).toFixed(1); // 0.05 tons per machine
        
        // Update display
        extendedYears.textContent = yearsExtended;
        costSavings.textContent = savings.toLocaleString();
        ewastePrevented.textContent = ewaste;
    }
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentTestimonial = 0;
    
    // Show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Next testimonial
    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }
    
    // Previous testimonial
    function prevTestimonial() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) {
            prevIndex = testimonials.length - 1;
        }
        showTestimonial(prevIndex);
    }
    
    // Add event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 8000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.resistance-card, .sector-card, .video-card').forEach(el => {
        observer.observe(el);
    });
});