// auth.router.js

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
authRouter.post('/sign-up', signUpValidator, async (req, res, next) => {
    try {
        // 요청 body에서 email, password, name 가져오기
        const { email, password, name } = req.body;

        // 이미 가입된 이메일인지 확인
        const existedUser = await prisma.user.findUnique({ where: { email } });

        // 이메일이 중복된 경우
        if (existedUser) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                status: HTTP_STATUS.CONFLICT, // 409 충돌이 발생했을 때 (예: 이메일 중복)
                message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED, // '이미 가입 된 사용자입니다.'
            });
        }

        // 클라이언트로부터 받을 비밀번호를 bcrypt로 암호화
        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

        // user 테이블에 유저 데이터 생성
        const data = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        // 비번은 비우고  이메일과 이름만 res
        data.password = undefined;

        return res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
            data,
        });
    } catch (error) {
        // 실패 시 에러처리 핸들러 미들웨어 실행
        next(error);
    }
});

// 로그인 API
//메서드  URL       로그인 유효성 인증
authRouter.post('/sign-in', signInValidator, async (req, res, next) => {
    try {
        // 요청 body에서 이메일, 비번 받아오기
        const { email, password } = req.body;

        // 이메일로 등록된 유저 찾기
        const user = await prisma.user.findUnique({ where: { email } });

        // 입력받은 비번을 암호화하여 저장된 비밀번호와 비교
        const isPasswordMatched =
            user && bcrypt.compareSync(password, user.password);

        // 비번이 다를 경우 애러 처리
        if (!isPasswordMatched) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED, // 401 인증 실패 unauthenciated
                message: MESSAGES.AUTH.COMMON.UNAUTHORIZED, // '인증 정보가 유효하지 않습니다.',
            });
        }

        // payload는 인증 정보와 사용자 데이터를 담고 있음.
        // payload.id에 user.id 할당
        const payload = { id: user.id };

        // 비밀 키와 만료 시간으로 JWT 접근 토큰 생성
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        });

        //
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK, // 200 호출에 성공
            message: MESSAGES.AUTH.SIGN_IN.SUCCEED, // '로그인에 성공했습니다.'
            data: { accessToken }, // data에 accessToken담아서   반환
        });
    } catch (error) {
        // 실패 시 오류처리 핸들러 미들웨어 실행
        next(error);
    }
});

// authRouter 익스퐅트;
export { authRouter };
