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
  favorite: false,
  comments: []
};

export const getFilmModel = () => ({
  ...filmModel,
  genre: new Set(),
  comments: [...filmModel.comments]
});
