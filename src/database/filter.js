import {filterModel} from "../models/filter.js";

export const getFilter = () => filterModel;

export const fillFilter = (filter, films) => {
  films.forEach((film) => {
    if (film.favorite === true) {
      filter.favorite++;
    }
    if (film.watched === true) {
      filter.watched++;
    }
    if (film.watchList === true) {
      filter.watchList++;
    }
  });
};
