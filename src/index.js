import './pages/index.css';
import { initialCards } from './cards';
import './modal.js';
import { openModal, closePopupByOverlay } from './modal.js';
import {createCard, removeCard, handleLikeClick} from './card.js';
import {closeModal} from './modal.js'


const pictureModal = document.querySelector('.popup_type_image');
const pictureModalImage = pictureModal.querySelector('.popup__image');
const pictureModalCaption = pictureModal.querySelector('.popup__caption');

const content = document.querySelector('.content');
// const placesList = document.querySelector ('.places__list');

// Получаем элементы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button'); // Кнопка для добавления карточек
const popupEdit = document.querySelector('.popup_type_edit'); // Попап редактирования профиля
const popupNewCard = document.querySelector('.popup_type_new-card'); // Попап добавления карточек
const closeButtons = document.querySelectorAll('.popup__close');

const formEditElement = popupEdit.querySelector('.popup__form');
const formNewCardElement = popupNewCard.querySelector('.popup__form'); // Форма для добавления карточки
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const cardNameInput = formNewCardElement.querySelector('.popup__input_type_card-name');  // Инпут для названия карточки
const cardLinkInput = formNewCardElement.querySelector('.popup__input_type_url'); // Инпут для ссылки на изображение
const placesList = document.querySelector('.places__list'); // Контейнер для карточек
const cardsTemplate = document.getElementById('card-template').content;


// Функция для заполнения полей формы перед открытием попапа
function fillProfileFormFields() {
    nameInput.value = profileTitle.textContent; // Заполняем поле "Имя"
    jobInput.value = profileDescription.textContent; // Заполняем поле "О себе"
}

// Обработчик для открытия попапа редактирования
editButton.addEventListener('click', () => {
    fillProfileFormFields(); // Заполняем поля формы
    openModal(popupEdit); // Открываем попап редактирования
});

// Обработчик для открытия попапа добавления карточки
addButton.addEventListener('click', () => {
  formNewCardElement.reset(); // Очищаем форму

    openModal(popupNewCard); // Открываем попап добавления карточки
});

// Обработчик отправки формы редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение отправки формы
    const name = nameInput.value;
    const job = jobInput.value;
    profileTitle.textContent = name; // Обновляем имя пользователя
    profileDescription.textContent = job; // Обновляем описание пользователя
    closeModal(popupEdit); // Закрываем попап после успешного сохранения
}

// Обработчик отправки формы добавления карточки
function handleNewCardFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение отправки формы
    const picture = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    }
    placesList.prepend(createCard(picture, removeCard, handleLikeClick, handlePictureClick));
    closeModal(popupNewCard); // Закрываем попап после добавления карточки
}

// Прикрепляем обработчики к формам
formEditElement.addEventListener('submit', handleEditFormSubmit);
formNewCardElement.addEventListener('submit', handleNewCardFormSubmit);

// Обработчики для закрытия модальных окон
closeButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup'); // Найти ближайший попап к кнопке закрытия
        closeModal(popup);
    });
});

// Закрытие попапа по нажатию вне его содержимого
const popups = [popupEdit, popupNewCard, pictureModal];
popups.forEach(popup => {
  popup.addEventListener('click', closePopupByOverlay);
});


export function handlePictureClick (element) {
  pictureModalImage.src = element.link;
  pictureModalImage.alt = element.name;
  
  pictureModalCaption.textContent = element.name;
  
  openModal(pictureModal);
}


// @todo: Вывести карточки на страницу

function renderInitialCards() {
  initialCards.forEach((element) => {
    placesList.append(createCard(element, removeCard, handleLikeClick, handlePictureClick));
  });
}

renderInitialCards();