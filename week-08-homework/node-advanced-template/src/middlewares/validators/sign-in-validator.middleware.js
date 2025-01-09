// joi(유효성 검사) 라이브러리 가져오기
import Joi from 'joi';
// 메시지 상수(거듭되서 사용하는 것) 가져오기
import { MESSAGES } from '../../constants/message.constant.js';

// Joi를 사용하여 로그인 데이터를 인증하는 스키마를 정의
const schema = Joi.object({ 
  // 이메일은 문자열, 이메일형식, 필수   
  // 불충족시 응답하는 메시지 
  email: Joi.string().email().required().messages({
    // 이메일 누락시 '이메일을 입력해 주세요.'
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    // 이메일 형식 부적합 '이메일 형식이 올바르지 않습니다.'
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  // 비밀번호는 문자열, 필수
  // 불충족시 응답하는 메시지 
  password: Joi.string().required().messages({
    // 비밀번호 누락 시 '비밀번호를 입력해 주세요.',
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
  }),
});

// 로그인 데이터 검증
export const signInValidator = async (req, res, next) => {
  try {
    // 로그인 데이터를 schema로 검증하는 비동기함수
    await schema.validateAsync(req.body);
    // 성공 시 다음 미들웨어로 이동
    next();
  } catch (error) {
    // 실패 시 에러메시지 미들웨어 실행
    next(error);
  }
};
