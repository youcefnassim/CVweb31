// Project data for gallery
const projectsData = {
    'educmed': {
        images: [
            'img/20.jpg',
            'img/21.jpg',
            'img/22.jpg',
            'img/23.jpg'
        ],
        description: 'Plateforme éducative médicale complète avec système de cours en ligne et suivi des progrès.'
    },
    'gym131': {
        images: [
            'img/30.jpg',
            'img/31.jpg',
            'img/32.jpg',
            'img/33.jpg'
            
        ],
        description: 'Site web moderne pour une salle de sport avec réservation en ligne et gestion des abonnements.'
    },
    'coffeeshop': {
        images: [
            'img/11.jpg',
            'img/12.jpg',
            'img/14.jpg',
            'img/15.jpg'
        ],
        description: 'Site vitrine élégant pour un café boutique avec menu interactif et système de réservation.'
    },
    'dncschool': {
        images: [
            'img/school1.jpg',
            'img/school2.jpg',
            'img/school3.jpg',
            'img/school4.jpg'    
        ],
        description: 'Site web éducatif moderne pour DNC School avec système de gestion de contenu et espace étudiant.'
    },
    'dentilus3': {
        images: [
            'img/pic132.png',
            'img/pic133.png',
            'img/pic134.png',
            'img/pic135.png'
        ],
        description: 'Site web professionnel pour cabinet dentaire avec présentation des services et prise de contact.'
    }
};

// Changement de couleur du header au scroll
window.onscroll = () => {
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Fermeture du menu mobile lors du scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Sélecteurs header/menu
const header = document.querySelector('.header');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

// Theme and Language Toggle Elements
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');

if (menuIcon && navbar) {
    // Create Overlay element
    const navOverlay = document.createElement('div');
    navOverlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); z-index:998; display:none; opacity:0; transition:opacity 0.3s ease;';
    document.body.appendChild(navOverlay);

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        const isActive = navbar.classList.contains('active');
        navOverlay.style.display = isActive ? 'block' : 'none';
        setTimeout(() => navOverlay.style.opacity = isActive ? '1' : '0', 10);
    };

    navOverlay.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        navOverlay.style.opacity = '0';
        setTimeout(() => navOverlay.style.display = 'none', 300);
    };
}

// ========== CUSTOM CURSOR ==========
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
const cursorDot = document.createElement('div');
cursorDot.classList.add('custom-cursor-dot');
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// ========== MICRO-INTERACTIONS (SOUND EFFECTS) ==========
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration, vol) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

// Hover effect (subtle blip)
function playHoverSound() {
    playTone(400, 'sine', 0.1, 0.05);
}

// Click effect (satisfying pop)
function playClickSound() {
    playTone(600, 'triangle', 0.15, 0.1);
}

// Add hover/click sounds to interactive elements
const interactables = document.querySelectorAll('a, button, .portfolio-box, .services-box, input, textarea');
interactables.forEach(el => {
    // Cursor hover
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        playHoverSound();
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    
    // Click sound
    el.addEventListener('click', () => {
        playClickSound();
    });
});

// ========== THEME TOGGLE (DARK/LIGHT MODE) ==========
// Default to dark on first visit, respect saved preference afterwards
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
if(themeToggle) {
    themeToggle.innerHTML = currentTheme === 'dark' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        themeToggle.innerHTML = newTheme === 'dark' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    });
}

// ========== MULTI-LANGUAGE SUPPORT ==========
const translations = {
    fr: {
        nav_home: "Accueil",
        nav_about: "À Propos",
        nav_resume: "CV",
        nav_services: "Services",
        nav_portfolio: "Portfolio",
        nav_offers: "Offres",
        nav_contact: "Contact",
        achieve_projects: "Projets Réalisés",
        achieve_lines: "Lignes de Code",
        achieve_exp: "Ans d'Expérience",
        achieve_coffee: "Tasses de Café",
        achieve_clients: "Clients Satisfaits",
        achieve_certs: "Certifications",
        achieve_commits: "Commits GitHub",
        achieve_design: "Heures de Design",
        achieve_langs: "Langages Maîtrisés",
        achieve_oss: "Open Source"
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_resume: "Resume",
        nav_services: "Services",
        nav_portfolio: "Portfolio",
        nav_offers: "Offers",
        nav_contact: "Contact",
        achieve_projects: "Projects Completed",
        achieve_lines: "Lines of Code",
        achieve_exp: "Years of Experience",
        achieve_coffee: "Cups of Coffee",
        achieve_clients: "Happy Clients",
        achieve_certs: "Certifications",
        achieve_commits: "GitHub Commits",
        achieve_design: "Design Hours",
        achieve_langs: "Languages Mastered",
        achieve_oss: "Open Source"
    }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    if(langToggle) {
        langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
    }
    
    // Update text content for elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// Initialize Language
setLanguage(currentLang);

if(langToggle) {
    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'fr' ? 'en' : 'fr');
    });
}

