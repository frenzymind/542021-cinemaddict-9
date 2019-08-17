const filmModel = {
  title: ``,
  rating: ``,
  year: ``,
  durationHour: ``,
  durationMinute: ``,
  genre: ``,
  imgSrc: ``,
  description: ``,
  commentsCount: 0,
  watchList: false,
  watched: false,
  favorite: false
};

export const getFilmModel = () => ({
  ...filmModel
});
