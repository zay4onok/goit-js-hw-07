import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.tagName !== "IMG") {
    return;
  }
}

function galleryItemsTemplate(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
    </li>
    `;
    })
    .join("");
}

function renderGalleryItems(galleryItems) {
  gallery.innerHTML = galleryItemsTemplate(galleryItems);
}

renderGalleryItems(galleryItems);

let newGallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
