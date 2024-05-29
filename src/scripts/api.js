const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: 'd4df7822-1ef6-471d-8144-fd51f7a230ef',
    'Content-Type': 'application/json'
  }
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    return checkResponse(res);
  });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    return checkResponse(res);
  })
};

export const updateProfileInfo = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers, 
    body: JSON.stringify({
      name: nameInput,
      about: jobInput
    })
  })
  .then(res => {
    return checkResponse(res);
  })
};

export const updateProfileAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => {
    return checkResponse(res);
  })
};

export const addNewCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardId.name,
      link: cardId.link
    })
  })
  .then(res => {
    return checkResponse(res);
  })
};

export const deleteCardId = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return checkResponse(res);
  })
};

export const addLikeCardId = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    return checkResponse(res);
  })
};

export const deleteLikeCardId = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return checkResponse(res);
  })
};