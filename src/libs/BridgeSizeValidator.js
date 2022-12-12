const BridgeSizeValidator = {
  validation(bridgeSize) {
    this.isNumber(bridgeSize);
    this.isCorrectScope(bridgeSize);
  },

  isNumber(bridgeSize) {
    const numberRegExp = /^[0-9]+$/;
    if (!numberRegExp.test(bridgeSize))
      throw new Error('[ERROR] 숫자를 입력해주세요.');
  },

  isCorrectScope(bridgeSize) {
    if (bridgeSize < 3 || bridgeSize > 20)
      throw new Error('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
  },
};

module.exports = BridgeSizeValidator;
