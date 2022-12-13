const { GAME_COMMAND } = require('./Constant');

const GameCommandValidator = {
  GAME_COMMAND_ERROR: '[ERROR] R 또는 Q를 입력해주세요.',

  validation(gameCommand) {
    this.isValidGameCommand(gameCommand);
  },

  isValidGameCommand(gameCommand) {
    if (
      gameCommand === GAME_COMMAND.restart ||
      gameCommand === GAME_COMMAND.quit
    )
      return;

    throw new Error(this.GAME_COMMAND_ERROR);
  },
};

module.exports = GameCommandValidator;
