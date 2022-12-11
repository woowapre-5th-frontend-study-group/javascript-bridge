const BridgeGame = require('../Models/BridgeGame');
const { OutputView } = require('../Views');

let _changeListener = null;

/** @type {BridgeGame} */
let _bridgeGameInstance = null;

const BridgeGameResultController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start(bridgeGameInstance) {
    _bridgeGameInstance = bridgeGameInstance;
    BridgeGameResultController.printGameFinalResult();
  },

  printGameFinalResult() {
    OutputView.printResult(_bridgeGameInstance);
    BridgeGameResultController.end();
  },

  end() {
    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = BridgeGameResultController;
