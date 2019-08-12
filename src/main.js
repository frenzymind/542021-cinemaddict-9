import {getSearch} from "./components/search.js";
import {getProfile} from "./components/profile.js";
import {getMenu} from "./components/menu.js";
import {getStatistic} from "./components/statistic.js";
import {getFilmLayout} from "./components/film-layout.js";
import {getFilmCard} from "./components/film-card.js";
import {getFilmPopup} from "./components/film-popup.js";
import {getSortBar} from "./components/sort-bar.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(header, getSearch());
render(header, getProfile());

render(main, getMenu());
render(main, getSortBar());
render(main, getStatistic());
render(main, getFilmLayout());

const filmList = document.querySelector(`.films-list__container`);

const filmListTopRated = document.querySelector(
    `.films-list--extra:nth-of-type(1) .films-list__container`
);

const filmListMostCommented = document.querySelector(
    `.films-list--extra:nth-of-type(2) .films-list__container`
);

new Array(5).fill(``).forEach(() => render(filmList, getFilmCard()));
new Array(2).fill(``).forEach(() => render(filmListTopRated, getFilmCard()));
new Array(2)
  .fill(``)
  .forEach(() => render(filmListMostCommented, getFilmCard()));

// render(main, getFilmPopup());
