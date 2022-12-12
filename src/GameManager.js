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

  requestBridgeSize(error) {
    InputView.readBridgeSize((bridegSize) => this.handleBridgeSize(bridegSize));
  }

  handleBridgeSize(bridegSize) {
    Bridge.validationBridgeSize(bridegSize, () => this.requestBridgeSize());
    this.#bridge = new Bridge(bridegSize);

    this.requestMoving();
  }

  requestMoving() {
    InputView.readMoving((moving) => this.handleMoving(moving));
  }

  handleMoving(moving) {
    console.log(`${moving}으로 이동합니다.`);
  }
}

module.exports = GameManager;
