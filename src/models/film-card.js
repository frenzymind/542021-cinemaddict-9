const filmModel = {
  title: ``,
  rating: ``,
  info: {year: ``, duration: ``, genre: ``},
  imgSrc: ``,
  description: ``,
  commentsCount: `0`
};

export const getFilmModel = () => ({
  ...filmModel,
  info: {...filmModel.info}
});
