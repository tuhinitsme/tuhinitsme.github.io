const homeMenu = document.querySelector('.home-menu');
const homeNav = document.querySelector('.home-nav');

homeMenu?.addEventListener('click', () => {
  const isOpen = homeMenu.getAttribute('aria-expanded') === 'true';
  homeMenu.setAttribute('aria-expanded', String(!isOpen));
  homeNav?.classList.toggle('is-open', !isOpen);
});

homeNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    homeMenu?.setAttribute('aria-expanded', 'false');
    homeNav.classList.remove('is-open');
  });
});
