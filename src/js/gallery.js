import { getPhotos } from "./pixabay-api";

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
        const response = await getPhotos(querry, page)
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}