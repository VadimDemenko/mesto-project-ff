// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsList = document.querySelector('.places__list');

function creatCard(title, image) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardButtonDelete = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = image;
  cardImage.alt = `На изображении изображено: ${title}`;
  cardButtonDelete.addEventListener('click', () => {
    deleteCard(cardElement);
  })
  cardTitle.textContent = title;

  return cardElement;
}

initialCards.forEach( (elem) => {
  cardsList.append(creatCard(elem.name, elem.link))
});

function deleteCard(elem) {
  elem.remove();
}