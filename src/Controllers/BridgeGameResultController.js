let _changeListener = null;

const BridgeGameResultController = {
  subscribe(callbackFunction) {
    _changeListener = callbackFunction;
  },

  start() {
    return;
  },

  end() {
    if (_changeListener) {
      _changeListener();
    }
  },
};

module.exports = BridgeGameResultController;
