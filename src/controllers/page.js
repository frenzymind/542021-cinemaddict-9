import {render} from '../utils/dom.js';
import {randomFromArray} from '../utils/random.js';
import {getFilmLayout} from '../components/film-layout.js';
import {getNoFilm} from '../components/no-films';
import {SortBar} from '../components/sort-bar.js';
import {MovieController} from './movie.js';
import {Statistic} from '../components/statistic.js';

import RestAPI from '../utils/rest.js';
import {ACTIONS} from '../utils/rest.js';

const api = new RestAPI();

const Chart = require(`chart.js`);
const ChartDataLabels = require(`chartjs-plugin-datalabels`);

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
    this._statisticChartContainer = null;

    this._allButton = null;
    this._watchListButton = null;
    this._historyButton = null;
    this._favoriteButoon = null;
    this._showMoreButton = null;

    this._chart = null;

    this._films = films;
    this._defaultFilms = this._films;

    this._currentSort = SORT_TYPE.DEFAULT;
    this._currentFilter = FILTER_TYPE.ALL;

    this._sortBar = new SortBar();
    this._statistic = new Statistic();
  }

  init() {
    this._statistic.fillStatistic(this._films);
    render(this._container, this._statistic.getElement());

    this._statisticContainer = this._container.querySelector(`.statistic`);
    this._statisticChartContainer = this._container.querySelector(
        `.statistic__chart`
    );

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

    this._allButton = this._container
      .querySelector(`a[href="#all"]`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onFilterLinkClick(FILTER_TYPE.ALL);
      });

    this._watchListButton = this._container
      .querySelector(`a[href="#watchlist"]`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onFilterLinkClick(FILTER_TYPE.WATCH_LIST);
      });

    this._historyButton = this._container
      .querySelector(`a[href="#history"]`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onFilterLinkClick(FILTER_TYPE.HISTORY);
      });

    this._favoriteButoon = this._container
      .querySelector(`a[href="#favorites"]`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onFilterLinkClick(FILTER_TYPE.FAVORITES);
      });

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

    this._createChart();

    this._films
      .slice(filmOffsetShow - SHOW_MORE_COUNT, filmOffsetShow)
      .forEach((filmMock) => {
        this._renderFilmCard(this._filmListContainer, filmMock);
      });
  }

  _createChart() {
    if (this._chart) {
      this._chart.destroy();
    }

    const countByGenres = new Map();

    this._films.forEach((film) => {
      if (film.watched) {
        film.genre.forEach((filmGenre) => {
          if (countByGenres.has(filmGenre)) {
            countByGenres.set(filmGenre, countByGenres.get(filmGenre) + 1);
          } else {
            countByGenres.set(filmGenre, 1);
          }
        });
      }
    });

    this._chart = new Chart(this._statisticChartContainer, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Array.from(countByGenres.keys())],
        datasets: [
          {
            data: [...Array.from(countByGenres.values())],
            backgroundColor: `#ffe800`
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 22,
              weight: `bold`
            },
            color: `#fff`,
            align: `start`
          }
        },
        title: {
          display: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: `#fff`,
                fontSize: 22,
                padding: 25
              }
            }
          ]
        }
      }
    });
  }

  _updatePageFilms(isSearch = false) {
    if (!isSearch) {
      this._films = this._filterFilms(this._defaultFilms, this._currentFilter);
      this._films = this._sortFilms(this._films, this._currentSort);
    }

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
        if (this._currentFilter === FILTER_TYPE.ALL) {
          sortedFilms = this._defaultFilms.slice();
        }

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
    let filtredFilms = [];

    switch (filterType) {
      case FILTER_TYPE.ALL:
        filtredFilms = this._defaultFilms.slice();
        break;
      case FILTER_TYPE.WATCH_LIST:
        filtredFilms = films.filter((film) => film.watchList);
        break;
      case FILTER_TYPE.HISTORY:
        filtredFilms = films.filter((film) => film.watched);
        break;
      case FILTER_TYPE.FAVORITES:
        filtredFilms = films.filter((film) => film.favorite);
        break;
    }

    return filtredFilms;
  }

  _onDataChange(filmMock, action, id = null) {
    console.log(filmMock, action, id);

    switch (action) {
      case ACTIONS.COOMENT_DEL:
        api
          .deleteComment(id)
          .then(api.updateFilm(filmMock.id, filmMock))
          .then(
              api.getFilms().then((films) => {
                this._films = films;
                this._defaultFilms = films;
              })
          );
        break;
      case ACTIONS.COMMENT_ADD:
        api.createComment(filmMock.comments[id], filmMock.id);
        break;

      default:
        break;
    }

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

  onSearch(searchText) {
    this._films = this._defaultFilms.filter((film) =>
      film.title.match(searchText) ? true : false
    );

    this._updatePageFilms(true);
  }
}
