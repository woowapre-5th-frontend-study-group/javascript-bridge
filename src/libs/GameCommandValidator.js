const GameCommandValidator = {
  GAME_COMMAND_ERROR: '[ERROR] R 또는 Q를 입력해주세요.',

  validation(gameCommand) {
    this.isValidGameCommand(gameCommand);
  },

  isValidGameCommand(gameCommand) {
    if (gameCommand === 'R' || gameCommand === 'Q') return;

    throw new Error(this.GAME_COMMAND_ERROR);
  },
};

module.exports = GameCommandValidator;
