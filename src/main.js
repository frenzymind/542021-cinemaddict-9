import {getSearch} from "./components/search.js";
import {getProfile} from "./components/profile.js";

const header = document.querySelector(`.header`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(header, getSearch());
render(header, getProfile());
