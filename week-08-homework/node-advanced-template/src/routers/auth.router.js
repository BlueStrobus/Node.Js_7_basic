// auth.router.js

import AuthsController from '../controllers/auth.controller.js';
import express from 'express'; // Express 모듈을 가져와서 라우터를 생성하는 데 사용
import bcrypt from 'bcrypt'; // bcrypt : 비밀번호를 해싱하거나 비교하는 데 사용되는 라이브러리
import jwt from 'jsonwebtoken'; // jsonwebtoken : JSON Web Token을 생성하고 검증하는 데 사용되는 라이브러리
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // HTTP 상태 코드 상수 가져오기
import { MESSAGES } from '../constants/message.constant.js'; // 메시지 상수 가져오기
// 회원가입 인증
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
// 로그인 인증
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
// DB 가져오기
import { prisma } from '../utils/prisma.util.js';
// 인증 관련 상수 가져오기
import {
    ACCESS_TOKEN_EXPIRES_IN, // ACCESS_TOKEN 만료기한
    HASH_SALT_ROUNDS, // 비밀번호 연산 몇번 돌릴 지 결정하는 정수
} from '../constants/auth.constant.js';
// ACCESS_TOKEN 비밀키 가져오기
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

// express로 라우터 생성
const authRouter = express.Router();

// 회원가입 API
//메서드  URL         회원가입 유효성 인증
authRouter.post('/sign-up', signUpValidator, AuthsController.signUp);

// 로그인 API
//메서드  URL       로그인 유효성 인증
authRouter.post('/sign-in', signInValidator, AuthsController.signIn);

// authRouter 익스퐅트;
export { authRouter };
