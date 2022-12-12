/** Abstract Class */
class BasicController {
  #changeLisener = null;

  constructor() {}

  subscribe(callbackFunction) {
    this.#changeLisener = callbackFunction;
  }

  start() {}

  end(param = null) {
    if (this.#changeLisener) {
      this.#changeLisener(param);
    }
  }
}

module.exports = BasicController;
