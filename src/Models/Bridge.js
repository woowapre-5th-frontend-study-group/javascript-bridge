class Bridge {
  /** @type {string[]} */
  #bridgeData = null;

  /** @param {string[]} bridgeData */
  constructor(bridgeData) {
    if (bridgeData !== null) {
      this.setBridgeData(bridgeData);
    }
  }

  /** @param {string[]} bridgeData */
  setBridgeData(bridgeData) {
    this.#bridgeData = bridgeData;
  }

  /** @returns {string[]} */
  getBridgeData() {
    return this.#bridgeData;
  }

  /** @returns {{ moving: string, fail: boolean}} */
  getBridgeObject() {
    return this.#bridgeData.map((moving) => {
      return { moving, fail: false };
    });
  }

  /** @param  {...string} movings */
  pushMoving(...movings) {
    if (!this.#bridgeData) {
      this.#bridgeData = [];
    }

    movings.forEach((moving) => {
      this.#bridgeData.push(moving);
    });
  }

  /**
   * 각 다리의 마지막 Moving을 비교한다.
   *
   * @param {*} comparedBridge
   * @return {{isClear: boolean, isRetry: boolean}}
   */
  compareBridge(comparedBridge) {
    const comparedResult = {
      isClear: false,
      isRetry: false,
    };

    const comparedBridgeData = comparedBridge.getBridgeData();
    const lowerLastIndex =
      this.#bridgeData.length < comparedBridgeData.length
        ? this.#bridgeData.length - 1
        : comparedBridgeData.length - 1;
    const [bridgeLastMoving, comparedLastMoving] = [
      this.#bridgeData[lowerLastIndex],
      comparedBridgeData[lowerLastIndex],
    ];

    if (bridgeLastMoving === comparedLastMoving) {
      return {
        ...comparedResult,
        isClear: this.#bridgeData.length === comparedBridgeData.length,
      };
    }

    return {
      ...comparedResult,
      isRetry: true,
    };
  }
}

module.exports = Bridge;