// Animation de texte (only on pages that have the element)
if (document.querySelector('.multiple-text')) {
    const typed = new Typed('.multiple-text', {
        strings: ['Designer UX/UI', 'Développeur Frontend', 'Web Designer', 'Graphic Designer'],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });
}

// Animation au scroll avec Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Handle Counters
            if (entry.target.classList.contains('counter')) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2500; // ms
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out quadratic
                    const easeProgress = 1 - (1 - progress) * (1 - progress);
                    const current = Math.floor(easeProgress * target);
                    
                    if (target >= 1000) {
                        entry.target.innerText = current.toLocaleString();
                    } else {
                        entry.target.innerText = current;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = (target >= 1000 ? target.toLocaleString() : target) + (target > 20 ? "+" : "");
                    }
                };
                requestAnimationFrame(updateCounter);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Éléments à animer
const scrollElements = document.querySelectorAll('.reveal, .resume-content, .services-box, .portfolio-box, .counter');
scrollElements.forEach(el => {
    animateOnScroll.observe(el);
});

// Effet de révélation amélioré
function revealSections() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealSections);
revealSections(); // Initial call

// Animation des compétences
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 150 * index);
    });
}

// Animation de la timeline CV
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.resume-content');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 * index);
    });
}

// Gestionnaire d'événements pour le téléchargement du CV
document.querySelectorAll('.download-options .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Ici vous pouvez ajouter la logique de téléchargement
        alert('Téléchargement du CV en ' + (this.querySelector('i').classList.contains('fa-file-pdf') ? 'PDF' : 'Word'));
    });
});
// Script pour le bouton d'impression
const printCvBtn = document.getElementById('print-cv');
if (printCvBtn) {
    printCvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const pdfUrl = 'img/BENMAAMAR YOUSOSOUF NASSIM CV.pdf';
        const printWindow = window.open(pdfUrl, '_blank');
        if (printWindow) {
            printWindow.onload = function() {
                setTimeout(function() {
                    printWindow.print();
                }, 500);
            };
        }
    });
}
// Initialisation des animations
document.addEventListener('DOMContentLoaded', () => {
    // Reveal body for page transition
    document.body.classList.add('page-loaded');

    // Délai pour l'animation du contenu principal
    setTimeout(() => {
        const homeContent = document.querySelector('.home-content');
        if(homeContent) homeContent.classList.add('loaded');
    }, 500);
    
    // Animation des compétences
    if (document.querySelector('.skill-items')) {
        animateSkills();
    }
    
    // Animation de la timeline CV
    if (document.querySelector('.resume-box')) {
        animateTimeline();
    }
    
    // Initialisation des tooltips (si vous en ajoutez)
    initTooltips();

    // Initialisation des particules
    initParticles();

    // Achievements Gallery Navigation Buttons
    const achieveSlider = document.getElementById('achievements');
    const prevBtn = document.getElementById('achievePrev');
    const nextBtn = document.getElementById('achieveNext');

    if (achieveSlider && prevBtn && nextBtn) {
        const scrollAmount = 310; // roughly one card width + gap
        prevBtn.addEventListener('click', () => {
            achieveSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            achieveSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});

// Standard link navigation is used to prevent mobile routing issues.

// Fonction pour les tooltips (optionnelle)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }
    
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// Effet de particules amélioré (optionnel)
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        'z-index': '-1',
        'pointer-events': 'none'
    });
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    resizeCanvas();
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    // Création des particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(canvas));
    }
    
    function createParticle(canvas) {
        const size = Math.random() * 3 + 1;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            baseSize: size,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `rgba(0, 171, 240, ${Math.random() * 0.3 + 0.1})`,
            density: Math.random() * 30 + 1
        };
    }
    
    function connectParticles() {
        let opacity;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    opacity = 1 - distance / 100;
                    ctx.strokeStyle = `rgba(0, 171, 240, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Dessiner les particules
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Mouvement
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Rebond sur les bords
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Interaction avec la souris
            const mouse = { x: null, y: null };
            
            window.addEventListener('mousemove', (event) => {
                mouse.x = event.x;
                mouse.y = event.y;
            });
            
            if (mouse.x && mouse.y) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    p.size = p.baseSize + (100 - distance) / 10;
                    p.x -= dx / 20;
                    p.y -= dy / 20;
                } else if (p.size > p.baseSize) {
                    p.size -= 0.1;
                }
            }
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    animateParticles();
}

// Initialisation propre de la galerie pour afficher la première image par défaut
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    const modalTitle = document.querySelector('.modal-title');
    const mainImage = document.getElementById('mainGalleryImage');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const projectDescription = document.getElementById('projectDescription');
    const closeModal = document.querySelector('.close-modal');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');

    let currentProject = null;
    let currentImageIndex = 0;

    // Ouvrir la modale de galerie
    document.querySelectorAll('.gallery-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openGallery(projectId);
        });
    });

    // Fermer la modale
    if (closeModal) closeModal.addEventListener('click', closeGallery);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeGallery();
    });

    // Navigation entre les images
    if (prevButton) prevButton.addEventListener('click', showPrevImage);
    if (nextButton) nextButton.addEventListener('click', showNextImage);

    function openGallery(projectId) {
        if (!projectsData[projectId]) return;

        currentProject = projectId;
        currentImageIndex = 0;

        const projectName = document.querySelector(`[data-project="${projectId}"]`).closest('.portfolio-layer').querySelector('h4').textContent;
        if (modalTitle) modalTitle.textContent = `Galerie - ${projectName}`;

        loadImages(projectsData[projectId].images);
        if (projectDescription) projectDescription.textContent = projectsData[projectId].description;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function loadImages(images) {
        thumbnailContainer.innerHTML = '';
        totalImagesSpan.textContent = images.length;

        images.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imageSrc;
            thumbnail.alt = `Miniature ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');
            thumbnail.addEventListener('click', () => showImage(index));
            thumbnailContainer.appendChild(thumbnail);
        });

        // Afficher la première image par défaut
        showImage(0);
    }

    function showImage(index) {
        if (!currentProject || !projectsData[currentProject]) return;

        const images = projectsData[currentProject].images;
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;

        currentImageIndex = index;
        
        // Show loading state
        mainImage.style.opacity = '0.5';
        
        // Create a new image to preload
        const img = new Image();
        img.onload = function() {
            // Once image is loaded, update the main image
            mainImage.src = this.src;
            mainImage.style.opacity = '1';
            currentImageSpan.textContent = index + 1;
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        };
        
        // Set the source to start loading
        img.src = images[index];
    }

    function showPrevImage() { showImage(currentImageIndex - 1); }
    function showNextImage() { showImage(currentImageIndex + 1); }

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Gestes tactiles
    let touchStartX = 0;
    let touchEndX = 0;
    mainImage.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    mainImage.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const minSwipeDistance = 50;
        if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) showNextImage();
        if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) showPrevImage();
    }, false);
});

