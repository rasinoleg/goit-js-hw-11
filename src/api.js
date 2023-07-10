import axios from 'axios';

const URL = 'https://pixabay.com/api/';
async function searchImages(searchQuery, currentPage) {
  const params = {
    key: '38095076-ef3c552043c2b200806d48758',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: currentPage,
  };
  const { data } = await axios(URL, { params });
  return data;
}
export { searchImages };
