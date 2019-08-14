import {getSearch} from "./components/search.js";
import {getProfile} from "./components/profile.js";
import {getMenu} from "./components/menu.js";
import {getStatistic} from "./components/statistic.js";
import {getFilmLayout} from "./components/film-layout.js";
import {getFilmCardComponent} from "./components/film-card.js";
import {getFilmPopup} from "./components/film-popup.js";
import {getSortBar} from "./components/sort-bar.js";
import {getFilmCard} from "./database/film-card.js";

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
    `.films-list--extra:nth-of-type(2) .films-list__container`
);

const filmListMostCommented = document.querySelector(
    `.films-list--extra:nth-of-type(3) .films-list__container`
);

new Array(5).fill(``).forEach(() => {
  const s = getFilmCard();
  console.log(s);
});
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
