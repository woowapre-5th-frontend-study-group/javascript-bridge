const IOView = require('../views/IOView');

const errorHandler = (error) => {
  IOView.printError(error);
};

module.exports = errorHandler;
