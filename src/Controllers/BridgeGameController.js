const BridgeGame = require('../Models/BridgeGame');
const BridgeGameState = require('../Models/BridgeGameState');

const { InputView, OutputView } = require('../Views');

const ExceptionHandler = require('../Utils/ExceptionHandler');

/** @type {function} */
let _changeListener = null;

/** @type {BridgeGame} */
let _bridgeGameInstance = null;

const BridgeGameController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start() {
    _bridgeGameInstance = new BridgeGame();
    BridgeGameController.questionMoving();
  },

  questionMoving() {
    InputView.readMoving(BridgeGameController.readMovingCallback);
  },

  readMovingCallback(moving) {
    const validateResult = ExceptionHandler.tryValidateMoving(moving);
    if (!validateResult) {
      BridgeGameController.questionMoving();
      return;
    }

    _bridgeGameInstance.move(moving);

    OutputView.printMap(_bridgeGameInstance);
    BridgeGameController.continue();
  },

  continue() {
    const isClear = _bridgeGameInstance.IsClear();
    if (isClear) {
      BridgeGameController.end();
      return;
    }

    const isRetry = _bridgeGameInstance.retry();
    if (isRetry) {
      BridgeGameController.questionGameCommand();
      return;
    }

    BridgeGameController.questionMoving();
  },

  questionGameCommand() {
    InputView.readGameCommand(BridgeGameController.readGameCommandCallback);
  },

  readGameCommandCallback(gameCommand) {
    const validateResult = ExceptionHandler.tryValidateGameCommand(gameCommand);
    if (!validateResult) {
      BridgeGameController.questionGameCommand();
      return;
    }

    if (gameCommand === 'R') {
      BridgeGameController.start();
      return;
    }

    BridgeGameController.end();
  },

  end() {
    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = BridgeGameController;
