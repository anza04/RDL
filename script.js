// ===================================
// RDL Capiago Intimiano - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initCounters();
    initMobileMenu();
    initContactForm();
    initCustomCursor();
    initScrollProgress();
    initMagneticButtons();
    initCardTilt();
    // initScrollSkew();
});

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// ===================================
// Mobile Menu
// ===================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===================================
// Custom Cursor with Lag Effect
// ===================================
function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';

        if (!isVisible) {
            isVisible = true;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
            ringX = mouseX;
            ringY = mouseY;
        }
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        isVisible = true;
    });

    // Click ripple
    document.addEventListener('mousedown', () => {
        document.body.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-click');
    });

    // Hover state on interactive elements
    const interactives = document.querySelectorAll('a, button, .player-card, .sponsor-card, .feature-card, .stat, .staff-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Animate ring with smooth lag (lerp)
    const lerpFactor = 0.11;
    function animateRing() {
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    dot.style.opacity = '0';
    ring.style.opacity = '0';
}

// ===================================
// Scroll Progress Bar
// ===================================
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}

// ===================================
// Magnetic Buttons
// ===================================
function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.btn, .magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * 0.28;
            const dy = (e.clientY - cy) * 0.28;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ===================================
// Card 3D Tilt on Hover
// ===================================
function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.player-card, .feature-card, .sponsor-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -8;
            const rotateY = ((x - cx) / cx) * 8;
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.4s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease';
        });
    });
}

// ===================================
// Scroll Velocity Skew Effect
// ===================================
function initScrollSkew() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let currentSkew = 0;
    const skewTarget = () => 0;
    let velocity = 0;

    const sections = document.querySelectorAll('.hero-content, .about-grid, .features-grid, .players-grid');

    function applySkew() {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY;
        lastScrollY = scrollY;

        velocity += delta * 0.04;
        velocity *= 0.88;

        const skew = Math.max(-3, Math.min(3, velocity));

        sections.forEach(el => {
            el.style.transform = `skewY(${skew}deg)`;
            el.style.transition = 'transform 0.1s linear';
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(applySkew);
            ticking = true;
        }
    }, { passive: true });
}

// ===================================
// Scroll Reveal Animations
// ===================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal-text, .reveal-up, .reveal-left, .reveal-right, .reveal-scale'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// ===================================
// Counter Animation
// ===================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    };
    update();
}

// ===================================
// Contact Form Handler
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Messaggio Inviato! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #00e5ff, #00b0cc)';
            form.reset();

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('🏀 RDL Capiago Intimiano - Sito caricato correttamente!');
