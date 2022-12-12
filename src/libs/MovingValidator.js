const MovingValidator = {
  MOVING_ERROR: '[ERROR] U 또는 D를 입력해주세요.',

  validation(moving) {
    this.isValidMoving(moving);
  },

  isValidMoving(moving) {
    if (moving === 'U' || moving === 'D') return;

    throw new Error(this.MOVING_ERROR);
  },
};

module.exports = MovingValidator;
