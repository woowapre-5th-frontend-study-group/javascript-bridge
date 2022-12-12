const Bridge = require('./models/Bridge');
const BridgeGame = require('./models/BridgeGame');
const IOView = require('./views/IOView');
const { InputView, OutputView } = require('./views/IOView');

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
    const isValid = Bridge.validationBridgeSize(bridegSize);
    if (!isValid) return this.requestBridgeSize();

    this.#bridge = new Bridge(bridegSize);
    this.requestMoving();
  }

  requestMoving() {
    InputView.readMoving((moving) => this.handleMoving(moving));
  }

  handleMoving(moving) {
    const isValid = BridgeGame.validationMoving(moving);
    if (!isValid) return this.requestMoving();

    this.movingBridge(moving);
    this.printMovingResult();
    this.actionAboutMoving();
  }

  movingBridge(moving) {
    const compareLocation = this.#bridge.getSpecificLocation(
      this.#bridgeGame.getOrder()
    );
    this.#bridgeGame.move(moving, compareLocation);
  }

  printMovingResult() {
    OutputView.printMap(this.#bridgeGame.getMovingResult());
  }

  actionAboutMoving() {
    const isSuccess = this.#bridgeGame.isSuccess(this.#bridge.getSize());
    const isFail = this.#bridgeGame.isFail();

    if (isSuccess) return this.end();
    if (isFail) return this.requestGameCommand();

    this.requestMoving();
  }

  requestGameCommand() {
    InputView.readGameCommand((gameCommand) =>
      this.handleGameCommand(gameCommand)
    );
  }

  handleGameCommand(gameCommand) {
    const isValid = BridgeGame.validationGameCommand(gameCommand);
    if (!isValid) return this.requestGameCommand();

    if (gameCommand === 'R') return this.retry();
    return this.end();
  }

  retry() {
    this.#bridgeGame.retry();
    return this.requestMoving();
  }

  end() {
    const finalResult = this.#bridgeGame.getFinalResult(this.#bridge.getSize());
    OutputView.printResult(finalResult);
    IOView.exit();
  }
}

module.exports = GameManager;
