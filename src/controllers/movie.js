import {FilmCard} from '../components/film-card.js';
import {FilmPopup} from '../components/film-popup.js';
import {showFilmPopup, closeFilmPopup} from '../services/popup-service.js';
import {render} from '../utils/dom.js';

export class MovieController {
  constructor(container, filmMock, onDataChange) {
    this._container = container;
    this._filmMock = filmMock;
    this._onDataChange = onDataChange;
  }

  init() {
    const filmCard = new FilmCard(this._filmMock);
    const filmPopup = new FilmPopup(this._filmMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeFilmPopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        document.addEventListener(`keydown`, onEscKeyDown);
        showFilmPopup(filmPopup);
      }
    });

    filmCard
      .getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchList.bind(this));

    filmCard
      .getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onAddToWatchList.bind(this));

    filmCard
      .getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._onAddToWatchList.bind(this));

    filmPopup
      .getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmPopup
      .getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    filmPopup
      .getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._onAddToWatchList.bind(this));

    // filmPopup
    //   .getElement()
    //   .querySelector(`.film-details__control-label--watched`)
    //   .addEventListener(`click`, () => {
    //     this._onAddToWatched.bind(this);
    //   });

    // filmPopup
    //   .getElement()
    //   .querySelector(`.film-details__control-label--favorite`)
    //   .addEventListener(`click`, () => {
    //     this._onAddToFavorite.bind(this);
    //   });

    render(this._container, filmCard.getElement());
  }

  _onAddToWatchList(evt) {
    this._changeCardItemActive(evt, `watchList`);
    this._onDataChange(this._filmMock);
  }

  _onAddToWatched(evt) {
    this._changeCardItemActive(evt, `watched`);
    this._onDataChange(this._filmMock);
  }

  _onAddToFavorite(evt) {
    this._changeCardItemActive(evt, `favorite`);
    this._onDataChange(this._filmMock);
  }

  _changeCardItemActive(evt, itemName) {
    console.log(evt);

    evt.preventDefault();
    this._filmMock[itemName] = !this._filmMock[itemName];
    evt.target.classList.toggle(`film-card__controls-item--active`);
  }
}
