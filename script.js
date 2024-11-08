// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle
  const sidebar = document.querySelector('.sidebar');
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('sidebar-toggle');
  toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  // Expandable Programme Cards
  const programmeCards = document.querySelectorAll('.programme-card');
  programmeCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('expanded');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('expanded');
    });
  });

  // Lazy Load Images for Performance
  const lazyImages = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '0px 0px 200px 0px' },
  );

  lazyImages.forEach((img) => {
    img.dataset.src = img.src;
    img.src = '';
    imageObserver.observe(img);
  });

  // Interactive Search Functionality
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search...';
  searchInput.classList.add('search-bar');
  document.querySelector('.main-header').appendChild(searchInput);

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document
      .querySelectorAll('.programme-card, .resource-card')
      .forEach((card) => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
  });
});
