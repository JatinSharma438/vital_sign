document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('hero');
    const validationForm = document.getElementById('validationForm');
    const successBanner = document.getElementById('success-banner');

    // --- 1. GLOBAL UI: STACKING SCROLL EFFECT ---
    // This ensures the hero shrinks consistently across all pages
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            hero.classList.add('shrink');
        } else {
            hero.classList.remove('shrink');
        }
    });

    // --- 2. GLOBAL UI: TERMINAL TYPING EFFECT (Optional) ---
    // Makes the subtitle "flicker" like a real terminal on load
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.style.opacity = '0';
        setTimeout(() => {
            subtitle.style.transition = 'opacity 1.5s ease-in-out';
            subtitle.style.opacity = '1';
        }, 500);
    }

    // --- 3. GLOBAL LOGIC: FORM VALIDATION ---
    // This handles the Contact Page and any other standard forms
    if (validationForm) {
        validationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Define inputs to check
            const inputs = [
                { id: 'name', check: (v) => v.trim().length > 2 },
                { id: 'email', check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }
            ];

            let isFormValid = true;

            inputs.forEach(field => {
                const el = document.getElementById(field.id);
                if (!el) return; // Skip if element doesn't exist on this page

                const parent = el.parentElement;

                if (field.check(el.value)) {
                    parent.classList.add('success');
                    parent.classList.remove('error');
                } else {
                    parent.classList.add('error');
                    parent.classList.remove('success');
                    isFormValid = false;
                }
            });

            // If form is valid, trigger success protocol
            if (isFormValid) {
                if (successBanner) {
                    successBanner.style.display = 'block';
                    setTimeout(() => { 
                        successBanner.style.display = 'none'; 
                        validationForm.reset();
                        document.querySelectorAll('.input-group').forEach(g => g.classList.remove('success'));
                    }, 4000);
                }
            }
        });
    }
});