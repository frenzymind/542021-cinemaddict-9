import {createElement} from "../utils/dom.js";

export const getNoFilm = () =>
  createElement(
      `<div class="no-result">
      There is no movies for your request.
    </div>`
  );
