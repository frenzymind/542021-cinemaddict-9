import {getFilmModel} from "../models/film-card.js";
import {getCommentModel} from "../models/comment.js";
import {
  randomRange,
  randomFromArray,
  randomBool,
  randomDate
} from "../utils/random.js";

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

const EMOJI = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

export const getFilmCard = () => {
  const film = getFilmModel();

  film.title = randomFromArray(TITLES);
  film.rating = randomRange(0, 11);
  film.year = randomDate(new Date(2009, 0, 1), new Date()).getTime(); // randomRange(2001, 2019);
  film.durationHour = randomRange(0, 2);
  film.durationMinute = randomRange(20, 51);
  film.genre.add(randomFromArray(GENRES));
  film.imgSrc = `./images/posters/${randomFromArray(POSTERS)}`;

  // "случайным образом объединяйте от одного до трёх предложений."
  film.description += randomFromArray(DESCRIPTIONS);
  new Array(2).fill(``).forEach(() => {
    if (randomRange(0, 2) === 1) {
      film.description += randomFromArray(DESCRIPTIONS);
    }
  });

  film.commentsCount = randomRange(0, 5);
  film.watchList = randomBool();
  film.watched = randomBool();
  film.favorite = randomBool();

  new Array(film.commentsCount).fill(``).map(() => {
    const comment = getCommentModel();

    comment.emoji = randomFromArray(EMOJI);
    comment.text = randomFromArray(DESCRIPTIONS);
    comment.author = `Quentin Tarantino`;
    comment.daysAgo = randomDate(new Date(2009, 0, 1), new Date()).getTime(); // randomRange(0, 3);

    film.comments.push(comment);
  });

  return film;
};
