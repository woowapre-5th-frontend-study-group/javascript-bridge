/** Abstract Class */
class BasicController {
  #changeLisener = null;

  constructor() {}

  subscribe(callbackFunction) {
    this.#changeLisener = callbackFunction;
  }

  start() {}

  end() {
    if (this.#changeLisener) {
      this.#changeLisener();
    }
  }
}

module.exports = BasicController;
