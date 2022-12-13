/** Models Imported */
const BridgeGame = require('../Models/BridgeGame');

/** Views Imported */
const { OutputView } = require('../Views');

/** Controllers Imported */
const BasicController = require('./BasicController');

/** Utils Imported */
const QuestionHandler = require('../Utils/QuestionHandler');

/* #region  Private Functions */
function makeCheckCondition(checkResult, callback) {
  return { checkResult, callback };
}
/* #endregion */

class BridgeGameController extends BasicController {
  /** @type {BridgeGame} */
  #bridgeGameInstance = null;

  constructor() {
    super();
  }

  start() {
    this.#bridgeGameInstance = new BridgeGame();
    this.#questionMoving();
  }

  #questionMoving() {
    const { MOVING } = QuestionHandler.QUESTION_TYPE;

    new QuestionHandler(MOVING).question((moving) =>
      this.#questionMovingCallback(moving)
    );
  }

  #questionMovingCallback(moving) {
    this.#bridgeGameInstance.move(moving);
    OutputView.printMap(this.#bridgeGameInstance);

    this.#continueByEachCondition();
  }

  #continueByEachCondition() {
    const conditionList = [
      makeCheckCondition(this.#bridgeGameInstance.clear(), () => super.end(this.#bridgeGameInstance)), // prettier-ignore
      makeCheckCondition(this.#bridgeGameInstance.retry(), () => this.#questionGameCommand()), // prettier-ignore
    ];

    const conditionResult = conditionList.filter(({ checkResult }) => checkResult); // prettier-ignore
    if (conditionResult.length !== 0) {
      conditionResult[0].callback();
      return;
    }

    this.#questionMoving();
  }

  #questionGameCommand() {
    const { GAME_COMMAND } = QuestionHandler.QUESTION_TYPE;

    new QuestionHandler(GAME_COMMAND).question((gameCommand) =>
      this.#questionGameCommandCallback(gameCommand)
    );
  }

  #questionGameCommandCallback(gameCommand) {
    if (gameCommand === 'R') {
      this.start();
      return;
    }

    super.end(this.#bridgeGameInstance);
  }
}

module.exports = BridgeGameController;
