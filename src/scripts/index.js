import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup , closePopup } from "./modal.js";
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, updateProfileInfo, updateProfileAvatar, addNewCard } from './api.js';


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
const popupAvatar = document.querySelector('.popup_type_avatar');
const profileImage = document.querySelector('.profile__image');
const editAvatarForm = popupAvatar.querySelector('.popup__form');
const avatarInput = document.querySelector('.popup__input_type_avatar');


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cardData.forEach(function(item) {
      cardsContainer.append(createCard(item, deleteCard, likeCard, openImagePopup, userData._id));
    })
  }) 
  .catch((err) => {
    console.log(err);
  })

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

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfileEdit);
    clearValidation(profileForm, validationConfig);
})

profileImage.addEventListener('click', () => {
    openPopup(popupAvatar);
    clearValidation(editAvatarForm, validationConfig);
})

function handelProfileAvatarFromSumbit(evt) {
  evt.preventDefault();
  renderLoading(editAvatarForm, true);

  const newAvatarProlife = avatarInput.value;

  updateProfileAvatar(newAvatarProlife)
    .then((newAvatar) => {
      profileImage.style.backgroundImage = `url('${newAvatar.avatar}')`;
      editAvatarForm.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(editAvatarForm, false);
    });
  
}

editAvatarForm.addEventListener('submit', handelProfileAvatarFromSumbit);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(profileForm, true);

    const newNameProfile = nameInput.value;
    const newDescriptionProfile = jobInput.value;

    updateProfileInfo(newNameProfile, newDescriptionProfile)
      .then((res) => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
        closePopup(popupProfileEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(profileForm, false);
      });
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', () => { 
  openPopup(popupAddNewCard);
  addNewCardForm.reset();
  clearValidation(addNewCardForm, validationConfig);
});

function handleCardFormSubmit (evt) {
    evt.preventDefault();
    renderLoading(addNewCardForm, true);

    const newCard = {
      name: cardNameInput.value,
      link: cardLinkInput.value
    };

    addNewCard(newCard)
      .then((res) => {
        const userId = res.owner._id;
        cardsContainer.prepend(createCard(res, deleteCard, likeCard, openImagePopup, userId));
        closePopup(popupAddNewCard);
      })
      .catch((err) => {
        console.lod(err);
      })
      .finally(() => {
        renderLoading(addNewCardForm, false);
      })
}

addNewCardForm.addEventListener('submit', handleCardFormSubmit);

function renderLoading(element, isLoading) {
  const elementButton = element.querySelector('.popup__button');
  if (isLoading) {
    elementButton.textContent = 'Сохранение...'
  } else {
    elementButton.textContent = 'Сохранить'
  }
}