export function createMarkup(arr) {
    return arr
      .map(
        item => `<li class="gallery__item">
      <div class="photo-card">
    <img class="gallery-img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
    <div class="info">
      <div class="info-item">
      <p class="info-item">
        <b>Likes</b>
        <b>${item.likes}</b>
      </p>
      </div>
      <div class="info-item">
      <p class="info-item">
      <b>Views</b>
      <b>${item.views}</b>
      </p>
      </div>
      <div class="info-item">
      <p class="info-item">
        <b>Comments</b>
        <b>${item.comments}</b>
      </p>
      </div>
      <div class="info-item">
      <p class="info-item">
        <b>Downloads</b>
        <b>${item.downloads}</b>
      </p>
      </div>
    </div>
  </div>
  </li>
      `
      )
      .join('');
  }