/* ==============================================
   script.js — Vaishnavi Dwivedi Portfolio
   Small, dependency-free interactions only.
   ============================================== */

(function () {
  'use strict';

  const html = document.documentElement;
  const body = document.body;
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const backToTopBtn = document.getElementById('backToTop');
  const contactEmail = 'dwivedivaishnavi5200@gmail.com';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (themeBtn) {
      const next = theme === 'dark' ? 'light' : 'dark';
      themeBtn.setAttribute('aria-label', `Switch to ${next} theme`);
      themeBtn.title = `Switch to ${next} theme`;
    }
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  }

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('portfolio-theme') || 'dark'; } catch (_) {}
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  function openNav() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    body.style.overflow = '';
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.contains('open') ? closeNav() : openNav();
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const selector = link.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[data-section]');
  let scrollTicking = false;

  function updateScrollUI() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 500);

    let activeId = sections.length ? sections[0].id : '';
    const marker = window.scrollY + (navbar ? navbar.offsetHeight : 80) + 90;
    sections.forEach(function (section) {
      if (section.offsetTop <= marker) activeId = section.id;
    });
    navItems.forEach(function (item) {
      const active = item.dataset.section === activeId;
      item.classList.toggle('active', active);
      active ? item.setAttribute('aria-current', 'page') : item.removeAttribute('aria-current');
    });
    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  }, { passive: true });
  updateScrollUI();

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, instance) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const emailText = document.getElementById('emailText');

  async function copyEmail() {
    const email = emailText ? emailText.textContent.trim() : contactEmail;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      if (copyBtnText) copyBtnText.textContent = 'Copied!';
    } catch (_) {
      if (copyBtnText) copyBtnText.textContent = 'Copy failed';
    }
    window.setTimeout(function () {
      if (copyBtnText) copyBtnText.textContent = 'Copy';
    }, 1800);
  }
  if (copyEmailBtn) copyEmailBtn.addEventListener('click', copyEmail);

  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const formSuccess = document.getElementById('formSuccess');

  function field(id) { return document.getElementById(id); }
  function errorNode(id) { return document.getElementById(`${id}-error`); }
  function clearError(id) {
    const input = field(id);
    const error = errorNode(id);
    if (input) { input.classList.remove('error'); input.removeAttribute('aria-invalid'); }
    if (error) error.textContent = '';
  }
  function showError(id, message) {
    const input = field(id);
    const error = errorNode(id);
    if (input) { input.classList.add('error'); input.setAttribute('aria-invalid', 'true'); }
    if (error) error.textContent = message;
  }

  ['cname', 'cemail', 'cmessage'].forEach(function (id) {
    const input = field(id);
    if (input) input.addEventListener('input', function () { clearError(id); });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = field('cname') ? field('cname').value.trim() : '';
      const email = field('cemail') ? field('cemail').value.trim() : '';
      const subject = field('csubject') ? field('csubject').value.trim() : '';
      const message = field('cmessage') ? field('cmessage').value.trim() : '';
      let valid = true;

      ['cname', 'cemail', 'cmessage'].forEach(clearError);
      if (name.length < 2) { showError('cname', 'Please enter your name.'); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('cemail', 'Please enter a valid email address.'); valid = false; }
      if (message.length < 10) { showError('cmessage', 'Please write at least 10 characters.'); valid = false; }
      if (!valid) return;

      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Opening email app…';
      const mailSubject = subject || `Portfolio enquiry from ${name}`;
      const bodyText = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(bodyText)}`;
      if (formSuccess) formSuccess.style.display = 'block';
      window.setTimeout(function () {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Send Message';
      }, 1200);
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
