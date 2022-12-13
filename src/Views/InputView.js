/** Utils Imported */
const { Console } = require('@woowacourse/mission-utils');

const InputView = {
  /** @param {function} callback */
  readBridgeSize(callback) {
    Console.readLine('다리의 길이를 입력해주세요.\n', callback);
  },

  /** @param {function} callback */
  readMoving(callback) {
    Console.readLine('이동할 칸을 선택해주세요. (위: U, 아래: D)\n', callback);
  },

  /** @param {function} callback */
  readGameCommand(callback) {
    Console.readLine('게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n', callback); // prettier-ignore
  },
};

module.exports = InputView;
