/**
 * MAX TECH - MAIN JAVASCRIPT
 * Handles section loading, animations, and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. STICKY NAVBAR LOGIC
    const handleNavbar = () => {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        window.scrollY > 100 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    };

    window.addEventListener('scroll', handleNavbar);

    // 2. SCROLL REVEAL LOGIC
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const initReveal = () => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    // 3. TECH TABS LOGIC
    const initTabs = () => {
        const triggers = document.querySelectorAll('.tab-trigger');
        const contents = document.querySelectorAll('.tab-content');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetId = trigger.getAttribute('data-tab');
                
                triggers.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                trigger.classList.add('active');
                const targetPane = document.getElementById(targetId);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    };

    // 4. MOUSE PARALLAX
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        
        const b1 = document.getElementById('blob-1');
        const b2 = document.getElementById('blob-2');
        
        if (b1) b1.style.transform = `translate(${x}px, ${y}px)`;
        if (b2) b2.style.transform = `translate(${-x}px, ${-y}px)`;
    });

    // 5. SMOOTH SCROLL FIX
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = target.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Initialize all components
    initReveal();
    initTabs();
    initSmoothScroll();
});

