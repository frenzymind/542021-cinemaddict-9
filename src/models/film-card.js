/* eslint-disable camelcase */
const filmModel = {
  id: null,
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
  comments: [],
  ageRating: ``,
  alterTitle: ``,
  director: ``,
  writers: ``,
  actors: ``,
  releaseCountry: ``,
  personalRating: ``
};

export const getFilmModel = () => ({
  ...filmModel,
  genre: new Set(),
  writers: new Set(),
  actors: new Set(),
  comments: [...filmModel.comments]
});

export const parseFilms = (rawFilms) => {
  const filmsMock = [];

  rawFilms.forEach((rawFilm) => {
    const film = getFilmModel();

    film.id = +rawFilm.id;

    film.ageRating = rawFilm.film_info.age_rating;
    film.alterTitle = rawFilm.film_info.alternative_title;
    film.director = rawFilm.film_info.director;
    rawFilm.film_info.writers.forEach((writer) => {
      film.writers.add(writer);
    });
    rawFilm.film_info.actors.forEach((actor) => film.actors.add(actor));
    film.releaseCountry = rawFilm.film_info.release.release_country;
    film.personalRating = rawFilm.user_details.personal_rating;

    film.title = rawFilm.film_info.title;
    film.rating = rawFilm.film_info.total_rating;
    film.year = rawFilm.film_info.release.date;
    film.durationHour = getHours(rawFilm.film_info.runtime);
    film.durationMinute = getMinutes(rawFilm.film_info.runtime);

    rawFilm.film_info.genre.forEach((genre) => {
      film.genre.add(genre);
    });

    film.imgSrc = rawFilm.film_info.poster;
    film.description = rawFilm.film_info.description;
    film.commentsCount = rawFilm.comments.length;

    film.watchList = rawFilm.user_details.watchlist;
    film.watched = rawFilm.user_details.already_watched;
    film.favorite = rawFilm.user_details.favorite;

    film.comments = rawFilm.comments;

    filmsMock.push(film);
  });

  return filmsMock;
};

const getHours = (duration) => {
  return Math.floor(duration / 60);
};

const getMinutes = (duration) => {
  return parseInt(duration % 60, 10);
};

export const filmToRaw = (mock) => {
  const raw = {
    id: ``,
    film_info: {
      title: ``,
      alternative_title: ``,
      total_rating: 4.3,
      poster: ``,
      age_rating: 6,
      director: ``,
      writers: ``,
      actors: ``,
      release: {
        date: ``,
        release_country: ``
      },
      runtime: 183,
      genre: ``,
      description: ``
    },
    user_details: {
      personal_rating: 5,
      watchlist: false,
      already_watched: true,
      watching_date: ``,
      favorite: false
    },
    comments: ``
  };

  raw.id = `${mock.id}`;
  raw.film_info.title = mock.title;
  raw.film_info.alternative_title = mock.alterTitle;
  raw.film_info.total_rating = mock.rating;
  raw.film_info.poster = mock.imgSrc;
  raw.film_info.age_rating = mock.ageRating;
  raw.film_info.director = mock.director;
  raw.film_info.writers = [...mock.writers];
  raw.film_info.actors = [...mock.actors];
  raw.film_info.release.date = mock.year;
  raw.film_info.release.release_country = mock.releaseCountry;
  raw.film_info.runtime = mock.durationHour * 60 + mock.durationMinute;
  raw.film_info.genre = [...mock.genre];
  raw.film_info.description = mock.description;

  raw.user_details.personal_rating = mock.personalRating;
  raw.user_details.watchlist = mock.watchList;
  raw.user_details.already_watched = mock.watched;
  raw.user_details.watching_date = mock.year;
  raw.user_details.favorite = mock.favorite;

  raw.comments = [...mock.comments];

  return raw;
};
