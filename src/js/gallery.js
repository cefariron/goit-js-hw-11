import { getPhotos } from "./pixabay-api";
import Notiflix from "notiflix";

const formEl = document.querySelector(".js-search-form")
const listEl = document.querySelector(".js-gallery")
const loadMoreBtnEl = document.querySelector(".js-load-more")

let page = 1;
let querry = null;

formEl.addEventListener("submit", onSubmit)

async function onSubmit(event) {
    event.preventDefault()

    querry = event.target.elements.searchQuery.value;
    
    try {
        const { data: { total, hits} } = await getPhotos(querry, page)
        console.log(hits);
        if(hits.length === 0){
            return Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        }

        listEl.innerHTML = createMarkup(hits)
    } catch (error) {
        console.log(error.message);
    }
}

function createMarkup(arr) {
    return arr.map(item => `<li class="gallery__item">
    <div class="photo-card">
  <img class="gallery-img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
</div>
</li>
    `).join("")
}