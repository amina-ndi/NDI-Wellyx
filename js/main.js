/**
 * Wellyx Software Inc. - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCarousel();
  initCounters();
  initPortfolioFilter();
  initScrollAnimations();
  initContactForm();
  initNewsletterForm();
});

function initHeroCarousel() {
  const heroCarousel = document.getElementById('heroCarousel');
  if (!heroCarousel) return;

  const navbar = document.querySelector('.navbar-custom');
  const updateNavbar = (slideEl) => {
    if (!navbar) return;
    const isDark = slideEl?.querySelector('.hero-slide-dark');
    navbar.classList.toggle('navbar-hero-dark', !!isDark);
    if (window.scrollY <= 50) navbar.classList.remove('scrolled');
  };

  updateNavbar(heroCarousel.querySelector('.carousel-item.active'));

  heroCarousel.addEventListener('slid.bs.carousel', (e) => {
    updateNavbar(e.relatedTarget);
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  const toggleScrolled = () => {
    const onHero = document.getElementById('heroCarousel');
    if (onHero && window.scrollY <= 50) {
      navbar.classList.remove('scrolled');
      return;
    }
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', toggleScrolled);
  toggleScrolled();

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse?.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      }
    });
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
      });
    });
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

function initContactForm() {
  const forms = document.querySelectorAll('#contactForm');
  if (!forms.length) return;

  forms.forEach(form => {
    const nextInput = form.querySelector('.formsubmit-next');
    if (nextInput) {
      const hash = form.closest('#contact') ? '#contact' : '';
      nextInput.value = getFormSubmitNextUrl(hash);
    }

    form.addEventListener('submit', (e) => {
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      let valid = true;

      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

      if (!name?.value.trim()) { name.classList.add('is-invalid'); valid = false; }
      if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('is-invalid'); valid = false;
      }
      if (!message?.value.trim()) { message.classList.add('is-invalid'); valid = false; }

      if (!valid) e.preventDefault();
    });
  });

  if (new URLSearchParams(window.location.search).get('success') === '1') {
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
      successMsg.classList.remove('d-none');
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }
}

function getFormSubmitNextUrl(hash = '') {
  if (window.location.protocol === 'file:') return '';
  const url = new URL(window.location.href);
  url.searchParams.set('success', '1');
  url.hash = hash;
  return url.toString();
}

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');

    if (email.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      alert('Thank you for subscribing!');
      form.reset();
    } else {
      email.classList.add('is-invalid');
    }
  });
}
