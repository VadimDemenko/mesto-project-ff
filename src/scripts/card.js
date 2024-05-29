import { deleteCardId, addLikeCardId, deleteLikeCardId } from './api.js';


const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, onDelete, onLike, onImage, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardButtonDelete = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeQuantity = cardElement.querySelector('.card__like-quantity');
  const cardId = cardData._id;

  cardImage.src = cardData.link;
  cardImage.alt = `На изображении изображено: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  if (cardData.owner._id === userId) {
    cardButtonDelete.addEventListener('click', function() {
      deleteCardId(cardId)
        .then(() => {
          onDelete(cardElement)
        })
        .catch((err) => {
          console.log(err);
        })
    })
  } else {
    cardButtonDelete.remove();
  }

  const myLike = cardData.likes.some(function(like) {
    return like._id === userId;
  });
  if (myLike) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.likes.length > 0) {
    cardLikeQuantity.textContent = cardData.likes.length;
  } else {
    cardLikeQuantity.textContent = '';
  }

  cardLikeButton.addEventListener('click', function() {
    onLike(cardId, cardLikeButton, cardLikeQuantity);
  });

  cardImage.addEventListener('click', function() {
    onImage(cardData);
  });

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(cardId, cardLikeButton, cardLikeQuantity) {
  const likeActive = cardLikeButton.classList.contains('card__like-button_is-active');
  if (likeActive) {
    deleteLikeCardId(cardId)
      .then((card) => {
        cardLikeButton.classList.remove('card__like-button_is-active');
        cardLikeQuantity.textContent = card.likes.length > 0 ? card.likes.length : '';
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeCardId(cardId)
      .then((card) => {
        cardLikeButton.classList.add('card__like-button_is-active');
        cardLikeQuantity.textContent = card.likes.length > 0 ? card.likes.length : '';
      })
      .catch((err) => {
        console.log(err);
      });
  }; 
};