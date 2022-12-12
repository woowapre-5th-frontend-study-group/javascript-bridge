const { convertToNumber } = require('./Helper');

function isNumberic(source) {
  const numberSrc = convertToNumber(source);

  return (
    !Number.isNaN(numberSrc) &&
    Number.isInteger(numberSrc) &&
    Number.isFinite(numberSrc)
  );
}

function isInRange(source, inclusiveLower, inclusiveUpper) {
  const numberSrc = convertToNumber(source);

  return numberSrc >= inclusiveLower && inclusiveUpper >= numberSrc;
}

function isNull(source) {
  return source === '';
}

function isValue(source, ...values) {
  return values.some((value) => source === value);
}

class Validator {
  #source = null;
  #errorMessage = null;

  /**
   *
   * @param {string} source
   */
  constructor(source) {
    this.#source = source.trim();
  }

  shouldBeInputed() {
    if (isNull(this.#source)) {
      this.#errorMessage = new Error('빈 값이 아닌 값을 입력해주세요.');
    }

    return this;
  }

  shouldBeNumberic() {
    if (!isNumberic(this.#source)) {
      this.#errorMessage = new Error('숫자를 입력해주세요.');
    }

    return this;
  }

  shouldBeInRange(inclusiveLower, inclusiveUpper) {
    if (!isInRange(this.#source, inclusiveLower, inclusiveUpper)) {
      this.#errorMessage = new Error(`${inclusiveLower}부터 ${inclusiveUpper} 사이의 숫자를 입력해주세요.`); // prettier-ignore
    }

    return this;
  }

  shouldBeValue(...values) {
    if (!isValue(this.#source, ...values)) {
      this.#errorMessage = new Error(`${values.join(', ')}만 입력할 수 있습니다.`); // prettier-ignore
    }

    return this;
  }

  throwErrorThen(errorMessage = null) {
    if (errorMessage) {
      throw new Error(errorMessage);
    }

    if (this.#errorMessage) {
      throw this.#errorMessage;
    }

    return this;
  }
}

module.exports = Validator;
