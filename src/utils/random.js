export const randomRange = (min, max = 0) =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomBool = () => Boolean(Math.round(Math.random()));

export const randomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
