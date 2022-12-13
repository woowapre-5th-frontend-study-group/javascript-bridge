const VALIDATOR = {
  BRIDGE_SIZE: {
    INCLUSIVE_LOWER: 3,
    INCLUSIVE_UPPER: 20,
  },

  NULL: '',

  ERROR_MESSAGE: {
    HEADING: '[ERROR] ',
    EMPTY: '빈 값이 아닌 값을 입력해주세요.',
    NOT_NUMBERIC: '숫자를 입력해주세요.',
    NOT_IN_RANGE: '{0}부터 {1}사이의 숫자를 입력해주세요.',
    NOT_IN_VALUES: '{0}만 입력할 수 있습니다.',
  },
};

const QUESTION_MESSAGE = {
  BRIDGE_SIZE: '다리의 길이를 입력해주세요.\n',
  MOVING: '이동할 칸을 선택해주세요. (위: U, 아래: D)\n',
  GAME_COMMAND: '게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n', // prettier-ignore
};

const OUTPUT_MESSAGE = {
  WELCOME: '다리 건너기 게임을 시작합니다.\n',
  GAME_RESULT: {
    INTRO: '최종 게임 결과',
    CLEAR: '게임 성공 여부: {0}',
    ATTEMPT: '총 시도한 횟수: {0}',
  },
  NULL: '',
};

const SYMBOL = {
  MOVING: {
    UP: 'U',
    DOWN: 'D',
  },

  GAME_COMMAND: {
    RETRY: 'R',
    QUIT: 'Q',
  },

  MARK: {
    CLEAR: 'O',
    FAIL: 'X',
    NULL: ' ',
  },

  BRACKET: {
    OPEN: '[ ',
    CLOSE: ' ]',
  },

  DELIMITER: ' | ',

  GAME_RESULT: {
    CLEAR: '성공',
    FAIL: '실패',
  },
};

/**
 * @param {string} constants
 * @param  {...any} params
 * @returns {string}
 */
function replaceParams(constants, ...params) {
  let result = constants;

  for (let index = 0; index < params.length; index++) {
    result = result.replace(`{${index}}`, params[index]);
  }

  return result;
}

module.exports = {
  VALIDATOR,
  QUESTION_MESSAGE,
  OUTPUT_MESSAGE,
  SYMBOL,
  replaceParams,
};
