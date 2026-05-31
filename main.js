// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Navbar shrink on scroll + hide on scroll down
const navbar = document.querySelector('.navbar-modern');
if (navbar) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('navbar-shrink');
    } else {
      navbar.classList.remove('navbar-shrink');
    }
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
    lastScroll = currentScroll;
  });
}

// Back to top button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar dropdown hover on desktop
if (window.innerWidth > 991) {
  document.querySelectorAll('.navbar-modern .dropdown').forEach(dropdown => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!menu) return;
    dropdown.addEventListener('mouseenter', () => menu.classList.add('show'));
    dropdown.addEventListener('mouseleave', () => menu.classList.remove('show'));
  });
}

// Smooth reveal on scroll with staggered animation
const revealElements = document.querySelectorAll('.card-modern, .why-choose-card, .service-card, .stat-item, .client-name-card, .career-highlight, .category-card, .contact-info-card, .gradient-block');

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Counter animation with easing
const counters = document.querySelectorAll('.stat-item h2');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target || entry.target.textContent.replace(/[^0-9]/g, ''));
      if (target) animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (counters.length) counters.forEach(c => counterObserver.observe(c));

function animateCounter(el, target) {
  let current = 0;
  const duration = 1500;
  const step = 16;
  const totalSteps = duration / step;
  let stepCount = 0;
  const timer = setInterval(() => {
    stepCount++;
    const progress = Math.min(stepCount / totalSteps, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * target);
    if (progress >= 1) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + '+';
  }, step);
}

// Typing effect for hero text
const heroHeading = document.querySelector('.hero-visual .visual-content h3');
if (heroHeading) {
  const text = heroHeading.textContent;
  heroHeading.textContent = '';
  heroHeading.style.display = 'inline-block';
  heroHeading.style.overflow = 'hidden';
  heroHeading.style.whiteSpace = 'nowrap';
  heroHeading.style.borderRight = '2px solid var(--accent)';
  heroHeading.style.animation = 'blink 0.75s step-end infinite';
  let charIndex = 0;
  function typeChar() {
    if (charIndex < text.length) {
      heroHeading.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 40 + Math.random() * 30);
    }
  }
  setTimeout(typeChar, 500);
}

// Cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});

// Ripple effect on buttons
document.querySelectorAll('.btn-gradient, .btn-outline-light').forEach(btn => {
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = ripple.style.height = '20px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Parallax effect on decorative elements
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < 600) {
      heroVisual.style.transform = `translateY(${scrolled * 0.03}px)`;
    }
  });
}

// Active nav link
const currentPath = window.location.pathname.split('/').pop().toLowerCase();
document.querySelectorAll('.navbar-modern .nav-link').forEach(link => {
  const href = link.getAttribute('href')?.toLowerCase();
  if (href === currentPath || (currentPath === '' && href === 'home.html')) {
    link.classList.add('active');
  }
});

// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
