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
    this.printGameFinalResult();
  },

  printGameFinalResult() {
    OutputView.printResult(_bridgeGameInstance);
    this.end();
  },

  end() {
    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = BridgeGameResultController;
