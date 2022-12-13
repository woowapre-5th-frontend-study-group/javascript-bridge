const { InputView, OutputView } = require('../Views');
const ExceptionHandler = require('../Utils/ExceptionHandler');

class QuestionHandler {
  static QUESTION_TYPE = {
    BRIDGE_SIZE: 'BridgeSize',
    MOVING: 'Moving',
    GAME_COMMAND: 'GameCommand',
  };

  #questionType;

  constructor(questionType) {
    this.#questionType = questionType;
  }

  question(resultCallback) {
    InputView[`read${this.#questionType}`]((value) => {
      this.#validateCallback(value, resultCallback);
    });
  }

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
