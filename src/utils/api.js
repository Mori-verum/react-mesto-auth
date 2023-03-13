export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _returnJson(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject("Ошибка: " + res.status);
  }

  _request(url, options) {
    return fetch(url, options).then(this._returnJson)
  }

  getDataProfile() {
    return this._request(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    })
  }

  setUserInfo(data) {
    return this._request(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  setUserAvatar(avatar) {
    return this._request(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  addCard(data) {
    return this._request(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  getAllCards() {
    return this._request(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    })
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers
    })
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-57/',
  headers: {
    "Content-Type": "application/json",
    Authorization: '0ac4516d-6064-4e3b-8a1c-df68a9219510'
  }
});
