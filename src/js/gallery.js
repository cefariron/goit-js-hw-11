import { getPhotos } from './pixabay-api';
import Notiflix from 'notiflix';
import { formEl, listEl, loadMoreBtnEl } from './refs';
import { createMarkup } from './create-markup'

let page = 1;
let querry = null;
let perPage;

formEl.addEventListener('submit', onSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onSubmit(event) {
  event.preventDefault();
  loadMoreBtnEl.classList.add('is-hidden');
  page = 1;
  querry = event.target.elements.searchQuery.value;

  getPhotos().then(res => {
    perPage = res.config.params.per_page;
  }).catch(err => {
    throw err;
  });

  try {
    const {
      data: { totalHits, hits },
    } = await getPhotos(querry, page);
    if (hits.length === 0) {
      listEl.innerHTML = "";
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    listEl.innerHTML = createMarkup(hits);

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    if (totalHits > 40) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure('Oops! Sorry, something is wrong!');
  }
}

async function onLoadMoreBtnClick() {
  page += 1;

  try {
    const {
      data: { totalHits, hits },
    } = await getPhotos(querry, page);

    listEl.insertAdjacentHTML('beforeend', createMarkup(hits));

    const totalPage = Math.ceil(totalHits / perPage);

    if(totalPage === page){
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure('Oops! Sorry, something is wrong!');
  }
}
