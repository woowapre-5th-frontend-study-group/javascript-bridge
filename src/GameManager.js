const Bridge = require('./models/Bridge');
const BridgeGame = require('./models/BridgeGame');
const { InputView, OutputView } = require('./views/IOView');
const { makeBridge } = require('./BridgeMaker');
const { generate } = require('./BridgeRandomNumberGenerator');

class GameManager {
  #bridge;
  #bridgeGame = new BridgeGame();

  start() {
    OutputView.printStartMessage();

    this.requestBridgeSize();
  }

  requestBridgeSize() {
    InputView.readBridgeSize((bridegSize) => this.handleBridgeSize(bridegSize));
  }

  handleBridgeSize(bridegSize) {
    this.#bridge = new Bridge(bridegSize);
  }
}

module.exports = GameManager;
