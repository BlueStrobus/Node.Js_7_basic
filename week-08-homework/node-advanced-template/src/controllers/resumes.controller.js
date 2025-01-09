// resumes.controller.js
import express from 'express'; // 라우터 만들 기 위해 express 가져오기
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // http-status 상수 가져오기기
import { MESSAGES } from '../constants/message.constant.js'; // 메시지 상수 가져오기
// 이력서 생성 데이터 유효성 검사 미들웨어 가져오기
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
// DB 가져오기
import { prisma } from '../utils/prisma.util.js';
// 이력서 수정 데이터 유효성 검사 미들웨어 가져오기
import { updateResumeValidator } from '../middlewares/validators/update-resume-validator.middleware.js';
