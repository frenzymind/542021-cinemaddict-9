import {render} from '../utils/dom.js';
import {randomFromArray} from '../utils/random.js';
import {getFilmLayout} from '../components/film-layout.js';
import {getNoFilm} from '../components/no-films';
import {SortBar} from '../components/sort-bar.js';
import {MovieController} from './movie.js';

const SHOW_MORE_COUNT = 5;

const SORT_TYPE = {
  DEFAULT: `default`,
  DATE: `date`,
  RATE: `rate`
};

const FILTER_TYPE = {
  ALL: `all`,
  WATCH_LIST: `watchList`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

let filmOffsetShow = SHOW_MORE_COUNT;

export class PageController {
  constructor(container, films) {
    this._container = container;

    this._filmListContainer = null;
    this._filmTopContainer = null;
    this._filmMostContainer = null;
    this._statisticContainer = null;

    this._showMoreButton = null;

    this._films = films;
    this._defaultFilms = this._films;

    this._currentSort = SORT_TYPE.DEFAULT;
    this._currentFilter = FILTER_TYPE.ALL;

    this._sortBar = new SortBar();
  }

  init() {
    render(this._container, this._sortBar.getElement());

    this._sortBar._onSortLinkClick = this._onSortLinkClick.bind(this);

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

      this.renderFilms();

      if (filmOffsetShow >= this._films.length) {
        this._showMoreButton.style.display = `none`;
      }
    });

    this._statisticContainer = this._container.querySelector(`.statistic`);

    this._container
      .querySelector(`.main-navigation__item--additional`)
      .addEventListener(`click`, this._toggleStatistic.bind(this));

    this.renderFilms();
    this.renderFilmsExtra();
  }

  renderFilms() {
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

  _updatePageFilms() {
    this._films = this._filterFilms(this._films, this._currentFilter);

    this._films = this._sortFilms(this._films, this._currentSort);

    this._resetPage();
    this.renderFilms();
  }

  renderFilmsExtra() {
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

  _onSortLinkClick(sortType) {
    this._currentSort = sortType;
    this._updatePageFilms();
  }

  _onFilterLinkClick(filterType) {
    this._currentFilter = filterType;
    this._updatePageFilms();
  }

  _sortFilms(films, sortType) {
    let sortedFilms = films.slice();

    switch (sortType) {
      case SORT_TYPE.DEFAULT:
        sortedFilms = this._defaultFilms.slice();
        break;
      case SORT_TYPE.DATE:
        sortedFilms.sort((a, b) => b.year - a.year);
        break;
      case SORT_TYPE.RATE:
        sortedFilms.sort((a, b) => b.rating - a.rating);
        break;
    }

    return sortedFilms;
  }

  _filterFilms(films, filterType) {
    switch (filterType) {
      case FILTER_TYPE.ALL:
        break;
      case FILTER_TYPE.WATCH_LIST:
        break;
      case FILTER_TYPE.HISTORY:
        break;
      case FILTER_TYPE.FAVORITES:
        break;
    }

    return films.slice();
  }

  _onDataChange() {
    this._updatePageFilms();
  }

  _resetPage() {
    this._filmListContainer.innerHTML = ``;
    this._filmMostContainer.innerHTML = ``;
    this._filmTopContainer.innerHTML = ``;

    filmOffsetShow = SHOW_MORE_COUNT;
    this._showMoreButton.style.display = `block`;
  }

  _renderFilmCard(container, filmMockData) {
    const movieController = new MovieController(
        container,
        filmMockData,
        this._onDataChange.bind(this)
    );

    movieController.init();
  }

  _toggleStatistic() {
    this._statisticContainer.classList.toggle(`visually-hidden`);
  }

  onSearchKeyPress() {}
}
