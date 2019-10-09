import {getProfile} from './components/profile.js';
import {Menu} from './components/menu.js';
import {getFilter, fillFilter} from './database/filter.js';
import {render} from './utils/dom.js';
import {PageController} from './controllers/page.js';
import {SearchController} from './controllers/search.js';
import RestAPI from './utils/rest.js';

const api = new RestAPI();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

api.getFilms().then((films) => {
  const filter = getFilter();
  fillFilter(filter, films);

  const menu = new Menu(filter);
  const profile = getProfile();

  const pageController = new PageController(main, films);
  const searchController = new SearchController(
      header,
      films,
      pageController.onSearch.bind(pageController)
  );

  searchController.init();

  render(header, profile);

  render(main, menu.getElement());

  pageController.init();
});
