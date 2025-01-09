// joi 라이브러리 가져오기
import Joi from 'joi';
// 메시지 상수 가져오기
import { MESSAGES } from '../../constants/message.constant.js';
// 이력서 최소길이 가져오기
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js';

// 이력서 수정 검증 스키마
const schema = Joi.object({
  // 제목은 문자열
  title: Joi.string(),
  // 내용은 최소길이가 정해진 문자열
  content: Joi.string().min(MIN_RESUME_LENGTH).messages({
    // 최소 길이 미만의 문자열일 때
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH,
  }),
})
// 내용의 길이가 최소 1이어야 함함
  .min(1)
  .messages({
    // 내용 없을 때 '수정 할 정보를 입력해 주세요.'
    'object.min': MESSAGES.RESUMES.UPDATE.NO_BODY_DATA,
  });

// 이력서 수정 데이터 검증 함수
export const updateResumeValidator = async (req, res, next) => {
  try {
    // 이력서 검증 스키마
    await schema.validateAsync(req.body);
    // 성공 시 다음 미들웨어로
    next();
  } catch (error) {
    // 실패 시 에러 미들웨어로 이동
    next(error);
  }
};
