import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
let instance;

gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.tagName !== "IMG") {
    return;
  }
  const url = e.target.dataset.source;

  instance = basicLightbox.create(
    `
		<img width="1400" height="900" src="${url}">
	`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onInstanceKeydown);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onInstanceKeydown);
      },
    }
  );
  instance.show();
}

function onInstanceKeydown(e) {
  if (e.code !== "Escape") {
    return;
  }
  instance.close();
}

function galleryItemsTamplate(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
    })
    .join("");
}

function renderGalleryItems(galleryItems) {
  gallery.innerHTML = galleryItemsTamplate(galleryItems);
}

renderGalleryItems(galleryItems);
