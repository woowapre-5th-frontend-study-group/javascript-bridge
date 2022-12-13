/** Models Imported */
const Bridge = require('./Bridge');

/** Utils Imported */
const BridgeRandomNumberGenerator = require('../Utils/BridgeRandomNumberGenerator');
const BridgeMaker = require('../Utils/BridgeMaker');

/* #region Private Outer Referrence */
/** @type {number} */
let _attemptCount = 0;

/** @type {number | null} */
let _bridgeSize = null;

/** @type {Bridge} */
let _answerBridge = null;
/* #endregion */

class BridgeGame {
  /** @type {Bridge} */
  #userBridge = null;

  constructor() {
    _attemptCount += 1;
  }

  /** @param {number} bridgeSize */
  static setBridgeSize(bridgeSize) {
    _bridgeSize = bridgeSize;
  }

  /** @returns {number} */
  getAttemptCount() {
    return _attemptCount;
  }

  /** @returns {{ moving: string, fail: boolean }} */
  getComparedMap() {
    const { isRetry, isClear } = this.#userBridge.compareBridge(_answerBridge);

    if (isRetry) {
      // 맨 마지막 moving만 X로 체크
      const userBridgeData = this.#userBridge.getBridgeObject();

      return [
        ...userBridgeData.slice(0, -1),
        { moving: userBridgeData.slice(-1)[0].moving, fail: true },
      ];
    }

    return isClear
      ? _answerBridge.getBridgeObject() // 정답 다리 데이터 출력
      : this.#userBridge.getBridgeObject(); // 현재 유저 데이터 출력
  }

  /** @param {string} moving */
  move(moving) {
    if (!this.#userBridge) {
      this.#userBridge = new Bridge();
    }

    this.#userBridge.pushMoving(moving);
  }

  /** @returns {boolean} */
  clear() {
    const { isClear } = this.#userBridge.compareBridge(_answerBridge);

    return isClear;
  }

  /** @returns {boolean} */
  retry() {
    const { isRetry } = this.#userBridge.compareBridge(_answerBridge);

    return isRetry;
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
}

module.exports = BridgeGame;
