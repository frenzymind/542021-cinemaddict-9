import {render, unrender} from '../utils/dom.js';

const body = document.querySelector(`body`);

let activePopup = null;
let closeBtn = null;

export const showFilmPopup = (filmPopup) => {
  if (activePopup) {
    closeFilmPopup();
  }

  render(body, filmPopup.getElement());

  activePopup = filmPopup;

  closeBtn = document.querySelector(`.film-details__close-btn`);
  closeBtn.addEventListener(`click`, closeFilmPopup);
};

export const closeFilmPopup = () => {
  closeBtn.removeEventListener(`click`, closeFilmPopup);
  unrender(activePopup.getElement());
  activePopup.removeElement();
};
