import {createElement} from "../utils/dom.js";

export class Menu {
  constructor({watchList, watched, favorite}) {
    this._watchList = watchList;
    this._watched = watched;
    this._favorite = favorite;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${
  this._watchList
}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${
  this._watched
}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${
  this._favorite
}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>
  </nav>`;
  }
}
