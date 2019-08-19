let activePopup;
let closeBtn;

export const showFilmPopup = (container, template) => {
  if (activePopup !== undefined) {
    closeFilmPopup();
  }

  container.insertAdjacentHTML(`beforeend`, template);

  activePopup = document.querySelector(`.film-details`);
  closeBtn = activePopup.querySelector(`.film-details__close-btn`);
  closeBtn.addEventListener(`click`, closeFilmPopup);
};

export const closeFilmPopup = () => {
  closeBtn.removeEventListener(`click`, closeFilmPopup);
  activePopup.remove();
};
