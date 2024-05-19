export function openPopup(modalWindow) {
  modalWindow.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', сloseEscape);
  modalWindow.addEventListener('click', сloseOverlay);
}

export function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', сloseEscape);
  modalWindow.removeEventListener('click', сloseOverlay);
}

function сloseEscape(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closePopup(openedPopup);
      }
  }
}

function сloseOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(evt.target);
  }
}
