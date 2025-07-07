// Magic UI Components for RehabCo

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                }
            });

            // Toggle the clicked item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                question.querySelector('.faq-toggle').textContent = '+';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.querySelector('.faq-toggle').textContent = '−';
            }
        });
    });

    // Active Nav Link Highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        let currentActive = null;
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                currentActive = entry.target.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if ((href === '' && currentActive === 'hero-section') || href === currentActive) {
                link.classList.add('active');
            }
        });

        // If no section is active (e.g., at the top), highlight "Home"
        if (!document.querySelector('.nav-links a.active')) {
             const homeLink = document.querySelector('.nav-links a[href="#"]');
             if (homeLink) {
                const heroSection = document.querySelector('.hero');
                const heroRect = heroSection.getBoundingClientRect();
                if(heroRect.top >= 0 && heroRect.bottom <= window.innerHeight) {
                    homeLink.classList.add('active');
                }
             }
        }

    }, observerOptions);

    sections.forEach(section => {
        // give hero section an id if it doesn't have one
        if (section.classList.contains('hero') && !section.id) {
            section.id = 'hero-section';
        }
        sectionObserver.observe(section);
    });
     // set home active by default
    document.querySelector('.nav-links a[href="#"]').classList.add('active');

});