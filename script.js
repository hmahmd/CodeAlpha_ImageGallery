const images = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Mountain Peak', category: 'nature' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', title: 'Tech Setup', category: 'tech' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800', title: 'Portrait', category: 'people' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', title: 'Forest Path', category: 'nature' },
  { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', title: 'Coding', category: 'tech' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Professional', category: 'people' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', title: 'Lake View', category: 'nature' },
  { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', title: 'Laptop Work', category: 'tech' },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800', title: 'Casual', category: 'people' },
  { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800', title: 'Sunset', category: 'nature' },
  { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', title: 'Workspace', category: 'tech' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800', title: 'Outdoor', category: 'people' }
];

let currentImageIndex = 0;
let filteredImages = [...images];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderGallery(imagesToRender) {
  gallery.innerHTML = '';
  imagesToRender.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', index);
    item.innerHTML = `
                    <img src="${image.src}" alt="${image.title}">
                    <div class="overlay">
                        <h3>${image.title}</h3>
                        <p>${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
                    </div>
                `;
    item.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
  const image = filteredImages[currentImageIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.title;
  lightboxCaption.textContent = image.title;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
  updateLightboxImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
  updateLightboxImage();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    if (filter === 'all') {
      filteredImages = [...images];
    } else {
      filteredImages = images.filter(img => img.category === filter);
    }
    renderGallery(filteredImages);
  });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  }
});

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    nextImage();
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    prevImage();
  }
}

renderGallery(filteredImages);