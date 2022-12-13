/** Models Imported */
const BridgeGame = require('../Models/BridgeGame');

/** Views Imported */
const { OutputView } = require('../Views');

/** Controller Imported */
const BasicController = require('./BasicController');

/** Utils Imported */
const QuestionHandler = require('../Utils/QuestionHandler');
const { convertToNumber } = require('../Utils/Helper');

class BridgeGameInitialController extends BasicController {
  constructor() {
    super();
  }

  start() {
    OutputView.printWelcomeMessage();
    this.#questionBridgeSize();
  }

  #questionBridgeSize() {
    const { BRIDGE_SIZE } = QuestionHandler.QUESTION_TYPE;

    new QuestionHandler(BRIDGE_SIZE).question((bridgeSize) =>
      this.#questionBridgeSizeCallback(bridgeSize)
    );
  }

  /** @param {string} bridgeSize */
  #questionBridgeSizeCallback(bridgeSize) {
    const convertedBridgeSize = convertToNumber(bridgeSize);
    BridgeGame.setBridgeSize(convertedBridgeSize);

    this.#createAnswerBridge(convertedBridgeSize);
  }

  /** @param {number} bridgeSize */
  #createAnswerBridge(bridgeSize) {
    BridgeGame.createAnswerBridge(bridgeSize);
    super.end();
  }
}

module.exports = BridgeGameInitialController;
