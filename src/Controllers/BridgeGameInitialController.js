const BridgeGame = require('../Models/BridgeGame');

const { OutputView } = require('../Views');

const BasicController = require('./BasicController');

const QuestionHandler = require('../Utils/QuestionHandler');
const { convertToNumber } = require('../Utils/Helper');

class BridgeGameInitialController extends BasicController {
  constructor() {
    super();
  }

  start() {
    OutputView.printWelcomeMessage();
    this.questionBridgeSize();
  }

  questionBridgeSize() {
    const { BRIDGE_SIZE } = QuestionHandler.QUESTION_TYPE;

    new QuestionHandler(BRIDGE_SIZE).question((bridgeSize) =>
      this.questionBridgeSizeCallback(bridgeSize)
    );
  }

  questionBridgeSizeCallback(bridgeSize) {
    const convertedBridgeSize = convertToNumber(bridgeSize);
    BridgeGame.setBridgeSize(convertedBridgeSize);

    this.createAnswerBridge(convertedBridgeSize);
  }

  createAnswerBridge(bridgeSize) {
    BridgeGame.createAnswerBridge(bridgeSize);
    super.end();
  }
}

module.exports = BridgeGameInitialController;
