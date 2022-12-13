const BridgeGame = require('../Models/BridgeGame');

const { OutputView } = require('../Views');

const BasicController = require('./BasicController');

class BridgeGameResultController extends BasicController {
  /** @type {BridgeGame} */
  #bridgeGameInstance = null;

  constructor() {
    super();
  }

  start(bridgeGameInstance) {
    this.#bridgeGameInstance = bridgeGameInstance;
    this.#printGameFinalResult();
  }

  #printGameFinalResult() {
    OutputView.printResult(this.#bridgeGameInstance);
    super.end();
  }
}

module.exports = BridgeGameResultController;
