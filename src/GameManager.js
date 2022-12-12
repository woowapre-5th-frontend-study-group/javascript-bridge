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
    Bridge.validationBridgeSize(bridegSize, () => this.requestBridgeSize());
    this.#bridge = new Bridge(bridegSize);

    this.requestMoving();
  }

  requestMoving() {
    InputView.readMoving((moving) => this.handleMoving(moving));
  }

  handleMoving(moving) {
    const compareLocation = this.#bridge.getSpecificLocation(
      this.#bridgeGame.getOrder()
    );
    this.#bridgeGame.move(moving, compareLocation);

    this.printMovingResult();
    this.actionAboutMoving();
  }

  printMovingResult() {
    OutputView.printMap(this.#bridgeGame.getMovingResult());
  }

  actionAboutMoving() {
    const isEnd = this.#bridgeGame.isEnd(this.#bridge.getSize());
    if (isEnd) {
      return;
    }

    this.requestMoving();
  }
}

module.exports = GameManager;
