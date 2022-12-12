const BridgeSizeValidator = {
  NUMBER_ERROR: '[ERROR] 숫자를 입력해주세요.',
  SCOPE_ERROR: '[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.',

  validation(bridgeSize) {
    this.isNumber(bridgeSize);
    this.isCorrectScope(bridgeSize);
  },

  isNumber(bridgeSize) {
    const numberRegExp = /^[0-9]+$/;
    if (!numberRegExp.test(bridgeSize)) throw new Error(this.NUMBER_ERROR);
  },

  isCorrectScope(bridgeSize) {
    if (bridgeSize < 3 || bridgeSize > 20) throw new Error(this.SCOPE_ERROR);
  },
};

module.exports = BridgeSizeValidator;
