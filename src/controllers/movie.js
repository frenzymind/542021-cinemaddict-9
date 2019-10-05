import {FilmCard} from "../components/film-card.js";
import {FilmPopup} from "../components/film-popup.js";
import {showFilmPopup, closeFilmPopup} from "../services/popup-service.js";
import {render} from "../utils/dom.js";

export class MovieController {
  constructor(container, filmMock, onDataChange) {
    this._container = container;
    this._filmMock = filmMock;
    this._onDataChange = onDataChange;
    this._userRatingContainer = null;
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

    this._userRatingContainer = filmPopup
      .getElement()
      .querySelector(`.form-details__middle-container`);

    filmCard.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
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
      .addEventListener(`click`, this._onAddToWatched.bind(this));

    filmCard
      .getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._onAddToFavorite.bind(this));

    filmPopup._onEscKeyDown = onEscKeyDown.bind(this);

    filmPopup
      .getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._onAddToWatchList.bind(this));

    filmPopup
      .getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._onAddToWatched.bind(this));

    filmPopup
      .getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._onAddToFavorite.bind(this));

    render(this._container, filmCard.getElement());
  }

  _onAddToWatchList() {
    this._filmMock.watchList = !this._filmMock.watchList;
    this._onDataChange();
  }

  _onAddToWatched() {
    this._filmMock.watched = !this._filmMock.watched;
    this._userRatingContainer.style.display = this._filmMock.watched
      ? `block`
      : `none`;
    this._onDataChange();
  }

  _onAddToFavorite() {
    this._filmMock.favorite = !this._filmMock.favorite;
    this._onDataChange();
  }
}
