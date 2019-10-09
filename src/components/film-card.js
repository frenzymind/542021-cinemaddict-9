import {AbstractComponent} from "./abstract-component.js";
const moment = require(`moment`);

export class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._title = film.title;
    this._rating = film.rating;
    this._year = film.year;
    this._durationHour = film.durationHour;
    this._durationMinute = film.durationMinute;
    this._genre = film.genre;
    this._imgSrc = film.imgSrc;
    this._description = film.description;
    this._commentsCount = film.commentsCount;
    this._watchList = film.watchList;
    this._watched = film.watched;
    this._favorite = film.favorite;
    this._comments = film.comments;
  }

  getTemplate() {
    return `<article class="film-card">
  <h3 class="film-card__title">${this._title}</h3>
  <p class="film-card__rating">${this._rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
    <span class="film-card__duration">${this._durationHour}h ${
  this._durationMinute
}m</span>
    ${Array.from(this._genre)
      .map((genre) => `<span class="film-card__genre">${genre}</span>`)
      .join(``)}
  </p>
  <img src="${this._imgSrc}" alt="" class="film-card__poster">
  <p class="film-card__description">${this._description}</p>
  <a class="film-card__comments">${this._commentsCount} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${
  this._watchList ? `film-card__controls-item--active` : ``
}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${
  this._watched ? `film-card__controls-item--active` : ``
}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${
  this._favorite ? `film-card__controls-item--active` : ``
}">Mark as favorite</button>
  </form>
  </article>`;
  }
}
