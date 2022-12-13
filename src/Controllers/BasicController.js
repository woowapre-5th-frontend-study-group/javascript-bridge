/** Abstract Class */
class BasicController {
  /** @type {function} */
  #changeLisener = null;

  constructor() {}

  /** @param {function} callbackFunction */
  subscribe(callbackFunction) {
    this.#changeLisener = callbackFunction;
  }

  start() {}

  /** @param {any} param */
  end(param = null) {
    if (this.#changeLisener) {
      this.#changeLisener(param);
    }
  }
}

module.exports = BasicController;
