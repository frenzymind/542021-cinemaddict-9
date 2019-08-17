import {getSearch} from "./components/search.js";
import {getProfile} from "./components/profile.js";
import {getMenu} from "./components/menu.js";
import {getStatisticComponent} from "./components/statistic.js";
import {getFilmLayout} from "./components/film-layout.js";
import {getFilmCardComponent} from "./components/film-card.js";
// import {getFilmPopup} from "./components/film-popup.js";
import {getSortBar} from "./components/sort-bar.js";
import {getFilmCard} from "./database/film-card.js";
import {getFilter, fillFilter} from "./database/filter.js";
import {getStatistic, fillStatistic} from "./database/statistic";

const FILM_FULL_COUNT = 15;
const SHOW_MORE_COUNT = 5;

let filmShowCount = SHOW_MORE_COUNT;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const allFilms = [];

new Array(FILM_FULL_COUNT).fill(``).map(() => {
  allFilms.push(getFilmCard());
});

const filter = getFilter();
fillFilter(filter, allFilms);

const statistic = getStatistic();
fillStatistic(statistic, allFilms);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(header, getSearch());
render(header, getProfile());

render(main, getMenu(filter));
render(main, getSortBar());
render(main, getStatisticComponent(statistic));
render(main, getFilmLayout());

const filmList = document.querySelector(`.films-list__container`);

// const filmListTopRated = document.querySelector(
//     `.films-list--extra:nth-of-type(2) .films-list__container`
// );

// const filmListMostCommented = document.querySelector(
//     `.films-list--extra:nth-of-type(3) .films-list__container`
// );

const showFilmsList = () => {
  allFilms.slice(0, filmShowCount).forEach((film) => {
    render(filmList, getFilmCardComponent(film));
  });
};

showFilmsList();
// new Array(2).fill(``).forEach(() => render(filmListTopRated, getFilmCard()));
// new Array(2)
//   .fill(``)
//   .forEach(() => render(filmListMostCommented, getFilmCard()));

// const films = document.querySelectorAll(
//     `.films-list .films-list__container .film-card`
// );

// films.forEach((card) =>
//   card.addEventListener(`click`, () => {
//     render(main, getFilmPopup());
//   })
// );
