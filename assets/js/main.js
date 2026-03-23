document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    const themeCheckboxes = document.querySelectorAll('.theme-checkbox');
    themeCheckboxes.forEach(cb => {
        cb.checked = savedTheme === 'dark';
        cb.addEventListener('change', () => {
            const newTheme = cb.checked ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            // Sync other checkboxes if many exist (like mobile drawer)
            themeCheckboxes.forEach(otherCb => {
                if (otherCb !== cb) otherCb.checked = cb.checked;
            });
        });
    });

    function updateThemeIcon(theme) {
        themeToggle.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
            }
        });
    }

    // Mobile Menu logic
    const hamburger = document.querySelector('.hamburger');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerThemeToggle = mobileDrawer.querySelector('.theme-toggle');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileDrawer.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.className = mobileDrawer.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
        });
    }

    // Close drawer on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            hamburger.querySelector('i').className = 'ri-menu-line';
        });
    });

    // Fade-up animation observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
