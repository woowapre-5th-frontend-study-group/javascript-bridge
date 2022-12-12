const BridgeGame = require('../Models/BridgeGame');

const { InputView, OutputView } = require('../Views');

const ExceptionHandler = require('../Utils/ExceptionHandler');
const { convertToNumber } = require('../Utils/Helper');

let _changeListener = null;

const BridgeGameInitialController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start() {
    OutputView.printWelcomeMessage();
    this.questionBridgeSize();
  },

  questionBridgeSize() {
    InputView.readBridgeSize((bridgeSize) => this.readBridgeSizeCallback(bridgeSize)); // prettier-ignore
  },

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
  },

  createAnswerBridge(bridgeSize) {
    BridgeGame.createAnswerBridge(bridgeSize);
    this.end();
  },

  end() {
    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = BridgeGameInitialController;
