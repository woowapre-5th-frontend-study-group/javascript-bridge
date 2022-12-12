/** Models Imported */
const BridgeGame = require('../Models/BridgeGame');

/** Views Imported */
const { InputView, OutputView } = require('../Views');

/** Controllers Imported */
const BasicController = require('./BasicController');

/** Utils Imported */
const ExceptionHandler = require('../Utils/ExceptionHandler');

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
    this.questionMoving();
  }

  questionMoving() {
    InputView.readMoving((moving) => this.readMovingCallback(moving));
  }

  readMovingCallback(moving) {
    const validateResult = ExceptionHandler.tryValidateMoving(moving);
    if (!validateResult) {
      this.questionMoving();
      return;
    }

    this.#bridgeGameInstance.move(moving);
    OutputView.printMap(this.#bridgeGameInstance);

    this.continueByEachCondition();
  }

  continueByEachCondition() {
    const conditionList = [
      makeCheckCondition(this.#bridgeGameInstance.clear(), () => this.end(this.#bridgeGameInstance)), // prettier-ignore
      makeCheckCondition(this.#bridgeGameInstance.retry(), () => this.questionGameCommand()), // prettier-ignore
    ];

    const conditionResult = conditionList.filter(({ checkResult }) => checkResult); // prettier-ignore
    if (conditionResult.length !== 0) {
      conditionResult[0].callback();
      return;
    }

    this.questionMoving();
  }

  questionGameCommand() {
    InputView.readGameCommand((gameCommand) => this.readGameCommandCallback(gameCommand)); // prettier-ignore
  }

  readGameCommandCallback(gameCommand) {
    OutputView.addNewLine();

    const validateResult = ExceptionHandler.tryValidateGameCommand(gameCommand);
    if (!validateResult) {
      this.questionGameCommand();
      return;
    }

    if (gameCommand === 'R') {
      this.start();
      return;
    }

    super.end(this.#bridgeGameInstance);
  }
}

module.exports = BridgeGameController;
