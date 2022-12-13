/** Controllers Imported */
const {
  BridgeGameInitialController,
  BridgeGameController,
  BridgeGameResultController,
} = require('./Controllers');

/** Methods Imported */
const { close } = require('./Views/');

class App {
  /** @type {BridgeGameInitialController} */
  #bridgeGameInitialController;

  /** @type {BridgeGameController} */
  #bridgeGameController;

  /** @type {BridgeGameResultController} */
  #bridgeGameResultController;

  constructor() {
    this.#bridgeGameInitialController = new BridgeGameInitialController();
    this.#bridgeGameController = new BridgeGameController();
    this.#bridgeGameResultController = new BridgeGameResultController();

    this.#bridgeGameInitialController.subscribe(() => this.#bridgeGameController.start()); // prettier-ignore
    this.#bridgeGameController.subscribe((gameInstance) =>this.#bridgeGameResultController.start(gameInstance)); // prettier-ignore
    this.#bridgeGameResultController.subscribe(() => this.endService());
  }

  play() {
    this.startService();
  }

  startService() {
    this.#bridgeGameInitialController.start();
  }

  endService() {
    close();
  }
}

module.exports = App;
