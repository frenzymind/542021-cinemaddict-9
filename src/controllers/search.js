import {Search} from "../components/search.js";
import {render} from "../utils/dom.js";

export class SearchController {
  constructor(container, films, searchChange) {
    this._container = container;
    this._films = films;

    this._searchText = ``;
    this._timer = null;

    this._searchChange = searchChange;

    this._searchBar = new Search();
  }

  init() {
    render(this._container, this._searchBar.getElement());

    this._searchBar
      .getElement()
      .querySelector(`.search__reset`)
      .addEventListener(`click`, () => {
        this._searchText = ``;
        this._searchChange(this._searchText);
      });

    this._searchBar
      .getElement()
      .querySelector(`input`)
      .addEventListener(`keydown`, (evt) => {
        const charCode = evt.keyCode;

        if (charCode === 8) {
          this._searchText = this._searchText.slice(0, -1);
        }

        if (
          (charCode > 64 && charCode < 91) ||
          (charCode > 96 && charCode < 123)
        ) {
          this._searchText += evt.key;
        }

        clearTimeout(this._timer);

        this._timer = setTimeout(() => {
          if (this._searchText.length >= 3 || this._searchText.length === 0) {
            this._searchChange(this._searchText);
          } else {
            this._searchChange(``);
          }
        }, 500);
      });
  }
}
