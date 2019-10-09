import {FilmCard} from '../components/film-card.js';
import {FilmPopup} from '../components/film-popup.js';
import {showFilmPopup, closeFilmPopup} from '../services/popup-service.js';
import {render} from '../utils/dom.js';
import {ACTIONS} from '../utils/rest.js';
export class MovieController {
  constructor(container, filmMock, onDataChange) {
    this._container = container;
    this._filmMock = filmMock;
    this._onDataChange = onDataChange;
    this._userRatingContainer = null;
  }

  init() {
    const filmCard = new FilmCard(this._filmMock);
    let filmPopup = this._createPopup();

    const onDeleteComment = (commentId) => {
      this._filmMock.commentsCount--;

      this._filmMock.comments = this._filmMock.comments.filter(
          (comment) => comment.id !== commentId
      );

      this._onDataChange(this._filmMock, ACTIONS.COOMENT_DEL, commentId);

      filmPopup = this._createPopup();
      filmPopup._onDeleteComment = onDeleteComment.bind(this);
      filmPopup._onNewComment = onNewComment.bind(this);
      showFilmPopup(filmPopup);
    };

    const onNewComment = (newComment) => {
      this._filmMock.commentsCount++;
      this._filmMock.comments.push(newComment);
      this._onDataChange(
          this._filmMock,
          ACTIONS.COMMENT_ADD,
          this._filmMock.comments.length - 1
      );

      filmPopup = this._createPopup();
      // filmPopup._onDeleteComment = onDeleteComment.bind(this);
      filmPopup._onNewComment = onNewComment.bind(this);
      showFilmPopup(filmPopup);
    };

    filmPopup._onDeleteComment = onDeleteComment.bind(this);

    filmPopup._onNewComment = onNewComment.bind(this);

    this._userRatingContainer = filmPopup
      .getElement()
      .querySelector(`.form-details__middle-container`);

    filmCard.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        filmPopup.loadComments(onDeleteComment.bind(this));
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

    render(this._container, filmCard.getElement());
  }

  _createPopup() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeFilmPopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const filmPopup = new FilmPopup(this._filmMock);

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

    return filmPopup;
  }

  _onAddToWatchList() {
    this._filmMock.watchList = !this._filmMock.watchList;
    this._onDataChange(this._filmMock);
  }

  _onAddToWatched() {
    this._filmMock.watched = !this._filmMock.watched;
    this._userRatingContainer.style.display = this._filmMock.watched
      ? `block`
      : `none`;
    this._onDataChange(this._filmMock);
  }

  _onAddToFavorite() {
    this._filmMock.favorite = !this._filmMock.favorite;
    this._onDataChange(this._filmMock);
  }
}
