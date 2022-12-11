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

  static setBridgeSize(bridgeSize) {
    _bridgeSize = bridgeSize;
  }

  getAttemptCount() {
    return _attemptCount;
  }

  getComparedMap() {
    const comparedResult = this.#userBridge.compareBridge(_answerBridge);

    if (comparedResult.isRetry) {
      // 맨 마지막 moving만 X로 체크
      const userBridgeData = this.#userBridge.getBridgeData();
      const movingData = userBridgeData.map((moving) => {
        return { moving, fail: false };
      });

      return [
        ...movingData.slice(0, -1),
        { moving: movingData.slice(-1)[0].moving, fail: true },
      ];
    }

    if (comparedResult.isClear) {
      // 정답 다리 데이터 출력
      const answerBridgeData = _answerBridge.getBridgeData();
      return answerBridgeData.map((moving) => {
        return { moving, fail: false };
      });
    }

    // 현재 유저 데이터 출력
    const userBridgeData = this.#userBridge.getBridgeData();
    return userBridgeData.map((moving) => {
      return { moving, fail: false };
    });

    // return _answerBridge;
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
