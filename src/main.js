import {getProfile} from './components/profile.js';
import {Menu} from './components/menu.js';
import {Statistic} from './components/statistic.js';
import {getFilmCard} from './database/film-card.js';
import {getFilter, fillFilter} from './database/filter.js';
import {render} from './utils/dom.js';
import {PageController} from './controllers/page.js';
import {SearchController} from './controllers/search.js';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

let allFilms = [];

allFilms = new Array(14).fill(``).map(() => getFilmCard());

const filter = getFilter();
fillFilter(filter, allFilms);

const menu = new Menu(filter);
const profile = getProfile();

const statistic = new Statistic();
statistic.fillStatistic(allFilms);

const pageController = new PageController(main, allFilms);
const searchController = new SearchController(
    header,
    allFilms,
    pageController.onSearch.bind(pageController)
);

searchController.init();

render(header, profile);

render(main, menu.getElement());

render(main, statistic.getElement());

pageController.init();
