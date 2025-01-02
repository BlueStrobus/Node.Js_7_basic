// joi 라이브러리 가져오기
// joi : 데이터 유효성 검사 라이브러리
import Joi from 'joi';
// 메시지 상수(거듭되서 사용하는 것) 가져오기
import { MESSAGES } from '../../constants/message.constant.js';
// 비밀번호 최솟값 가져오기
import { MIN_PASSWORD_LENGTH } from '../../constants/resume.constant.js';


// Joi로 회원가입입 데이터 인증하는 스키마 정의
const schema = Joi.object({
  // 이메일
  // 문자열, 이메일형식, 필수
  email: Joi.string().email().required().messages({
    // 이메일 누락시
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    // 이메일 형식이 아닐 때
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),

  // 비밀번호
  // 문자열, 필수, 최소 길이 이상
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    // 비번 누락 시
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
    // 최소길이보다 짧을 때
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
  }),
  // 비밀번호 확인
  // 문자열, 필수, password와 동일한 값
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    // 누락시
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    // 비밀번호와 다를 때
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
  // 이름
  // 문자열, 필수
  name: Joi.string().required().messages({
    // 이름 누락 시
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQURIED,
  }),
});

// 회원가입 데이터 검증 함수
export const signUpValidator = async (req, res, next) => {
  try {
    // 회원가입 데이터를 schema로 검증하는 비동기 함수
    await schema.validateAsync(req.body);
    // 성공 시 다음 미들웨어로 이동
    next();
  } catch (error) {
    // 실패 시 에러 메시지 송신
    next(error);
  }
};
