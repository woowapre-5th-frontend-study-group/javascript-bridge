const { OutputView } = require('../Views');

const Validator = require('./Validator');

const ExceptionHandler = {
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
