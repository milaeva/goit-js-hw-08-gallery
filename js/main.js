import galleryItems from './gallery-items.js';
import refs from './refs.js';

// Рендер разметки

const createGalleryItemsMarkUp = array => {
  return array
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
            </a>
</li>`;
    })
    .join('');
};

// Открытие модального окна

const onOpenModal = e => {
  const imageTargetRef = e.target;
  if (!imageTargetRef.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);
  refs.modal.classList.add('is-open');
  refs.modalImage.src = imageTargetRef.dataset.source;
  refs.modalImage.alt = imageTargetRef.alt;
};
// Пролистывание изображений

const onArrowKeyPress = e => {
  if (e.code !== 'ArrowLeft' && e.code !== 'ArrowRight') {
    return;
  }

  const currentImageRef = galleryItems.find(
    image => image.original === refs.modalImage.src,
  );
  let index =
    e.code === 'ArrowLeft'
      ? galleryItems.indexOf(currentImageRef) - 1
      : galleryItems.indexOf(currentImageRef) + 1;
  if (index < 0) {
    index = galleryItems.length - 1;
  }
  if (index > galleryItems.length - 1) {
    index = 0;
  }
  refs.modalImage.src = galleryItems[index].original;
  refs.modalImage.alt = galleryItems[index].description;
};

//Закрытие модального окна

const onCloseModal = () => {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
};

const onOverlayClick = e => {
  if (e.target === refs.modalOverlay) {
    onCloseModal();
  }
};

const onEscKeyPress = e => {
  if (e.code === 'Escape') {
    onCloseModal();
  }
};

refs.galleryContainer.innerHTML = createGalleryItemsMarkUp(galleryItems);
refs.galleryContainer.addEventListener('click', onOpenModal);
refs.btnModalClose.addEventListener('click', onCloseModal);
refs.modalOverlay.addEventListener('click', onOverlayClick);
