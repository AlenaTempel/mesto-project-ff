import { createCard, removeCard, handleLikeClick, handlePictureClick } from './index.js';

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

console.log(cardsTemplate);

// Функция для открытия модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKey); // Добавляем обработчик нажатия клавиш
}

// Функция для закрытия модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKey); // Удаляем обработчик при закрытии
}

// Функция для заполнения полей формы перед открытием попапа
function fillFormFields() {
    nameInput.value = profileTitle.textContent; // Заполняем поле "Имя"
    jobInput.value = profileDescription.textContent; // Заполняем поле "О себе"
}

// Обработчик для открытия попапа редактирования
editButton.addEventListener('click', () => {
    fillFormFields(); // Заполняем поля формы
    openModal(popupEdit); // Открываем попап редактирования
});

// Обработчик для открытия попапа добавления карточки
addButton.addEventListener('click', () => {
    cardNameInput.value = ''; // Очищаем поле "Название карточки"
    cardLinkInput.value = ''; // Очищаем поле "Ссылка на изображение"
    openModal(popupNewCard); // Открываем попап добавления карточки
});

// Обработчик нажатия клавиши Esc
function handleEscKey(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

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
    formNewCardElement.reset(); // Очищаем форму
}

// function cardCreate(handleLikeClick) {
//     const cardName = cardNameInput.value; // Получаем название карточки
//     const cardLink = cardLinkInput.value; // Получаем ссылку на изображение
    
//     // Создаем новую карточку
//     // const cardElement = document.createElement('div');
//     // cardElement.classList.add('card'); alt="${cardName}" class="card__image"&gt;&lt;br&gt;      &lt;h3 class="card__name"&gt;${cardName}&lt;/h3&gt;&lt;br&gt;    </code>';

//     // cardElement.innerHTML = '<code>&lt;br&gt;      &lt;img src="${cardLink}"
//     const cardElement = cardsTemplate.cloneNode(true);
//     console.log(cardElement)

//     const cardTitle = cardElement.querySelector('.card__title');
//     const cardImage = cardElement.querySelector('.card__image');

//     cardTitle.innerHTML = cardName;
//     cardImage.src = cardLink;
//     cardImage.alt = cardName;

//     const cardLike = cardElement.querySelector('.card__like-button');
//     console.log(cardLike);
//     cardLike.addEventListener('click', handleLikeClick);

//     // Добавляем карточку в начало контейнера
//     cardsContainer.prepend(cardElement);

//     closeModal(popupNewCard); // Закрываем попап после добавления карточки
//     formNewCardElement.reset(); // Очищаем форму
// }

// function handleLikeClick (evt) {
//     console.log(evt.target);
// }

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
const popups = [popupEdit, popupNewCard];
popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) { // Проверка, что клик был именно на оверлей
            closeModal(popup);
        }
    });
});