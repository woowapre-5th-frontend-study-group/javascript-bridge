/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridgeState = [];

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(location, comapreLocation) {
    const moveResult = location === comapreLocation ? 'O' : 'X';
    this.#bridgeState.push([location, moveResult]);
  }

  getMovingResult() {
    const upBridge = [];
    const downBridge = [];

    this.#calMovingResult(upBridge, downBridge);

    return [upBridge, downBridge];
  }

  #calMovingResult(upBridge, downBridge) {
    this.#bridgeState.forEach(([location, result]) => {
      if (location === 'U') {
        upBridge.push(result);
        downBridge.push(' ');
        return;
      }

      upBridge.push(' ');
      downBridge.push(result);
    });
  }

  isEnd(bridegSize) {
    if (bridegSize === this.#bridgeState.length) return true;
    if (this.#calLastResult() === 'X') return true;

    return false;
  }

  #calLastResult() {
    const lastIndex = this.#bridgeState.length - 1;
    return this.#bridgeState[lastIndex][1];
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {}

  getOrder() {
    return this.#bridgeState.length;
  }
}

module.exports = BridgeGame;