// Gestion du formulaire de contact


// Animation pour les champs du formulaire
document.querySelectorAll('.input, .textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        // Animation des champs de formulaire
        const formFields = contactForm.querySelectorAll('.input, .textarea');
        
        formFields.forEach(field => {
            // Vérifier si le champ a déjà une valeur au chargement
            if (field.value !== '') {
                field.parentElement.classList.add('focused');
            }
            
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Gestion de la soumission du formulaire
        contactForm.addEventListener('submit', function(e) {
            // Validation basique
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                    
                    field.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.style.borderColor = '';
                        }
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            e.preventDefault();
            
            // Animation de chargement
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Envoi en cours... <i class="bx bx-loader-alt bx-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // URL du script Google Apps Script à remplacer par la vôtre
            const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/VOTRE_URL_DE_SCRIPT_ICI/exec';

            fetch(GOOGLE_SHEETS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(() => {
                // Redirection vers la page de remerciement après envoi
                window.location.href = 'merci.html';
            }).catch((error) => {
                console.error('Erreur lors de l\'envoi du formulaire vers Google Sheets', error);
                alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// ========== CHATBOT FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotNotification = document.querySelector('.chatbot-notification');

    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
            if (chatbotContainer.classList.contains('active')) {
                chatbotNotification.style.display = 'none';
                chatbotInput.focus();
            }
        });
    }

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
    }

    // Chatbot responses database
    const responses = {
        greetings: [
            "Bonjour ! Comment puis-je vous aider ?",
            "Salut ! Je suis là pour répondre à vos questions.",
            "Hello ! Que puis-je faire pour vous aujourd'hui ?"
        ],
        services: [
            "Je propose plusieurs services : Développement Web, Design Graphique, et UI/UX Design. Vous pouvez voir les détails dans la section Services.",
            "Mes services incluent la création de sites web modernes, le design graphique, et la conception d'interfaces utilisateur. Consultez la section Services pour plus d'informations."
        ],
        pricing: [
            "Nos tarifs commencent à 15 000 DA pour un site One Page, 25 000 DA pour un site vitrine, et sur devis pour les projets professionnels. Consultez la section Offres pour plus de détails.",
            "Les prix varient selon le type de projet. Site One Page : 15 000 DA, Site Vitrine : 25 000 DA, Site Professionnel : sur devis. Visitez la section Offres pour en savoir plus."
        ],
        portfolio: [
            "Vous pouvez voir mes projets dans la section Portfolio. J'ai travaillé sur Educmed, Gym131, CoffeeShop, DNC School, et Dentilus3.",
            "Mes derniers projets incluent des sites web pour des entreprises médicales, des salles de sport, des cafés, et des écoles. Consultez la section Portfolio pour les voir."
        ],
        contact: [
            "Vous pouvez me contacter via le formulaire de contact sur cette page, ou via mes réseaux sociaux (Facebook, LinkedIn, Instagram).",
            "Pour me contacter, utilisez le formulaire dans la section Contact ou mes réseaux sociaux affichés sur la page d'accueil."
        ],
        experience: [
            "J'ai 1 an d'expérience en développement frontend et design UX/UI. Je suis spécialisé dans React, Vue.js, et les interfaces modernes.",
            "Avec 1 an d'expérience, je me concentre sur le développement frontend et le design d'interfaces utilisateur modernes et intuitives."
        ],
        skills: [
            "Mes compétences incluent HTML5, CSS3, JavaScript, React, Figma, et UI/UX Design. Vous pouvez voir mes compétences dans la section À Propos.",
            "Je maîtrise les technologies web modernes comme React, JavaScript, et les outils de design comme Figma. Consultez la section À Propos pour plus de détails."
        ],
        cv: [
            "Vous pouvez télécharger mon CV dans la section CV. Il est disponible en format PDF.",
            "Mon CV est disponible dans la section CV. Vous pouvez le visualiser et le télécharger en format PDF."
        ],
        default: [
            "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ? Vous pouvez aussi me demander sur mes services, tarifs, portfolio, ou comment me contacter.",
            "Désolé, je n'ai pas compris. Essayez de me poser une question sur mes services, mes tarifs, mon portfolio, ou comment me contacter.",
            "Je peux vous aider avec des informations sur mes services, tarifs, portfolio, expérience, ou comment me contacter. Que souhaitez-vous savoir ?"
        ]
    };

    // Function to get response based on user input
    function getResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        
        // Greetings
        if (input.match(/bonjour|salut|hello|hi|hey|bonsoir|bonne nuit/)) {
            return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        }
        
        // Services
        if (input.match(/service|que fais|que propose|offre|peux.*faire|compétence/)) {
            return responses.services[Math.floor(Math.random() * responses.services.length)];
        }
        
        // Pricing
        if (input.match(/prix|tarif|coût|combien|devis|budget|payer/)) {
            return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
        }
        
        // Portfolio
        if (input.match(/portfolio|projet|réalisation|travail|création|exemple/)) {
            return responses.portfolio[Math.floor(Math.random() * responses.portfolio.length)];
        }
        
        // Contact
        if (input.match(/contact|joindre|contacter|email|téléphone|adresse|réseau/)) {
            return responses.contact[Math.floor(Math.random() * responses.contact.length)];
        }
        
        // Experience
        if (input.match(/expérience|année|depuis|début|carrière/)) {
            return responses.experience[Math.floor(Math.random() * responses.experience.length)];
        }
        
        // Skills
        if (input.match(/compétence|technologie|maîtrise|sait|connais|langage|framework/)) {
            return responses.skills[Math.floor(Math.random() * responses.skills.length)];
        }
        
        // CV
        if (input.match(/cv|curriculum|résumé|télécharger.*cv/)) {
            return responses.cv[Math.floor(Math.random() * responses.cv.length)];
        }
        
        // Default
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }

    // Function to add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = isUser ? '<i class="bx bx-user"></i>' : '<i class="bx bx-bot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to send message
    function sendMessage() {
        const userInput = chatbotInput.value.trim();
        if (!userInput) return;
        
        // Add user message
        addMessage(userInput, true);
        chatbotInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const botResponse = getResponse(userInput);
            addMessage(botResponse, false);
        }, 500);
    }

    // Event listeners
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Show notification after 3 seconds if chatbot is closed
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            chatbotNotification.style.display = 'block';
        }
    }, 3000);
});

