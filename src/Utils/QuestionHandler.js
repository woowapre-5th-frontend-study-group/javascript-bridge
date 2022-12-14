/** Views Imported */
const { InputView, OutputView } = require('../Views');

/** Utils Imported */
const ExceptionHandler = require('../Utils/ExceptionHandler');

class QuestionHandler {
  static QUESTION_TYPE = {
    BRIDGE_SIZE: 'BridgeSize',
    MOVING: 'Moving',
    GAME_COMMAND: 'GameCommand',
  };

  /** @type {QuestionHandler.QUESTION_TYPE} */
  #questionType;

  /** @param {QuestionHandler.QUESTION_TYPE} questionType */
  constructor(questionType) {
    this.#questionType = questionType;
  }

  /** @param {function} resultCallback */
  question(resultCallback) {
    InputView[`read${this.#questionType}`]((value) => {
      this.#validateCallback(value, resultCallback);
    });
  }

  /**
   * @param {string} validateValue
   * @param {function} resultCallback
   */
  #validateCallback(validateValue, resultCallback) {
    OutputView.addNewLine();

    const validateResult = ExceptionHandler[`tryValidate${this.#questionType}`](validateValue); // prettier-ignore
    if (!validateResult) {
      this.question(resultCallback);
      return;
    }

    resultCallback(validateValue);
  }
}

module.exports = QuestionHandler;
