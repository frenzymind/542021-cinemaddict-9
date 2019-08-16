const filmModel = {
  title: ``,
  rating: ``,
  info: {year: ``, duration: ``, genre: ``},
  imgSrc: ``,
  description: ``,
  commentsCount: 0,
  watchList: false,
  watched: false,
  favorite: false
};

export const getFilmModel = () => ({
  ...filmModel,
  info: {...filmModel.info}
});
