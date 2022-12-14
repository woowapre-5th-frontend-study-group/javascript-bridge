/** Utils Imported */
const { convertToNumber } = require('./Helper');

/* #region Private Functions */
/**
 * @param {string} source 검사할 대상
 * @returns {boolean}
 */
function isNumberic(source) {
  const numberSrc = convertToNumber(source);

  return (
    !Number.isNaN(numberSrc) &&
    Number.isInteger(numberSrc) &&
    Number.isFinite(numberSrc)
  );
}

/**
 * @param {string} source
 * @param {number} inclusiveLower
 * @param {number} inclusiveUpper
 * @returns {boolean}
 */
function isInRange(source, inclusiveLower, inclusiveUpper) {
  const numberSrc = convertToNumber(source);

  return numberSrc >= inclusiveLower && inclusiveUpper >= numberSrc;
}

/**
 * @param {string} source
 * @returns {boolean}
 */
function isNull(source) {
  return source === '';
}

/**
 * @param {string} source
 * @param  {...string} values
 * @returns {boolean}
 */
function isValue(source, ...values) {
  return values.some((value) => source === value);
}
/* #endregion */

class Validator {
  /** @type {string} */
  #source = null;

  /** @type {string} */
  #errorMessage = null;

  /** @param {string} source */
  constructor(source) {
    this.#source = source.trim();
  }

  /** @returns {this} */
  shouldBeInputed() {
    if (isNull(this.#source)) {
      this.#errorMessage = new Error('빈 값이 아닌 값을 입력해주세요.');
    }

    return this;
  }

  /** @returns {this} */
  shouldBeNumberic() {
    if (!isNumberic(this.#source)) {
      this.#errorMessage = new Error('숫자를 입력해주세요.');
    }

    return this;
  }

  /**
   * @param {number} inclusiveLower
   * @param {number} inclusiveUpper
   * @returns {this}
   */
  shouldBeInRange(inclusiveLower, inclusiveUpper) {
    if (!isInRange(this.#source, inclusiveLower, inclusiveUpper)) {
      this.#errorMessage = new Error(`${inclusiveLower}부터 ${inclusiveUpper} 사이의 숫자를 입력해주세요.`); // prettier-ignore
    }

    return this;
  }

  /**
   * @param  {...string} values
   * @returns {this}
   */
  shouldBeValue(...values) {
    if (!isValue(this.#source, ...values)) {
      this.#errorMessage = new Error(`${values.join(', ')}만 입력할 수 있습니다.`); // prettier-ignore
    }

    return this;
  }

  /**
   * @param {string} errorMessage
   * @throws Will throw an error if the errorMessage or the #errorMessage is not null
   * @returns {this}
   */
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
