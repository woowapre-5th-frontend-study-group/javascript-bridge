const { InputView, OutputView } = require('./View/IOView');

class GameManager {
  start() {
    OutputView.printStartMessage();

    this.requestBridgeSize();
  }

  requestBridgeSize() {
    InputView.readBridgeSize((bridegSize) => this.handleBridgeSize(bridegSize));
  }

  handleBridgeSize(bridegSize) {
    console.log(`다리의 길이는 ${bridegSize}입니다.`);
  }
}

module.exports = GameManager;
