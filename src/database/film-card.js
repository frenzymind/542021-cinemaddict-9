import {getFilmModel} from "../models/film-card.js";
import {randomRange, randomFromArray} from "../utils/random.js";

const TITLES = [
  `Молчание ягнят`,
  `Терминатор`,
  `Морской бой`,
  `Обитель зла`,
  `Пляж`,
  `Челюсти`,
  `Убить Билла`,
  `Коммандос`,
  `Хищник`,
  `Титаник`,
  `Темный рыцарь`,
  `Бессонница`,
  `Крикуны`,
  `Кровавый алмаз`,
  `Риддик`
];

const GENRES = [`Detective`, `Horror`, `Mistyc`, `Action`, `Adventure`];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const getFilmCard = () => {
  const film = getFilmModel();

  film.title = randomFromArray(TITLES);
  film.rating = `${randomRange(0, 11)}`;
  film.info.year = `${randomRange(2001, 2019)}`;
  film.info.duration = `${randomRange(0, 2)}h ${randomRange(20, 51)}m`;
  film.info.genre = randomFromArray(GENRES);
  film.imgSrc = `./images/posters/${randomFromArray(POSTERS)}`;

  // "случайным образом объединяйте от одного до трёх предложений."
  film.description += `${randomFromArray(DESCRIPTIONS)}`;
  new Array(2).fill(``).forEach(() => {
    if (randomRange(0, 2) === 1) {
      film.description += `${randomFromArray(DESCRIPTIONS)}`;
    }
  });

  film.commentsCount = `${randomRange(0, 5)}`;

  return film;
};
