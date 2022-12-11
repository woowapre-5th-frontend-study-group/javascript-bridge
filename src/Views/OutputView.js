const { Console } = require('@woowacourse/mission-utils');
const BridgeGame = require('../Models/BridgeGame');

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
    const [lowerMovings, upperMovings] = [[], []];

    bridgeData.forEach((movingInfo) => {
      if (movingInfo.moving === 'U') {
        upperMovings.push(movingInfo.fail ? 'X' : 'O');
        lowerMovings.push(' ');
      }

      if (movingInfo.moving === 'D') {
        upperMovings.push(' ');
        lowerMovings.push(movingInfo.fail ? 'X' : 'O');
      }
    });

    Console.print(`[ ${upperMovings.join(' | ')} ]`);
    Console.print(`[ ${lowerMovings.join(' | ')} ]`);

    OutputView.addNewLine();
  },

  printBridgeData(printBridge) {
    Console.print(printBridge.getBridgeData());
  },

  /**
   *
   * @param {BridgeGame} bridgeGameInstance
   */
  printResult(bridgeGameInstance) {
    Console.print('최종 게임 결과');

    OutputView.printMap(bridgeGameInstance);

    const isClear = bridgeGameInstance.clear();
    const attempCount = bridgeGameInstance.getAttemptCount();

    Console.print(`게임 성공 여부: ${isClear ? '성공' : '실패'}`);
    Console.print(`총 시도한 횟수: ${attempCount}`);
  },

  addNewLine() {
    Console.print('');
  },
};

module.exports = OutputView;
