// ===================================
// Theme Toggle
// ===================================
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

// Toggle theme function
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Add event listener to theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// ===================================
// Mobile Menu Toggle
// ===================================
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
function toggleMobileMenu() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('show');
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Add event listener to mobile menu toggle
navToggle.addEventListener('click', toggleMobileMenu);

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations (Reveal on Scroll)
// ===================================
const revealElements = document.querySelectorAll('.section, .timeline__item, .project-card, .testimonial, .blog-card');

// Add reveal class to elements
revealElements.forEach(element => {
    element.classList.add('reveal');
});

// Intersection Observer for scroll animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all reveal elements
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ===================================
// Project Modal
// ===================================
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalOverlay = document.querySelector('.modal__overlay');
const modalClose = document.querySelector('.modal__close');
const modalBody = document.getElementById('modalBody');

// Project data
const projectData = {
    project1: {
        title: 'Analytics Dashboard',
        description: 'Tableau de bord interactif pour la visualisation de données en temps réel avec graphiques dynamiques et rapports personnalisables.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
        features: [
            'Visualisation de données en temps réel',
            'Graphiques interactifs et personnalisables',
            'Rapports automatisés',
            'Tableaux de bord personnalisables',
            'Intégration avec multiples sources de données'
        ],
        link: '#'
    },
    project2: {
        title: 'E-commerce Platform',
        description: 'Plateforme e-commerce complète avec gestion des stocks, paiement intégré et système de recommandation intelligent.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        tags: ['Vue.js', 'Python', 'PostgreSQL', 'Stripe'],
        features: [
            'Gestion complète des stocks',
            'Paiement sécurisé avec Stripe',
            'Système de recommandation IA',
            'Panier et gestion des commandes',
            'Interface admin intuitive'
        ],
        link: '#'
    },
    project3: {
        title: 'Task Management App',
        description: 'Application de gestion de tâches collaborative avec fonctionnalités de kanban, notifications en temps réel et intégrations.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop',
        tags: ['React', 'Firebase', 'WebSocket', 'Redux'],
        features: [
            'Tableaux Kanban interactifs',
            'Collaboration en temps réel',
            'Notifications push',
            'Intégrations avec outils tiers',
            'Gestion de projets et équipes'
        ],
        link: '#'
    },
        project4: {
        title: 'Task Management App',
        description: 'Application de gestion de tâches collaborative avec fonctionnalités de kanban, notifications en temps réel et intégrations.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop',
        tags: ['React', 'Firebase', 'WebSocket', 'Redux'],
        features: [
            'Tableaux Kanban interactifs',
            'Collaboration en temps réel',
            'Notifications push',
            'Intégrations avec outils tiers',
            'Gestion de projets et équipes'
        ],
        link: '#'
    }
};

// Open modal
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="modal__image">
        <h2 class="modal__title">${project.title}</h2>
        <p class="modal__description">${project.description}</p>
        <div class="modal__tags">
            ${project.tags.map(tag => `<span class="modal__tag">${tag}</span>`).join('')}
        </div>
        <h3 class="modal__subtitle">Fonctionnalités</h3>
        <ul class="modal__features">
            ${project.features.map(feature => `<li><i data-feather="check"></i>${feature}</li>`).join('')}
        </ul>
        <a href="${project.link}" class="btn btn--primary">Voir le projet</a>
    `;
    
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Re-initialize feather icons
    feather.replace();
}

// Close modal
function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Add event listeners to project cards
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-modal');
        openModal(projectId);
    });
});

// Close modal on overlay click
modalOverlay.addEventListener('click', closeModal);

// Close modal on close button click
modalClose.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// ===================================
// Form Validation
// ===================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 2) {
        nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
        return false;
    }
    nameError.textContent = '';
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Veuillez entrer une adresse email valide';
        return false;
    }
    emailError.textContent = '';
    return true;
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message.length < 10) {
        messageError.textContent = 'Le message doit contenir au moins 10 caractères';
        return false;
    }
    messageError.textContent = '';
    return true;
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer le message';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }, 1500);
    }
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Initialize Feather Icons
// ===================================
feather.replace();

// ===================================
// Add CSS for modal content
// ===================================
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal__image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-md);
    }
    
    .modal__title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text);
    }
    
    .modal__description {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-md);
        line-height: var(--line-height);
    }
    
    .modal__tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-lg);
    }
    
    .modal__tag {
        padding: 4px 12px;
        background-color: var(--color-yellow);
        color: var(--color-black);
        border-radius: var(--radius-full);
        font-size: var(--font-size-sm);
        font-weight: 500;
    }
    
    .modal__subtitle {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text);
    }
    
    .modal__features {
        list-style: none;
        margin-bottom: var(--spacing-lg);
    }
    
    .modal__features li {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-xs) 0;
        color: var(--color-text-secondary);
    }
    
    .modal__features i {
        color: var(--color-yellow);
        width: 20px;
        height: 20px;
    }
    
    .nav__link.active {
        color: var(--color-yellow);
    }
    
    .nav__link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(modalStyles);

// ===================================
// Console Message
// ===================================
console.log('Portfolio website loaded successfully! 🚀');