// ========== INTERACTIVE TERMINAL ==========
document.addEventListener('DOMContentLoaded', () => {
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const termBody = document.getElementById('terminal-body');

    if (!termInput || !termOutput) return;

    // Focus input when clicking anywhere in the terminal
    termBody.addEventListener('click', () => {
        termInput.focus();
    });

    const commands = {
        help: "Available commands:<br>- <span style='color: #61afef'>about</span>: Show information about me<br>- <span style='color: #61afef'>skills</span>: List my technical skills<br>- <span style='color: #61afef'>projects</span>: Quick link to my portfolio<br>- <span style='color: #61afef'>clear</span>: Clear the terminal",
        about: "Hi! I'm Youcef Nassim, a Frontend Developer and UI/UX Designer passionate about building beautiful, responsive, and user-centric web applications.",
        skills: "<span style='color: #e5c07b'>Languages:</span> HTML, CSS, JavaScript<br><span style='color: #e5c07b'>Frameworks:</span> React, Vue.js, CodeIgniter<br><span style='color: #e5c07b'>Tools:</span> Git, GitHub, Figma, VS Code",
        projects: "Type '<span style='color: #98c379'>window.location.href=\"Portfolio.html\"</span>' or just click the 'Portfolio' link in the navbar to see my work!",
        clear: ""
    };

    termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const val = this.value.trim().toLowerCase();
            if (val === '') return;

            // Echo input
            termOutput.innerHTML += `<br><span style="color: #e5c07b;">visitor@portfolio:~$</span> ${val}<br>`;

            // Process command
            if (val === 'clear') {
                termOutput.innerHTML = '';
            } else if (commands[val]) {
                termOutput.innerHTML += `<span style="color: #abb2bf;">${commands[val]}</span><br>`;
            } else {
                termOutput.innerHTML += `<span style="color: #ef4444;">Command not found: ${val}. Type 'help' for available commands.</span><br>`;
            }

            // Reset input and scroll to bottom
            this.value = '';
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
});

