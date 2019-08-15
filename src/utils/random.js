export const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
