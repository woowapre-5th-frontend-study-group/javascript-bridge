/** Models Imported */
const BridgeGame = require('../Models/BridgeGame');

const {
  VALIDATOR,
  SYMBOL,
  OUTPUT_MESSAGE,
  replaceParams,
} = require('../Constants');

/** Utils Imported */
const { Console } = require('@woowacourse/mission-utils');

/* #region Private Functions */
/** @param {string} movings */
function printMoving(movings) {
  Console.print(
    SYMBOL.BRACKET.OPEN + movings.join(SYMBOL.DELIMITER) + SYMBOL.BRACKET.CLOSE
  );
}
/* #endregion */

const OutputView = {
  printWelcomeMessage() {
    Console.print(OUTPUT_MESSAGE.WELCOME);
  },

  /** @param {BridgeGame} bridgeGameInstance */
  printMap(bridgeGameInstance) {
    const bridgeData = bridgeGameInstance.getComparedMap();
    const [lowerMovings, upperMovings] = [[], []];

    bridgeData.forEach((movingInfo) => {
      if (movingInfo.moving === SYMBOL.MOVING.UP) {
        upperMovings.push(movingInfo.fail ? SYMBOL.MARK.FAIL : SYMBOL.MARK.CLEAR); // prettier-ignore
        lowerMovings.push(SYMBOL.MARK.NULL);
      }

      if (movingInfo.moving === SYMBOL.MOVING.DOWN) {
        upperMovings.push(SYMBOL.MARK.NULL);
        lowerMovings.push(movingInfo.fail ? SYMBOL.MARK.FAIL : SYMBOL.MARK.CLEAR); // prettier-ignore
      }
    });

    printMoving(upperMovings);
    printMoving(lowerMovings);

    OutputView.addNewLine();
  },

  /** @param {Bridge} printBridge */
  printBridgeData(printBridge) {
    const bridgeData = printBridge.getBridgeData();
    Console.print(bridgeData);
  },

  /** @param {BridgeGame} bridgeGameInstance */
  printResult(bridgeGameInstance) {
    Console.print(OUTPUT_MESSAGE.GAME_RESULT.INTRO);
    OutputView.printMap(bridgeGameInstance);

    const isClear = bridgeGameInstance.clear();
    const clearMark = isClear
      ? SYMBOL.GAME_RESULT.CLEAR
      : SYMBOL.GAME_RESULT.FAIL;
    const clearMessage = replaceParams(
      OUTPUT_MESSAGE.GAME_RESULT.CLEAR,
      clearMark
    );
    Console.print(clearMessage);

    const attemptCount = bridgeGameInstance.getAttemptCount();
    const attemptMessage = replaceParams(
      OUTPUT_MESSAGE.GAME_RESULT.ATTEMPT,
      attemptCount
    );
    Console.print(attemptMessage);
  },

  /** @param {Error} errorObject */
  printError(errorObject) {
    Console.print(VALIDATOR.ERROR_MESSAGE.HEADING + errorObject.message);
    this.addNewLine();
  },

  addNewLine() {
    Console.print(OUTPUT_MESSAGE.NULL);
  },
};

module.exports = OutputView;
