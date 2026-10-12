// =========================================================
// GLOBAL CONTACT PAGE JS
// Navbar / dropdown / footer logic comes from Contact.js
// =========================================================
(function () {
    'use strict';

    // ---------- CONFIG ----------
    const WHATSAPP_NUMBER = '917778048992'; // no "+"
    // const API_URL = 'https://techorses.com/api/global-inquiry'; 
    const API_URL = 'http://localhost:3000/global-inquiry';

    const WHATSAPP_BASE_MESSAGE =
        "Hello Techorses! I'm looking for reliable software & digital solutions for my business. " +
        "Could you please share more details about your services?";

    // ---------- ELEMENTS ----------
    const form = document.getElementById('inquiry-form');
    const nameInput = document.getElementById('gc-name');
    const emailInput = document.getElementById('gc-email');
    const phoneInput = document.getElementById('gc-phone');
    const serviceInput = document.getElementById('gc-service');
    const messageInput = document.getElementById('gc-message');
    const honeypot = document.getElementById('gc-website');
    const submitBtn = document.getElementById('gc-submit-btn');
    const waBtn = document.getElementById('gcWhatsappBtn');

    if (!form) return;

    // ---------- TOAST (uses showToast from Contact.js) ----------
    function toast(msg, type) {
        if (typeof showToast === 'function') {
            showToast(msg, type);
        } else {
            alert(msg);
        }
    }

    // ---------- WHATSAPP ----------
    function buildWhatsappUrl() {
        let text = WHATSAPP_BASE_MESSAGE;
        const service = serviceInput.value;
        if (service) {
            text += ' I am interested in: ' + service + '.';
        }
        return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
    }

    if (waBtn) {
        // set on load + refresh on click so selected service is included
        waBtn.href = buildWhatsappUrl();
        waBtn.addEventListener('click', function () {
            waBtn.href = buildWhatsappUrl();
        });
        serviceInput.addEventListener('change', function () {
            waBtn.href = buildWhatsappUrl();
        });
    }

    // ---------- LET'S TALK (navbar) + BECOME A CLIENT (footer) -> scroll to form ----------
    function scrollToForm(e) {
        if (e) e.preventDefault();

        // close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.blur-overlay');
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');

        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { nameInput.focus({ preventScroll: true }); }, 500);
    }

    const navLetsTalk = document.getElementById('navLetsTalk');
    if (navLetsTalk) {
        // Contact.js may set a tel: href on mobile, so force our behaviour
        navLetsTalk.addEventListener('click', scrollToForm, true);
    }

    const becomeClientBtn = document.querySelector('.footer-social-wrapper button');
    if (becomeClientBtn) {
        becomeClientBtn.addEventListener('click', scrollToForm);
    }

    // ---------- VALIDATION ----------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{7,16}$/; // global numbers allowed

    function setError(input, message) {
        const field = input.closest('.gc-field');
        const err = field.querySelector('.gc-error');
        field.classList.add('has-error');
        err.textContent = message;
    }

    function clearError(input) {
        const field = input.closest('.gc-field');
        const err = field.querySelector('.gc-error');
        field.classList.remove('has-error');
        if (err) err.textContent = '';
    }

    function validate() {
        let valid = true;
        [nameInput, emailInput, phoneInput].forEach(clearError);

        if (nameInput.value.trim().length < 2) {
            setError(nameInput, 'Please enter your name.');
            valid = false;
        }

        if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, 'Please enter a valid email address.');
            valid = false;
        }

        const phone = phoneInput.value.trim();
        const digits = phone.replace(/\D/g, '');
        if (!phoneRegex.test(phone) || digits.length < 7 || digits.length > 15) {
            setError(phoneInput, 'Please enter a valid phone number.');
            valid = false;
        }

        return valid;
    }

    // clear error while typing
    [nameInput, emailInput, phoneInput].forEach(function (input) {
        input.addEventListener('input', function () { clearError(input); });
    });

    // ---------- SUBMIT ----------
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // honeypot filled = bot, silently pretend success
        if (honeypot && honeypot.value.trim() !== '') {
            form.reset();
            return;
        }

        if (!validate()) {
            toast('Please fix the highlighted fields.', 'error');
            return;
        }

        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            service: serviceInput.value, // optional
            message: messageInput.value.trim() // optional
        };

        const btnText = submitBtn.querySelector('.btn-text');
        const loader = submitBtn.querySelector('.btn-loader');

        btnText.style.display = 'none';
        loader.style.display = 'inline-block';
        submitBtn.disabled = true;

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                const sound = document.getElementById('successSound');
                if (sound) sound.play().catch(function () { });
                toast('Thanks! We will get in touch shortly.', 'success');
                form.reset();
                if (waBtn) waBtn.href = buildWhatsappUrl();
            } else {
                toast(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (err) {
            console.error('Global inquiry error:', err);
            toast('Server error. Please try again later.', 'error');
        } finally {
            btnText.style.display = 'inline';
            loader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
})();