// ========== 1. SCROLL PROGRESS BAR ==========
(function() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#00abf0,#0070ff);z-index:99999;transition:width 0.1s linear;border-radius:0 2px 2px 0;box-shadow:0 0 8px rgba(0,171,240,0.7);';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = scrolled + '%';
    });
})();

// ========== 2. SMOOTH BACK TO TOP BUTTON ==========
(function() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    btn.setAttribute('aria-label', 'Retour en haut');
    btn.style.cssText = 'position:fixed;bottom:9rem;right:2rem;width:4.5rem;height:4.5rem;background:var(--main-color);color:white;border:none;border-radius:50%;font-size:2.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9998;opacity:0;transform:translateY(20px);transition:all 0.3s ease;box-shadow:0 4px 15px rgba(0,171,240,0.4);';
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.style.opacity = '1'; btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0'; btn.style.transform = 'translateY(20px)';
        }
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-4px)');
    btn.addEventListener('mouseleave', () => btn.style.transform = window.scrollY > 400 ? 'translateY(0)' : 'translateY(20px)');
})();

// ========== 3. CURSOR TRAIL EFFECT ==========
(function() {
    const trails = [];
    const TRAIL_COUNT = 8;
    for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = document.createElement('div');
        const size = 10 - i;
        dot.style.cssText = `position:fixed;border-radius:50%;pointer-events:none;z-index:99990;width:${size}px;height:${size}px;background:rgba(0,171,240,${0.6 - i * 0.07});transform:translate(-50%,-50%);transition:opacity 0.3s;`;
        document.body.appendChild(dot);
        trails.push({ el: dot, x: 0, y: 0 });
    }
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    function animateTrail() {
        let x = mouseX, y = mouseY;
        trails.forEach((trail, i) => {
            trail.el.style.left = x + 'px';
            trail.el.style.top = y + 'px';
            const next = trails[i + 1] || trails[0];
            x += (next.x - x) * 0.5;
            y += (next.y - y) * 0.5;
            trail.x = x; trail.y = y;
        });
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
})();

