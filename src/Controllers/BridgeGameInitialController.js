const BridgeGame = require('../Models/BridgeGame');

const { InputView, OutputView } = require('../Views');

const BasicController = require('./BasicController');

const ExceptionHandler = require('../Utils/ExceptionHandler');
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
    InputView.readBridgeSize((bridgeSize) => this.readBridgeSizeCallback(bridgeSize)); // prettier-ignore
  }

  readBridgeSizeCallback(bridgeSize) {
    OutputView.addNewLine();

    const validateResult = ExceptionHandler.tryValidateBridgeSize(bridgeSize);
    if (!validateResult) {
      this.questionBridgeSize();
      return;
    }

    const convertedBridgeSize = convertToNumber(bridgeSize);
    BridgeGame.setBridgeSize(convertedBridgeSize);

    this.createAnswerBridge(convertedBridgeSize);
  }

  createAnswerBridge(bridgeSize) {
    BridgeGame.createAnswerBridge(bridgeSize);
    this.end();
  }
}

module.exports = BridgeGameInitialController;
