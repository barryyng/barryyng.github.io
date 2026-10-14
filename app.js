const menu = document.querySelector('#mobile-menu');
const links = document.querySelector('.navbar-menu');
const navLogo = document.querySelector('#navbar-logo');

const mobileMenu = () => {
menu.classList.toggle('is-active');
links.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

const hideMobileMenu = () => {
const menuBars = document.querySelector('.is-active');
if (window.innerWidth <= 144000 && menuBars) {
menu.classList.toggle('is-active');
links.classList.remove('active');
    }
  };

links.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasHover = window.matchMedia('(hover: hover)').matches;

const greeting = document.querySelector('.home-greeting');
if (greeting) {
  const text = greeting.textContent.trim();
  greeting.setAttribute('aria-label', text);
  greeting.textContent = '';
  let letterIndex = 0;
  const words = text.split(' ');
  words.forEach((word, w) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'word';
    wordEl.setAttribute('aria-hidden', 'true');
    Array.from(word).forEach((char) => {
      const letter = document.createElement('span');
      letter.className = 'letter';
      letter.textContent = char;
      letter.style.setProperty('--i', letterIndex++);
      wordEl.appendChild(letter);
    });
    greeting.appendChild(wordEl);
    if (w < words.length - 1) {
      greeting.appendChild(document.createTextNode(' '));
      letterIndex++;
    }
  });
}

const navbar = document.querySelector('.navbar');
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  navbar.classList.toggle('scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealTargets = document.querySelectorAll('.experience h1, .skills h1, .experience-card, .skills-card');
revealTargets.forEach((el) => {
  const index = Array.from(el.parentElement.children).indexOf(el);
  el.style.setProperty('--d', `${(index % 3) * 0.1}s`);
  el.classList.add('reveal');
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in-view'));
}

const navLinks = new Map(
  Array.from(document.querySelectorAll('.navbar-links')).map((a) => [a.getAttribute('href').slice(1), a])
);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('is-current'));
        const active = navLinks.get(entry.target.id);
        if (active) active.classList.add('is-current');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  ['home', 'experience', 'skills', 'contact'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

const trackPointer = (el) => {
  el.addEventListener('pointermove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
};

if (hasHover) {
  const hero = document.querySelector('.home');
  if (hero) trackPointer(hero);
  document.querySelectorAll('.experience-card, .skills-card').forEach(trackPointer);
}

const photo = document.querySelector('.my-img');
const photoImg = photo ? photo.querySelector('img') : null;

if (photo && photoImg && hasHover && !reduceMotion) {
  photo.addEventListener('pointermove', (e) => {
    const rect = photo.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    photoImg.style.setProperty('--ry', `${x * 14}deg`);
    photoImg.style.setProperty('--rx', `${-y * 14}deg`);
  });
  photo.addEventListener('pointerleave', () => {
    photoImg.style.setProperty('--rx', '0deg');
    photoImg.style.setProperty('--ry', '0deg');
  });
}