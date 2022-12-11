class Bridge {
  /** @type {string[]} */
  #bridgeData = null;

  constructor(bridgeData) {
    if (bridgeData !== null) {
      this.setBridgeData(bridgeData);
    }
  }

  setBridgeData(bridgeData) {
    this.#bridgeData = bridgeData;
  }

  getBridgeData() {
    return this.#bridgeData;
  }

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
   * @return {{isClear: boolean, canNext: boolean, failMoving: string}}
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

  markWrongMoving() {
    // TODO: 잘못된 Moving 체크하고 getComparedMap 완성하기
    // this.#bridgeData.at(-1) =
  }
}

module.exports = Bridge;
