/** Views Imported */
const InputView = require('./InputView');
const OutputView = require('./OutputView');

/** Utils Imported */
const { Console } = require('@woowacourse/mission-utils');

const IOView = {
  InputView,
  OutputView,

  close() {
    Console.close();
  },
};

module.exports = IOView;
