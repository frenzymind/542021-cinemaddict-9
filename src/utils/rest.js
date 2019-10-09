import {parseFilms, filmToRaw} from '../models/film-card.js';
import {parseComments, commentToRaw} from '../models/comment.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const API_URL = `https://htmlacademy-es-9.appspot.com/cinemaddict/`;
const X_AUTH = `Basic eo0w590ik29889a`;

export const ACTIONS = {
  FILM_UPDATE: `FILM_UPDATE`,
  COOMENT_DEL: `COOMENT_DEL`,
  COMMENT_ADD: `COMMENT_ADD`
};

export default class RestAPI {
  constructor() {
    this._endPoint = API_URL;
    this._authorization = X_AUTH;
  }

  getFilms() {
    return this._load({
      url: `movies`
    })
      .then(RestAPI.toJSON)
      .then(parseFilms);
  }

  getComments(filmId) {
    return this._load({
      url: `comments/${filmId}`
    })
      .then(RestAPI.toJSON)
      .then(parseComments);
  }

  updateFilm(id, data) {
    const dataRaw = filmToRaw(data);
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(dataRaw),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    }).then(RestAPI.toJSON);
  }

  updateRating(id, data) {
    const dataRaw = filmToRaw(data);

    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(dataRaw),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    }).then(RestAPI.toJSON);
  }

  createComment(data, filmId) {
    const dataRaw = commentToRaw(data);

    console.log(`data:`, data);
    console.log(`dataRaw:`, dataRaw);

    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(dataRaw),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    }).then(RestAPI.toJSON);
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(RestAPI.checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static toJSON(response) {
    return response.json();
  }
}
