const Bridge = require('./Bridge');

const BridgeRandomNumberGenerator = require('../Utils/BridgeRandomNumberGenerator');
const BridgeMaker = require('../Utils/BridgeMaker');

let _attemptCount = 0;
let _bridgeSize = null;

/** @type {Bridge} */
let _answerBridge = null;

class BridgeGame {
  /** @type {Bridge} */
  #userBridge = null;

  /** @type {boolean} */
  #isClear = false;

  constructor() {
    _attemptCount += 1;
  }

  // TODO: 테스트용 getter, 나중에 지우기
  getUserBridge() {
    return this.#userBridge;
  }

  static setBridgeSize(bridgeSize) {
    _bridgeSize = bridgeSize;
  }

  getComparedMap() {
    const comparedResult = this.#userBridge.compareBridge(_answerBridge);

    if (comparedResult.isRetry) {
    }

    return _answerBridge;
  }

  IsClear() {
    return this.#isClear;
  }

  static createAnswerBridge() {
    const bridgeData = BridgeMaker.makeBridge(
      _bridgeSize,
      BridgeRandomNumberGenerator.generate
    );

    _answerBridge = new Bridge(bridgeData);

    // TODO: 콘솔 지우기
    console.log(bridgeData);
  }

  move(moving) {
    if (!this.#userBridge) {
      this.#userBridge = new Bridge();
    }

    this.#userBridge.pushMoving(moving);
  }

  clear() {
    const { isClear } = this.#userBridge.compareBridge(_answerBridge);

    return isClear;
  }

  /** retry를 해야하는지 아닌지? */
  retry() {
    const { isRetry } = this.#userBridge.compareBridge(_answerBridge);

    return isRetry;
  }
}

module.exports = BridgeGame;
