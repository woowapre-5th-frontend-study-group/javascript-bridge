const errorHandler = (error, callBack) => {
  console.log(error);
  callBack();
};

module.exports = errorHandler;
