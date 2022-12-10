const { Console } = require('@woowacourse/mission-utils');

const OutputView = {
  printWelcomeMessage() {
    Console.print('다리 건너기 게임을 시작합니다.');
    OutputView.addNewLine();
  },

  /**
   *
   * @param {BridgeGame} bridgeGameInstance
   */
  printMap(bridgeGameInstance) {
    const bridgeData = bridgeGameInstance.getComparedMap();
    Console.print(bridgeData);
    OutputView.addNewLine();
  },
  printBridgeData(printBridge) {
    Console.print(printBridge.getBridgeData());
  },
  printResult() {},
  addNewLine() {
    Console.print('');
  },
};

module.exports = OutputView;
