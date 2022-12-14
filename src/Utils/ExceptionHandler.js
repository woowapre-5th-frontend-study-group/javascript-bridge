/** Views Imported */
const { OutputView } = require('../Views');

/** Utils Imported */
const Validator = require('./Validator');

const ExceptionHandler = {
  /**
   * @param {string} bridgeSize
   * @returns {boolean}
   */
  tryValidateBridgeSize(bridgeSize) {
    try {
      new Validator(bridgeSize)
        .shouldBeInputed()
        .throwErrorThen()
        .shouldBeNumberic()
        .throwErrorThen()
        .shouldBeInRange(3, 20)
        .throwErrorThen();
    } catch (errorObject) {
      OutputView.printError(errorObject);
      return false;
    }

    return true;
  },

  /**
   * @param {string} moving
   * @returns {boolean}
   */
  tryValidateMoving(moving) {
    try {
      new Validator(moving)
        .shouldBeInputed()
        .throwErrorThen()
        .shouldBeValue('U', 'D')
        .throwErrorThen();
    } catch (errorObject) {
      OutputView.printError(errorObject);
      return false;
    }

    return true;
  },

  /**
   * @param {string} gameCommand
   * @returns {boolean}
   */
  tryValidateGameCommand(gameCommand) {
    try {
      new Validator(gameCommand)
        .shouldBeInputed()
        .throwErrorThen()
        .shouldBeValue('R', 'Q')
        .throwErrorThen();
    } catch (errorObject) {
      OutputView.printError(errorObject);
      return false;
    }

    return true;
  },
};

module.exports = ExceptionHandler;
