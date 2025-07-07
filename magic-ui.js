// Magic UI Components for RehabCo

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle the clicked item
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });

    // Shimmer Button Effect
    const shimmerButtons = document.querySelectorAll('.shimmer-button');

    shimmerButtons.forEach(button => {
        const shimmerColor = button.getAttribute('data-shimmer-color') || '#ffffff';
        const backgroundColor = button.getAttribute('data-background') || '#00C4CC';
        
        button.style.backgroundColor = backgroundColor;
        button.style.color = shimmerColor === '#ffffff' ? '#ffffff' : '#006B6B';

        button.addEventListener('mousemove', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            
            const highlight = document.createElement('span');
            highlight.style.position = 'absolute';
            highlight.style.top = y + 'px';
            highlight.style.left = x + 'px';
            highlight.style.pointerEvents = 'none';
            highlight.style.width = '10px';
            highlight.style.height = '10px';
            highlight.style.borderRadius = '50%';
            highlight.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            highlight.style.transform = 'translate(-50%, -50%)';
            highlight.style.animation = 'ripple 0.8s ease-out';
            
            this.appendChild(highlight);
            
            setTimeout(() => {
                highlight.remove();
            }, 800);
        });
    });

    // Ripple Effect
    document.querySelectorAll('.ripple-effect').forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.backgroundColor = 'rgba(0, 196, 204, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transition = 'all 0.5s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = Math.max(rect.width, rect.height) * 2 + 'px';
                ripple.style.height = Math.max(rect.width, rect.height) * 2 + 'px';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });

    // Scroll Animation
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ripple {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0.7;
            }
            100% {
                transform: translate(-50%, -50%) scale(100);
                opacity: 0;
            }
        }
        
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // FAQ Toggle Icons
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle the 'active' class on the clicked item
            item.classList.toggle('active');
            
            // Update the toggle icon
            const toggle = item.querySelector('.faq-toggle');
            if (item.classList.contains('active')) {
                toggle.textContent = '×';
            } else {
                toggle.textContent = '+';
            }
        });
    });
}); 