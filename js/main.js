const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const viewButtons = document.querySelectorAll('.view-button');
const projectGrid = document.querySelector('#project-grid');
const visibleCount = document.querySelector('#visible-count');
const totalCount = document.querySelector('#total-count');
const projectToggle = document.querySelector('#project-toggle');
const currentYear = document.querySelector('#current-year');
const projectLimit = 6;
let activeFilter = 'all';
let showAllProjects = false;

function renderProjects() {
  const matchingCards = [...projectCards].filter((card) => (
    activeFilter === 'all' || card.dataset.category === activeFilter
  ));

  matchingCards.forEach((card, index) => {
    const isVisible = showAllProjects || index < projectLimit;
    card.hidden = !isVisible;
    if (isVisible) card.style.setProperty('--card-delay', `${index * 35}ms`);
  });
  projectCards.forEach((card) => {
    if (!matchingCards.includes(card)) card.hidden = true;
  });

  const visible = Math.min(matchingCards.length, showAllProjects ? matchingCards.length : projectLimit);
  if (visibleCount) visibleCount.textContent = visible;
  if (totalCount) totalCount.textContent = projectCards.length;
  if (projectToggle) {
    const hasMore = matchingCards.length > projectLimit;
    projectToggle.hidden = !hasMore;
    projectToggle.setAttribute('aria-expanded', String(showAllProjects));
    projectToggle.innerHTML = !hasMore
      ? ''
      : showAllProjects
        ? 'Show fewer projects <span aria-hidden="true">↑</span>'
        : `Show ${matchingCards.length - visible} more projects <span aria-hidden="true">↓</span>`;
  }
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    showAllProjects = false;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    renderProjects();
  });
});

projectToggle?.addEventListener('click', () => {
  showAllProjects = !showAllProjects;
  renderProjects();
});

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isList = button.dataset.view === 'list';
    projectGrid?.classList.toggle('is-list', isList);
    viewButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
  });
});

if (currentYear) currentYear.textContent = new Date().getFullYear();
renderProjects();
