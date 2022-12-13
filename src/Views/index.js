const { Console } = require('@woowacourse/mission-utils');

const InputView = require('./InputView');
const OutputView = require('./OutputView');

const IOView = {
  InputView,
  OutputView,

  close() {
    Console.close();
  },
};

module.exports = IOView;