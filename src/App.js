const GameManager = require('./GameManager');
const InputView = require('./View/InputView');

class App {
  #gameManager = new GameManager();

  play() {
    this.#gameManager.start();
  }
}

const app = new App();
app.play();

module.exports = App;
