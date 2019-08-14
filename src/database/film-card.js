import {filmModel} from "../models/film-card.js";
import {randomRange} from "../utils/random.js";

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
  const film = filmModel;

  film.title = TITLES[randomRange(0, TITLES.length)];
  film.rating = `${randomRange(0, 11)}`;
  film.info.year = `${randomRange(2001, 2019)}`;
  film.info.duration = `${randomRange(0, 2)}h ${randomRange(20, 51)}m`;
  film.info.genre = GENRES[randomRange(0, GENRES.length)];
  film.imgSrc = `./images/posters/${POSTERS[randomRange(0, POSTERS.length)]}`;

  new Array(3).fill(``).forEach(() => {
    if (randomRange(0, 2) === 1) {
      film.description += `${
        DESCRIPTIONS[randomRange(0, DESCRIPTIONS.length)]
      }`;
    }
  });

  film.commentsCount = `${randomRange(0, 5)}`;

  return film;
};
