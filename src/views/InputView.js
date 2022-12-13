const { Console } = require('@woowacourse/mission-utils');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  REQUEST_BRIDGE_SIZE: '\n다리의 길이를 입력해주세요.\n',
  REQUEST_MOVING: '\n이동할 칸을 선택해주세요. (위: U, 아래: D)\n',
  REQUEST_GAME_COMMAND:
    '\n게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n',

  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(callBack) {
    Console.readLine(this.REQUEST_BRIDGE_SIZE, callBack);
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(callBack) {
    Console.readLine(this.REQUEST_MOVING, callBack);
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(callBack) {
    Console.readLine(this.REQUEST_GAME_COMMAND, callBack);
  },
};

module.exports = InputView;
