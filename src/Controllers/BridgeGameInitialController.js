const BridgeGameState = require('../Models/BridgeGameState');
const BridgeGame = require('../Models/BridgeGame');

const { InputView, OutputView } = require('../Views');

const ExceptionHandler = require('../Utils/ExceptionHandler');
const BridgeRandomNumberGenerator = require('../Utils/BridgeRandomNumberGenerator');
const BridgeMaker = require('../Utils/BridgeMaker');
const { convertToNumber } = require('../Utils/Helper');
const Bridge = require('../Models/Bridge');

let _changeListener = null;

const BridgeGameInitialController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start() {
    OutputView.printWelcomeMessage();
    BridgeGameInitialController.questionBridgeSize();
  },

  questionBridgeSize() {
    InputView.readBridgeSize(
      BridgeGameInitialController.readBridgeSizeCallback
    );
  },

  readBridgeSizeCallback(bridgeSize) {
    const validateResult = ExceptionHandler.tryValidateBridgeSize(bridgeSize);
    if (!validateResult) {
      BridgeGameInitialController.questionBridgeSize();
      return;
    }

    const convertedValue = convertToNumber(bridgeSize);
    // BridgeGameState.setBridgeSize(convertedValue);
    BridgeGame.setBridgeSize(convertedValue);

    BridgeGameInitialController.createAnswerBridge();
  },

  createAnswerBridge() {
    const bridgeSize = BridgeGameState.getBridgeSize();
    const bridgeData = BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate
    );

    console.log('생성된 정답 다리:');
    BridgeGame.createAnswerBridge();
    // BridgeGameState.setAnswerBridge(new Bridge(bridgeData));
    BridgeGameInitialController.end();
  },

  end() {
    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = BridgeGameInitialController;
