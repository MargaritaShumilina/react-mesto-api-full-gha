class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  //общая часть .then проверки ответа
  thenResponseOk(res) {
    {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }
  }

  //Начальные карточки должны подгружаться с сервера
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) => this.thenResponseOk(res));
  }

  //Информация о пользователе должна подгружаться с сервера
  getUserInformation() {
    return fetch("https://nomoreparties.co/v1/cohort-58/users/me", {
      headers: this.headers,
    }).then((res) => this.thenResponseOk(res));
  }

  //Отредактированные данные профиля должны сохраняться на сервере
  userInformationForSave(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this.thenResponseOk(res));
  }

  //добавить на сервер новую карточку
  addNewCardToTemplate(name, link) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this.thenResponseOk(res));
  }

  //Карточка должна удаляться, если в попапе удаления карточки пользователь нажал «Да»
  removeMyOwnCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.thenResponseOk(res));
  }

  //Чтобы лайкнуть карточку, отправьте PUT-запрос
  putLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this.thenResponseOk(res));
  }

  //Чтобы убрать лайк, нужно отправить DELETE-запрос с тем же URL
  deleteLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.thenResponseOk(res));
  }

  //Смена аватара
  newUserAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this.thenResponseOk(res));
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "cede7662-5863-46cd-adba-d0cd6f4331bc",
    "Content-Type": "application/json",
  },
});

export default api;
