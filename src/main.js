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
import {showFilmPopup, closeFilmPopup} from "./services/popup-service.js";
import {randomFromArray} from "./utils/random.js";
import {getNoFilm} from "./components/no-films";
import {render} from "./utils/dom.js";

const FILM_FULL_COUNT = 14;
const SHOW_MORE_COUNT = 5;

let filmOffsetShow = SHOW_MORE_COUNT;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

let allFilms = [];

allFilms = new Array(FILM_FULL_COUNT).fill(``).map(() => getFilmCard());

const filter = getFilter();
fillFilter(filter, allFilms);

const SearchBar = new Search();
render(header, SearchBar.getElement());

const profile = getProfile();

render(header, profile);

const menu = new Menu(filter);
render(main, menu.getElement());

const sortBar = new SortBar();
render(main, sortBar.getElement());

const statistic = new Statistic();
statistic.fillStatistic(allFilms);
render(main, statistic.getElement());

render(main, getFilmLayout());

const filmList = document.querySelector(`.films-list__container`);

const filmListTopRated = document.querySelector(
    `.films-list--extra:nth-of-type(2) .films-list__container`
);

const filmListMostCommented = document.querySelector(
    `.films-list--extra:nth-of-type(3) .films-list__container`
);

const checkFilmsExist = () => {
  if (allFilms.length === 0) {
    render(filmList, getNoFilm());
  }
};

const onEscKeyDown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    closeFilmPopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};

const renderFilmCard = (filmMockData) => {
  const filmCard = new FilmCard(filmMockData);
  const filmPopup = new FilmPopup(filmMockData);

  filmCard.getElement().addEventListener(`click`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
    showFilmPopup(main, filmPopup);
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

  render(filmList, filmCard.getElement());
};

const showFilmsList = () => {
  allFilms
    .slice(filmOffsetShow - SHOW_MORE_COUNT, filmOffsetShow)
    .forEach((filmMock) => {
      renderFilmCard(filmMock);
    });
};

const showExtraFilms = () => {
  if (allFilms.length === 0) {
    return;
  }

  new Array(2).fill(``).map(() => {
    const filmCard = new FilmCard(randomFromArray(allFilms));
    render(filmListTopRated, filmCard.getElement());
  });

  new Array(2).fill(``).map(() => {
    const filmCard = new FilmCard(randomFromArray(allFilms));
    render(filmListMostCommented, filmCard.getElement());
  });
};

const showMoreButton = document.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  filmOffsetShow += SHOW_MORE_COUNT;

  showFilmsList();

  if (filmOffsetShow >= allFilms.length) {
    showMoreButton.style.display = `none`;
  }
});

showFilmsList();
showExtraFilms();
checkFilmsExist();
