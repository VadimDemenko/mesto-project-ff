// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardButtonDelete = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = `На изображении изображено: ${cardData.name}`;
  cardButtonDelete.addEventListener('click', () => onDelete(cardElement));
  cardTitle.textContent = cardData.name;

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach( (cardData) => {
  cardsContainer.append(createCard(cardData, deleteCard));
});