// joi 라이브러리 가져오기
// joi : 데이터 유효성 검사 라이브러리
import Joi from 'joi';
// 메시지 상수(거듭되서 사용하는 것) 가져오기
import { MESSAGES } from '../../constants/message.constant.js';
// 이력서 최솟값 상수 가져오기
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js';

// Joi를 사용해 이력서 데이터 검증 schema 정의
const schema = Joi.object({
  // 제목 필드 정의
  // string().required() : 필수 문자열열
  title: Joi.string().required().messages({
    // 제목 없을 때 '제목을 입력해 주세요.'
    'any.required': MESSAGES.RESUMES.COMMON.TITLE.REQUIRED,
  }),
  // 내용 필드 정의
  // 최솟값이 있는 필수 문자열
  content: Joi.string().min(MIN_RESUME_LENGTH).required().messages({
    // 내용 없을 때 '자기소개를 입력해 주세요.'
    'any.required': MESSAGES.RESUMES.COMMON.CONTENT.REQUIRED,
    // 내용 최소 길이 미만일 때 `자기소개는 ${MIN_RESUME_LENGTH}자 이상 작성해야 합니다.`
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH,
  }),
});

// 이력서 생성 요청 유효성 검사
// next : 미들웨어 함수 로 넘어갈 때 사용용
export const createResumeValidator = async (req, res, next) => {
  try {
    // req.body가 스키마 조건을 만족하는지 획인하는 비동기함수
    await schema.validateAsync(req.body);
    // 검증 성공 시 다음 미들웨어로 이동
    next();
  } catch (error) {
    // 검증 실패 시 애러처리 미들웨어로 이동
    // src\middlewares\error-handler.middleware.js
    next(error);
  }
};
