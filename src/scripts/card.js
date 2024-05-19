const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, onDelete, onLike, onImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardButtonDelete = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = `На изображении изображено: ${cardData.name}`;
  cardButtonDelete.addEventListener('click', () => onDelete(cardElement));
  cardTitle.textContent = cardData.name;
  cardLikeButton.addEventListener('click', onLike);
  cardImage.addEventListener('click', () => onImage(cardData));

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(card) {
  card.target.classList.toggle('card__like-button_is-active');
}

