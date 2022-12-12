/** Models Imported */
const BridgeGame = require('../Models/BridgeGame');

/** Views Imported */
const { InputView, OutputView } = require('../Views');

/** Controllers Imported */
const BasicController = require('./BasicController');

/** Utils Imported */
const ExceptionHandler = require('../Utils/ExceptionHandler');

/* #region Private Variable for encapsulation */
/** @type {BridgeGame} */
let _bridgeGameInstance = null;
/* #endregion */

/* #region  Private Functions */
function makeCheckCondition(checkResult, callback) {
  return { checkResult, callback };
}
/* #endregion */

class BridgeGameController extends BasicController {
  constructor() {
    super();
  }

  start() {
    _bridgeGameInstance = new BridgeGame();
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

    _bridgeGameInstance.move(moving);
    OutputView.printMap(_bridgeGameInstance);

    this.continue();
  }

  continue() {
    const conditionList = [
      makeCheckCondition(_bridgeGameInstance.clear(), () => this.end(_bridgeGameInstance)), // prettier-ignore
      makeCheckCondition(_bridgeGameInstance.retry(), () => this.questionGameCommand()), // prettier-ignore
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

    super.end(_bridgeGameInstance);
  }
}

module.exports = BridgeGameController;
