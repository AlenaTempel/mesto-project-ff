import './pages/index.css';
import { initialCards } from './cards';
import './modal.js';
import { openModal } from './modal.js';


const pictureModal = document.querySelector('.popup_type_image');
console.log(pictureModal);
const pictureModalImage = pictureModal.querySelector('.popup__image');
const pictureModalCaption = pictureModal.querySelector('.popup__caption');

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = document.querySelector ('.places__list');

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

  cardImage.addEventListener('click', handlePictureClick);

  console.log(cardElement)

  return cardElement;
}

export function handleLikeClick (evt) {
  console.log(evt.target);
  evt.target.classList.toggle('card__like-button_is-active');
}

export function handlePictureClick (evt) {
  pictureModalImage.src = evt.target.src;
  const text = evt.target.closest('.card').querySelector('.card__title').textContent;
  
  pictureModalCaption.textContent = text;
  openModal(pictureModal);
}


// @todo: Функция удаления карточки

export function removeCard (evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

// @todo: Вывести карточки на страницу

function renderInitialCards() {
  initialCards.forEach((element) => {
    placesList.append(createCard(element, removeCard, handleLikeClick, handlePictureClick));
  });
}

renderInitialCards();