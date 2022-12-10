let _bridgeSize = null;
let _answerBridge = null;

const BridgeGameState = {
  setBridgeSize(bridgeSize) {
    _bridgeSize = bridgeSize;
  },

  getBridgeSize() {
    return _bridgeSize;
  },

  setAnswerBridge(answerBridge) {
    _answerBridge = answerBridge;
  },

  getAnswerBridge() {
    return _answerBridge;
  },
};

module.exports = BridgeGameState;
