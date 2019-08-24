import {render, unrender} from "../utils/dom.js";

let activePopup = null;
let closeBtn = null;

export const showFilmPopup = (container, filmPopup) => {
  if (activePopup) {
    closeFilmPopup();
  }

  render(container, filmPopup.getElement());

  activePopup = filmPopup;

  closeBtn = document.querySelector(`.film-details__close-btn`);
  closeBtn.addEventListener(`click`, closeFilmPopup);
};

export const closeFilmPopup = () => {
  closeBtn.removeEventListener(`click`, closeFilmPopup);
  unrender(activePopup.getElement());
  activePopup.removeElement();
};
