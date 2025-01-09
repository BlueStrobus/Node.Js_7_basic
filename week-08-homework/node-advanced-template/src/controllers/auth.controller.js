// auth.controller.js
// 오류처리 등 모든 거
import AuthService from '../services/auth.service.js';
import express from 'express'; // Express 모듈을 가져와서 라우터를 생성하는 데 사용
import bcrypt from 'bcrypt'; // bcrypt : 비밀번호를 해싱하거나 비교하는 데 사용되는 라이브러리
import jwt from 'jsonwebtoken'; // jsonwebtoken : JSON Web Token을 생성하고 검증하는 데 사용되는 라이브러리
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // HTTP 상태 코드 상수 가져오기
import { MESSAGES } from '../constants/message.constant.js'; // 메시지 상수 가져오기
// 회원가입 인증
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
// 로그인 인증
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
class AuthController {
    #service;

    constructor(service) {
        this.#service = service;
    }

    singUp = async (req, res, next) => {
        try {
            // 요청 body에서 email, password, name 가져오기
            const { email, password, name } = req.body;

            // 이미 가입된 이메일인지 확인
            const existedUser = await this.#service.checkEmail(email);

            // 이메일이 중복된 경우
            if (existedUser === 'NO') {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    status: HTTP_STATUS.CONFLICT, // 409 충돌이 발생했을 때 (예: 이메일 중복)
                    message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED, // '이미 가입 된 사용자입니다.'
                });
            }

            // 회원등록
            const createUser = await this.#service.createUser({
                email,
                password,
                name,
            });

            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
                createUser,
            });
        } catch (error) {
            // 실패 시 오류처리 핸들러 미들웨어 실행
            next(error);
        }
    };

    signIn = async (req, res, next) => {
        try {
            // 요청 body에서 이메일, 비번 받아오기
            const { email, password } = req.body;

            // 이메일로 등록된 유저 찾기
            const user = await this.#service.isEmail(email);

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
    };
}

export default new AuthController(AuthService);
