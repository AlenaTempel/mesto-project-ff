const cardTemplate = document.querySelector('#card-template').content;


// @todo: Функция создания карточки

export function createCard (element, remove, handleLikeClick, handlePictureClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
  cardElement.querySelector('.card__title').textContent = element.name;

  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', remove);

  const cardLike = cardElement.querySelector('.card__like-button');
  cardLike.addEventListener('click', handleLikeClick);

  cardImage.addEventListener('click', evt => handlePictureClick(element));

  return cardElement;
}

export function handleLikeClick (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
// @todo: Функция удаления карточки

export function removeCard (evt) {
  const card = evt.target.closest('.card');
  card.remove();
}