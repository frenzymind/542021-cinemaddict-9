import {FilmCard} from '../components/film-card.js';
import {FilmPopup} from '../components/film-popup.js';
import {showFilmPopup, closeFilmPopup} from '../services/popup-service.js';
import {render} from '../utils/dom.js';
import {randomFromArray} from '../utils/random.js';
import {getFilmLayout} from '../components/film-layout.js';
import {getNoFilm} from '../components/no-films';

const SHOW_MORE_COUNT = 5;

let filmOffsetShow = SHOW_MORE_COUNT;

export class PageController {
  constructor(container, films) {
    this._container = container;

    this._filmListContainer = null;
    this._filmTopContainer = null;
    this._filmMostContainer = null;

    this._showMoreButton = null;

    this._films = films;
  }

  init() {
    render(this._container, getFilmLayout());

    this._filmListContainer = this._container.querySelector(
        `.films-list__container`
    );

    this._filmTopContainer = this._container.querySelector(
        `.films-list--extra:nth-of-type(2) .films-list__container`
    );

    this._filmMostContainer = this._container.querySelector(
        `.films-list--extra:nth-of-type(3) .films-list__container`
    );

    this._showMoreButton = this._container.querySelector(
        `.films-list__show-more`
    );

    this._showMoreButton.addEventListener(`click`, () => {
      filmOffsetShow += SHOW_MORE_COUNT;

      this.showFilmsList();

      if (filmOffsetShow >= this._films.length) {
        this._showMoreButton.style.display = `none`;
      }
    });

    this.showFilmsList();
    this.showFilmsExtra();
  }

  showFilmsList() {
    if (this._films.length === 0) {
      render(this._filmListContainer, getNoFilm());
      return;
    }

    this._films
      .slice(filmOffsetShow - SHOW_MORE_COUNT, filmOffsetShow)
      .forEach((filmMock) => {
        this._renderFilmCard(this._filmListContainer, filmMock);
      });
  }

  showFilmsExtra() {
    if (this._films.length === 0) {
      return;
    }

    new Array(2).fill(``).map(() => {
      const filmMock = randomFromArray(this._films);
      this._renderFilmCard(this._filmTopContainer, filmMock);
    });

    new Array(2).fill(``).map(() => {
      const filmMock = randomFromArray(this._films);
      this._renderFilmCard(this._filmMostContainer, filmMock);
    });
  }

  _renderFilmCard(container, filmMockData) {
    const filmCard = new FilmCard(filmMockData);
    const filmPopup = new FilmPopup(filmMockData);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeFilmPopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.getElement().addEventListener(`click`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
      showFilmPopup(filmPopup);
    });
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
    render(container, filmCard.getElement());
  }
}
