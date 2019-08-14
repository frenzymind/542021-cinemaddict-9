export const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomFromArray = (arr) => arr[randomRange(0, arr.length)];
