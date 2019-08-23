import {Search} from "./components/search.js";
import {getProfile} from "./components/profile.js";
import {Menu} from "./components/menu.js";
import {Statistic} from "./components/statistic.js";
import {getFilmLayout} from "./components/film-layout.js";
import {FilmCard} from "./components/film-card.js";
import {FilmPopup} from "./components/film-popup.js";
import {SortBar} from "./components/sort-bar.js";
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

const SearchBar = new Search();
render(header, SearchBar.getElement());

render(header, getProfile());

const menu = new Menu(filter);
render(main, menu.getElement());

const sortBar = new SortBar();
render(main, sortBar.getElement());

const statisticComponent = new Statistic(statistic);
render(main, statisticComponent.getElement());

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

new Array(2).fill(``).map(() => {
  const filmCard = new FilmCard(randomFromArray(allFilms));
  render(filmListTopRated, filmCard.getElement());
});

new Array(2).fill(``).map(() => {
  const filmCard = new FilmCard(randomFromArray(allFilms));
  render(
      filmListMostCommented,
      render(filmListMostCommented, filmCard.getElement())
  );
});
