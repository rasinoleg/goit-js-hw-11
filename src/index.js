import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './style.css';
import { searchImages } from './api';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let isButtonVisible = false;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchQuery = e.target.searchQuery.value;
  loadMoreImages(searchQuery);
});

function loadMoreImages(searchQuery) {
  searchImages(searchQuery, currentPage).then(images => {
    const photos = images
      .map(({ likes, webformatURL, downloads, views, comments }) => {
        return `<div class="photo-card">
          <a href="${webformatURL}" data-lightbox="gallery">
            <img src="${webformatURL}" alt="" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </div>`;
      })
      .join('');

    gallery.innerHTML = photos;

    const lightbox = new SimpleLightbox('.gallery a', {});

    lightbox.on('show.simplelightbox', () => {});

    if (images.length === 0) {
      isButtonVisible = false;
    } else {
      isButtonVisible = true;
      currentPage++;
    }

    loadMoreBtn.style.display = isButtonVisible ? 'block' : 'none';
  });
}

loadMoreBtn.addEventListener('click', () => {
  const searchQuery = form.searchQuery.value;
  loadMoreImages(searchQuery);
});

form.addEventListener('input', () => {
  loadMoreBtn.style.display = isButtonVisible ? 'block' : 'none';
});

