const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');
const filterBtns = document.querySelectorAll('.filters button');
const imageCounter = document.querySelector('.lightbox-info .image-counter');

let currentIndex = 0;
let filteredItems = galleryItems;

// Open lightbox
galleryItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    showLightbox(idx);
  });
});

function showLightbox(idx) {
  currentIndex = idx;
  const img = filteredItems[idx].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
  updateCounter();
}

function updateCounter() {
  imageCounter.textContent = `${currentIndex + 1} / ${filteredItems.length}`;
}

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// Prev/Next navigation
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
  showLightbox(currentIndex);
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % filteredItems.length;
  showLightbox(currentIndex);
});

// Close on outside click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'Escape') closeBtn.click();
});

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    filteredItems = [];
    galleryItems.forEach((item, idx) => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        filteredItems.push(item);
      } else {
        item.style.display = 'none';
      }
    });
    // Reset current index when filter changes
    currentIndex = 0;
  });
});
