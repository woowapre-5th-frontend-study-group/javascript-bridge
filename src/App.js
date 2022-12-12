const { close } = require('./Views/');

const {
  BridgeGameInitialController,
  BridgeGameController,
  BridgeGameResultController,
} = require('./Controllers');

class App {
  play() {
    BridgeGameInitialController.subscribe(() => BridgeGameController.start());
    BridgeGameController.subscribe((gameInstance) => BridgeGameResultController.start(gameInstance)); // prettier-ignore
    BridgeGameResultController.subscribe(() => this.endService());

    this.startService();
  }

  startService() {
    BridgeGameInitialController.start();
  }

  endService() {
    close();
  }
}

module.exports = App;
