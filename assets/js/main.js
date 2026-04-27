document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // Theme Toggle Logic
    // =============================================
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
            // Sync other checkboxes (e.g. mobile drawer)
            themeCheckboxes.forEach(otherCb => {
                if (otherCb !== cb) otherCb.checked = cb.checked;
            });
        });
    });

    // =============================================
    // RTL Toggle Logic
    // =============================================
    const htmlEl = document.documentElement;
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlEl.setAttribute('dir', savedDir);

    // Update all RTL toggle button labels on page load
    function updateRTLButtons() {
        const currentDir = htmlEl.getAttribute('dir');
        document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
            btn.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
        });
    }
    updateRTLButtons();

    // Bind click on all RTL toggle buttons (desktop nav + mobile drawer)
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const newDir = htmlEl.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            htmlEl.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRTLButtons();
        });
    });

    // =============================================
    // Mobile Menu Logic
    // =============================================
    const hamburger = document.querySelector('.hamburger');
    const mobileDrawer = document.querySelector('.mobile-drawer');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileDrawer.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.className = mobileDrawer.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
        });
    }

    // Close drawer on link click
    if (mobileDrawer) {
        mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
                if (hamburger) hamburger.querySelector('i').className = 'ri-menu-line';
            });
        });
    }

    // =============================================
    // Fade-up Animation Observer
    // =============================================
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

    // =============================================
    // Back to Top Logic
    // =============================================
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="ri-arrow-up-line"></i>';

    // Only add to non-auth and non-dashboard pages
    const path = window.location.pathname.toLowerCase();
    const isExcludedPage = path.includes('login.html') ||
        path.includes('register.html') ||
        path.includes('dashboard');

    if (!isExcludedPage) {
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
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
    }

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
