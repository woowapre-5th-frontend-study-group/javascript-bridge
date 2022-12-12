const { InputView, OutputView } = require('./View/IOView');

class GameManager {
  start() {
    OutputView.printStartMessage();
  }
}

module.exports = GameManager;
