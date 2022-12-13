/** Models Imported */
const BridgeGame = require('../Models/BridgeGame');

/** Views Imported */
const { OutputView } = require('../Views');

/** Controller Imported */
const BasicController = require('./BasicController');

class BridgeGameResultController extends BasicController {
  /** @type {BridgeGame} */
  #bridgeGameInstance = null;

  constructor() {
    super();
  }

  /** @param {BridgeGame} bridgeGameInstance */
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
