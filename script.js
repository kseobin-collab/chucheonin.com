/* 추천인닷컴 production script */
(() => {
  const toast = document.querySelector('.toast');
  let toastTimer;

  const showToast = (message = '복사했어요!') => {
    if (!toast) return;
    const title = toast.querySelector('strong');
    if (title) title.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2500);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const input = document.createElement('textarea');
      input.value = text;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    showToast();
  };

  document.addEventListener('click', (event) => {
    const copyButton = event.target.closest('[data-copy]');
    if (copyButton) {
      event.preventDefault();
      copyText(copyButton.dataset.copy);
    }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
    });
    mobileNav.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  }

  const cards = [...document.querySelectorAll('.service-card')];
  const filterButtons = [...document.querySelectorAll('.filter-chip')];
  const searchForm = document.querySelector('#service-search');
  const searchInput = document.querySelector('#search-input');
  const emptyState = document.querySelector('#empty-state');
  let activeFilter = 'all';
  let activeQuery = '';

  const normalize = (value) => value.toLowerCase().replace(/\s/g, '');
  const updateCards = () => {
    if (!cards.length) return;
    let visible = 0;
    cards.forEach((card) => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesQuery = !activeQuery || normalize(card.dataset.name || '').includes(normalize(activeQuery));
      const show = matchesFilter && matchesQuery;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible > 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      activeQuery = '';
      if (searchInput) searchInput.value = '';
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      updateCards();
    });
  });

  const performSearch = (query) => {
    activeFilter = 'all';
    activeQuery = query.trim();
    filterButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.filter === 'all'));
    updateCards();
    document.querySelector('#popular')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(searchInput?.value || '');
  });

  document.querySelectorAll('[data-search]').forEach((button) => {
    button.addEventListener('click', () => {
      if (searchInput) searchInput.value = button.dataset.search;
      performSearch(button.dataset.search);
    });
  });

  document.querySelector('#reset-search')?.addEventListener('click', () => {
    activeQuery = '';
    activeFilter = 'all';
    if (searchInput) searchInput.value = '';
    filterButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.filter === 'all'));
    updateCards();
  });

  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery && searchInput) {
    searchInput.value = initialQuery;
    activeQuery = initialQuery;
    updateCards();
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -30px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
