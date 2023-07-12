import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './style.css';
import { searchImages } from './api';


const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let isButtonVisible = false;
let totalHits = 0;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreBtnClik);

const lightbox = new SimpleLightbox('.gallery a',{
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

function onFormSubmit(e) {
  e.preventDefault();
  const searchQuery = e.target.searchQuery.value.trim();
  if (!searchQuery) {
    return;
  } currentPage = 1;
  totalHits = 0;
  loadMoreImages(searchQuery);
}

function loadMoreBtnClik(e) {
  const searchQuery = form.searchQuery.value;
  loadMoreImages(searchQuery);
}

async function loadMoreImages(searchQuery) {
    lightbox.refresh();
  const { hits, total } = await searchImages(searchQuery, currentPage);
  const photos = hits
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
  gallery.innerHTML += photos;
  totalHits = total;

  if (hits.length === 0) {
    isButtonVisible = false;
  } else {
    isButtonVisible = true;
    currentPage++;
  }

  loadMoreBtn.style.display = isButtonVisible ? 'block' : 'none';
}
