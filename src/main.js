import {getSearch} from "./components/search.js";
import {getProfile} from "./components/profile.js";
import {getMenu} from "./components/menu.js";
import {getStatisticComponent} from "./components/statistic.js";
import {getFilmLayout} from "./components/film-layout.js";
import {FilmCard} from "./components/film-card.js";
import {FilmPopup} from "./components/film-popup.js";
import {getSortBar} from "./components/sort-bar.js";
import {getFilmCard} from "./database/film-card.js";
import {getFilter, fillFilter} from "./database/filter.js";
import {getStatistic, fillStatistic} from "./database/statistic";
import {showFilmPopup} from "./services/popup-service.js";
import {randomFromArray} from "./utils/random.js";

import {render} from "./utils/dom.js";

const FILM_FULL_COUNT = 20;
const SHOW_MORE_COUNT = 5;

let filmOffsetShow = SHOW_MORE_COUNT;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

let allFilms = [];

new Array(FILM_FULL_COUNT).fill(``).map(() => {
  allFilms.push(getFilmCard());
});

const filter = getFilter();
fillFilter(filter, allFilms);

const statistic = getStatistic();
fillStatistic(statistic, allFilms);

// render(header, getSearch());
// render(header, getProfile());

// render(main, getMenu(filter));
// render(main, getSortBar());
// render(main, getStatisticComponent(statistic));
render(main, getFilmLayout());

const filmList = document.querySelector(`.films-list__container`);

const filmListTopRated = document.querySelector(
    `.films-list--extra:nth-of-type(2) .films-list__container`
);

const filmListMostCommented = document.querySelector(
    `.films-list--extra:nth-of-type(3) .films-list__container`
);

const renderFilmCard = (filmMockData) => {
  const filmCard = new FilmCard(filmMockData);
  const filmPopup = new FilmPopup(filmMockData);

  filmCard.getElement().addEventListener(`click`, () => {
    showFilmPopup(main, filmPopup);
  });

  render(filmList, filmCard.getElement());
};

const showFilmsList = () => {
  allFilms
    .slice(filmOffsetShow - SHOW_MORE_COUNT, filmOffsetShow)
    .forEach((filmMock) => {
      renderFilmCard(filmMock);
    });
};

const showMoreButton = document.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  filmOffsetShow += SHOW_MORE_COUNT;

  showFilmsList();

  if (filmOffsetShow === allFilms.length) {
    showMoreButton.style.display = `none`;
    return;
  }
});

showFilmsList();

// new Array(2)
//   .fill(``)
//   .map(() =>
//     render(filmListTopRated, getFilmCardComponent(randomFromArray(allFilms)))
//   );

// new Array(2)
//   .fill(``)
//   .forEach(() =>
//     render(
//         filmListMostCommented,
//         getFilmCardComponent(randomFromArray(allFilms))
//     )
//   );

// const films = document.querySelectorAll(
//     `.films-list .films-list__container .film-card`
// );

// films.forEach((film, index) =>
//   film.addEventListener(`click`, () => {
//     showFilmPopup(main, getFilmPopup(allFilms[index]));
//   })
// );
