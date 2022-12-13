const errorHandler = require('../libs/errorHandler');
const { makeBridge } = require('../BridgeMaker');
const { generate } = require('../BridgeRandomNumberGenerator');
const { BridgeSizeValidator } = require('../libs/Validator');

class Bridge {
  #bridge;

  constructor(bridegSize) {
    this.make(bridegSize);
  }

  make(bridegSize) {
    this.#bridge = makeBridge(bridegSize, generate);
  }

  getSpecificLocation(location) {
    return this.#bridge[location];
  }

  getSize() {
    return this.#bridge.length;
  }

  static validationBridgeSize(bridegSize) {
    try {
      BridgeSizeValidator.validation(bridegSize);
    } catch (error) {
      errorHandler(error);
      return false;
    }
    return true;
  }
}

module.exports = Bridge;
