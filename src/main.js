import {Search} from './components/search.js';
import {getProfile} from './components/profile.js';
import {Menu} from './components/menu.js';
import {Statistic} from './components/statistic.js';
import {SortBar} from './components/sort-bar.js';
import {getFilmCard} from './database/film-card.js';
import {getFilter, fillFilter} from './database/filter.js';
import {render} from './utils/dom.js';
import {PageController} from './controllers/page.js';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

let allFilms = [];

allFilms = new Array(14).fill(``).map(() => getFilmCard());

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

const pageController = new PageController(main, allFilms);

pageController.init();
