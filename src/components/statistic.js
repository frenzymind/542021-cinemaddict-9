import {createElement} from "../utils/dom.js";

export class Statistic {
  constructor() {
    this._element = null;

    this._totalWatched = null;
    this._totalDurationHour = null;
    this._totalDurationMinute = null;
    this._topGenre = null;
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
    return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">Sci-Fighter</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${
  this._totalWatched
} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${
  this._totalDurationHour
} <span class="statistic__item-description">h</span> ${
  this._totalDurationMinute
} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${this._topGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
  }

  fillStatistic(films) {
    if (films.length === 0) {
      return;
    }

    const countByGenres = new Map();

    films.forEach((film) => {
      if (film.watched === true) {
        this._totalWatched++;
      }
      this._totalDurationHour += film.durationHour;
      this._totalDurationMinute += film.durationMinute;

      film.genre.forEach((filmGenre) => {
        if (countByGenres.has(filmGenre)) {
          countByGenres.set(filmGenre, countByGenres.get(filmGenre) + 1);
        } else {
          countByGenres.set(filmGenre, 1);
        }
      });
    });

    const [topGenre] = Array.from(countByGenres).reduce((acc, value) => {
      return acc[1] < value[1] ? value : acc;
    }, countByGenres.entries().next().value);

    this._topGenre = topGenre;
  }
}
