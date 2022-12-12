const Bridge = require('./models/Bridge');
const BridgeGame = require('./models/BridgeGame');
const { InputView, OutputView } = require('./views/IOView');
const { makeBridge } = require('./BridgeMaker');
const { generate } = require('./BridgeRandomNumberGenerator');
const IOView = require('./views/IOView');

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
    const isSuccess = this.#bridgeGame.isSuccess(this.#bridge.getSize());
    const isFail = this.#bridgeGame.isFail();

    if (isSuccess) return this.end();
    if (isFail) return this.requestRetry();

    this.requestMoving();
  }

  requestRetry() {}

  end() {
    const finalResult = this.#bridgeGame.getFinalResult(this.#bridge.getSize());
    OutputView.printResult(finalResult);
    IOView.exit();
  }
}

module.exports = GameManager;
