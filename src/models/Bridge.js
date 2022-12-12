const errorHandler = require('../libs/errorHandler');
const { makeBridge } = require('../BridgeMaker');
const { generate } = require('../BridgeRandomNumberGenerator');

class Bridge {
  #bridge;

  constructor(bridegSize) {
    this.make(bridegSize);
  }

  make(bridegSize) {
    this.#bridge = makeBridge(bridegSize, generate);
    console.log(this.#bridge);
  }

  getSpecificLocation(location) {
    return this.#bridge[location];
  }

  getSize() {
    return this.#bridge.length;
  }

  static validationBridgeSize(bridegSize, callBack) {
    try {
      if (bridegSize < 3) {
        throw new Error('[ERROR] 에러 발생!');
      }
    } catch (error) {
      errorHandler(error, callBack);
    }
  }
}

module.exports = Bridge;
