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