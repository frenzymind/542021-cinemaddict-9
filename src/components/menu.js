export const getMenu = (filter) => {
  return `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${
  filter.watchList
}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${
  filter.watched
}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${
  filter.favorite
}</span></a>
  <a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>
</nav>`;
};
