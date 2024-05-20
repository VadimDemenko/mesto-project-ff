import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup , closePopup } from "./modal.js";

const cardsContainer = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileForm = popupProfileEdit.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = popupAddNewCard.querySelector('.popup__form');
const cardNameInput = addNewCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addNewCardForm.querySelector('.popup__input_type_url');


function setPopupCloseListener(modalWindow) {
    const popupCloseButton = modalWindow.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => closePopup(modalWindow));
}

document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
    setPopupCloseListener(popup);
});

function openImagePopup(evt) {
    openPopup(imagePopup);
    popupImage.src = evt.link;
    popupImage.alt = evt.name;
    popupCaption.textContent = evt.name;
}

function outputCards(cards) {
    cards.forEach((item) => {
      cardsContainer.append(createCard(item, deleteCard, likeCard, openImagePopup,));
    });
  }

outputCards(initialCards);

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfileEdit);
})

profileAddButton.addEventListener('click', () => { 
    openPopup(popupAddNewCard);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfileEdit);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit (evt) {
    evt.preventDefault();
    const newCard = {};
    newCard.name = cardNameInput.value;
    newCard.link = cardLinkInput.value;

    cardsContainer.prepend(createCard(newCard, deleteCard, likeCard, openImagePopup));
    addNewCardForm.reset();
    closePopup(popupAddNewCard);
}

addNewCardForm.addEventListener('submit', handleCardFormSubmit);