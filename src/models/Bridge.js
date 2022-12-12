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
  }

  static validationBridgeSize(bridegSize, callBack) {
    try {
      throw new Error('[ERROR] 에러 발생!');
    } catch (error) {
      errorHandler(error, callBack);
    }
  }
}

module.exports = Bridge;
