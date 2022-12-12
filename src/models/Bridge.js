const { makeBridge } = require('../BridgeMaker');
const { generate } = require('../BridgeRandomNumberGenerator');

class Bridge {
  #bridge;

  constructor(bridegSize) {
    this.make(bridegSize);
  }

  make(bridegSize) {
    this.#bridge = makeBridge(bridegSize, generate);
  }
}

module.exports = Bridge;
