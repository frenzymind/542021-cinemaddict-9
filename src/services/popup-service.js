export const showFilmPopup = (cb) => {
  const activePopup = document.querySelector(`.film-details`);

  if (activePopup !== null) {
    activePopup.remove();
  }
  cb();
};

export const closeFilmPopup = () => {
  const activePopup = document.querySelector(`.film-details`);
  activePopup.remove();
};
