const { Console } = require("@woowacourse/mission-utils");

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridgeSize;
  #gameAnswer;

  constructor(size, answer) {
    this.#bridgeSize = size;
    this.#gameAnswer = answer;  
    this.upList = [];
    this.downList = [];
    this.moveCnt = 0;
    this.tryCnt = 0;
  }
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(moving) {
    const isAnswer = this.#gameAnswer[this.moveCnt++] == moving;
    this.setUpDown(isAnswer, moving);
    //console.log(this.upList);
    //console.log(this.downList);

    return isAnswer;
  }

  getMoveCnt() {
    return this.moveCnt;
  }

  setUpDown(isAnswer, moving) {
    if(isAnswer) { //정답인 경우
        if(moving == 'U') { //정답이 U로 맞는 경우
            this.upList.push('O');
            this.downList.push(' ');
        } else { //정답이 D인 경우
            this.upList.push(' ');
            this.downList.push('O');
        }
    } else { //정답이 아닌 경우
        if(moving == 'U') { //정답이 U로 틀린 경우
            this.upList.push('X');
            this.downList.push(' ');
        } else {
            this.upList.push(' ');
            this.downList.push('X');
        }
      }
  }

  getUpList() {
    return this.upList;
  }
  getDownList() {
    return this.downList;
  }

  isSuccess() {
    return (this.moveCnt == this.#bridgeSize ? '성공' : '실패') ;
  }

  increaseTryCnt() {
    this.tryCnt += 1;
  }

  getTryCnt() {
    return this.tryCnt;
  }
  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.upList = [];
    this.downList = [];
    this.moveCnt = 0;
  }

}

module.exports = BridgeGame;
