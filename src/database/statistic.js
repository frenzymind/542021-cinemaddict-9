import {statisticModel} from "../models/statistic.js";

export const getStatistic = () => statisticModel;

export const fillStatistic = (statistic, films) => {
  const countByGenres = new Map();

  films.forEach((film) => {
    if (film.watched === true) {
      statistic.totalWatched++;
    }
    statistic.totalDurationHour += film.durationHour;
    statistic.totalDurationMinute += film.durationMinute;

    film.genre.forEach((filmGenre) => {
      if (countByGenres.has(filmGenre) === true) {
        countByGenres.set(filmGenre, countByGenres.get(filmGenre) + 1);
      } else {
        countByGenres.set(filmGenre, 1);
      }
    });
  });

  const [topGenre] = Array.from(countByGenres).reduce((acc, value) => {
    return acc[1] < value[1] ? value : acc;
  }, countByGenres.entries().next().value);

  statistic.topGenre = topGenre;
};