// ========== 4. THEME TOGGLE ICON ANIMATION ==========
(function() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    toggle.addEventListener('click', () => {
        toggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => toggle.style.transform = 'rotate(0deg) scale(1)', 400);
    });
})();

// ========== 5. MOBILE SWIPE GESTURE FOR SIDEBAR ==========
(function() {
    let startX = 0;
    document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        const nav = document.querySelector('.navbar');
        const icon = document.querySelector('#menu-icon');
        if (!nav) return;
        if (diff > 60 && startX < 40) {
            nav.classList.add('active');
            if (icon) icon.classList.add('bx-x');
        } else if (diff < -60 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (icon) icon.classList.remove('bx-x');
        }
    }, { passive: true });
})();

// ========== 6. COPY EMAIL BUTTON WITH TOAST ==========
(function() {
    const email = 'benmaamar.nassim@gmail.com';
    const existing = document.querySelector('.contact-section-actions, .copy-email-btn');
    if (existing || !document.querySelector('.contact')) return;

    const toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.textContent = '✓ Email copié !';
    toast.style.cssText = 'position:fixed;bottom:6rem;left:50%;transform:translateX(-50%) translateY(20px);background:#00abf0;color:white;padding:1rem 2.5rem;border-radius:5rem;font-size:1.4rem;font-weight:600;z-index:99999;opacity:0;transition:all 0.4s ease;pointer-events:none;';
    document.body.appendChild(toast);

    const btn = document.createElement('button');
    btn.className = 'copy-email-btn';
    btn.innerHTML = '<i class="bx bx-copy"></i> Copier mon email';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:0.8rem;margin-top:2rem;padding:1.2rem 2.5rem;background:transparent;border:2px solid var(--main-color);color:var(--main-color);border-radius:5rem;font-size:1.5rem;font-weight:600;cursor:pointer;transition:all 0.3s ease;';
    btn.addEventListener('mouseenter', () => { btn.style.background = 'var(--main-color)'; btn.style.color = 'white'; });
    btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; btn.style.color = 'var(--main-color)'; });
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(email).then(() => {
            toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)';
            setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)'; }, 2500);
        });
    });

    const form = document.querySelector('.contact form');
    if (form) form.parentNode.insertBefore(btn, form);
})();

// ========== 7. LAZY LOADING IMAGES ==========
(function() {
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
})();

// ========== 8. "CURRENTLY WORKING ON" BADGE ==========
(function() {
    if (!document.querySelector('.home')) return;
    const badge = document.createElement('div');
    badge.className = 'working-badge';
    badge.innerHTML = '<span class="badge-dot"></span> En train de travailler sur un nouveau projet';
    badge.style.cssText = 'display:inline-flex;align-items:center;gap:0.8rem;background:rgba(0,171,240,0.1);border:1px solid rgba(0,171,240,0.3);border-radius:5rem;padding:0.6rem 1.5rem;font-size:1.3rem;color:var(--main-color);margin-bottom:1.5rem;';
    const dot = badge.querySelector('.badge-dot');
    dot.style.cssText = 'width:8px;height:8px;background:#22c55e;border-radius:50%;animation:badgePulse 1.5s infinite;flex-shrink:0;';
    if (!document.querySelector('#badge-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'badge-pulse-style';
        style.textContent = '@keyframes badgePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}';
        document.head.appendChild(style);
    }
    const h1 = document.querySelector('.home-content h1');
    if (h1) h1.parentNode.insertBefore(badge, h1);
})();

// ========== 9. SKILLS PROGRESS BAR ANIMATION ==========
(function() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.skill-bar');
                if (bar) {
                    const target = bar.getAttribute('data-width') || bar.style.width || '80%';
                    bar.style.width = '0%';
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4,0,0.2,1)';
                    setTimeout(() => { bar.style.width = target; }, 100);
                    skillObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.3 });
    skillItems.forEach(item => skillObserver.observe(item));
})();

// ========== 10. ACTIVE NAV AUTO-HIGHLIGHT ==========
(function() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    const navLinks = document.querySelectorAll('.navbar a');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') && link.getAttribute('href').includes('#' + entry.target.id)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(s => sectionObserver.observe(s));
})();
