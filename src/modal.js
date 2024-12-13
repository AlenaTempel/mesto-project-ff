// Функция для открытия модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKey); // Добавляем обработчик нажатия клавиш
}

// Функция для закрытия модального окна
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKey); // Удаляем обработчик при закрытии
}

// Обработчик нажатия клавиши Esc
export function handleEscKey(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

export const closePopupByOverlay = evt => {
    if (evt.target === evt.currentTarget) { // Проверка, что клик был именно на оверлей 
      closeModal(evt.currentTarget); 
    } 
}