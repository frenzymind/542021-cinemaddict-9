import {AbstractComponent} from './abstract-component.js';

export class SortBar extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="sort">
  <li><a href="#" data-sort-method="default" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" data-sort-method="date" class="sort__button">Sort by date</a></li>
  <li><a href="#" data-sort-method="rate" class="sort__button">Sort by rating</a></li>
</ul>`;
  }
}
