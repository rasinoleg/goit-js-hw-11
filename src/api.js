import axios from 'axios';
import Notiflix from 'notiflix';
const URL = 'https://pixabay.com/api/';
const params = {
  key: '38095076-ef3c552043c2b200806d48758',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
};
function searchImages(searchQuery) {
  params.q = searchQuery
    return axios
    .get(URL, { params })
    .then(response => {
      console.log(response);
      const data = response.data.hits;

      if (data.length === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        return data;
      }
    })
    .catch(error => {
      console.log(error);
    });
}
export { searchImages };
