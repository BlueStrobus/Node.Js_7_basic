// 토큰 수신 애러 핸들러
import jwt from 'jsonwebtoken'; // JWT 토큰 생성 및 검증 라이브러리
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // HTTP 상태 코드 상수
import { MESSAGES } from '../constants/message.constant.js'; // 메시지 상수
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js'; // access token 비밀키
import { prisma } from '../utils/prisma.util.js'; // 프리즈마마

export const requireAccessToken = async (req, res, next) => {
    try {
        // 인증 정보 파싱
        const authorization = req.headers.authorization;

        // Authorization이 없는 경우
        if (!authorization) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED, // 401
                message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN, // '인증 정보가 없습니다.'
            });
        }

        // JWT 표준 인증 형태와 일치하지 않는 경우
        // 구조분할 - 인증 타입, 정보보
        const [type, accessToken] = authorization.split(' ');

        // 인증타입 검증
        // Beare(auth에 사용)이 아닐 때
        if (type !== 'Bearer') {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED, // 401 인증실패
                message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE, // '지원하지 않는 인증 방식입니다.'
            });
        }

        // 토큰정보 유효성 검증
        // AccessToken이 없는 경우
        if (!accessToken) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED, // 401 인증실패
                message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN, // '인증 정보가 없습니다.'
            });
        }

        // JWT는 Header, Payload, Signature로 구성됩니다.
        // payload는 인증 정보와 사용자 데이터를 담고 있으며, 암호화되지 않은 상태로 클라이언트와 서버 간에 전달됩니다.
        let payload;
        try {
            // 접근토큰을 검증하여 payload에 할당
            payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        } catch (error) {
            // AccessToken의 유효기한이 지난 경우
            if (error.name === 'TokenExpiredError') {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    status: HTTP_STATUS.UNAUTHORIZED, // 401 인증실패
                    message: MESSAGES.AUTH.COMMON.JWT.EXPIRED, // '인증 정보가 만료되었습니다.'
                });
            }
            // 그 밖의 AccessToken 검증에 실패한 경우
            else {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    status: HTTP_STATUS.UNAUTHORIZED, // 401 인증실패
                    message: MESSAGES.AUTH.COMMON.JWT.INVALID, // '인증 정보가 유효하지 않습니다.'
                });
            }
        }

        // Payload에 담긴 사용자 ID와 일치하는 사용자가 없는 경우
        const { id } = payload;
        // user테이블에서 id로 유저 데이터 찾기
        const user = await prisma.user.findUnique({
            where: { id },
            // omit는 제외하고 나머지를 가져오기
            omit: { password: true }, // 비번을 제외한 나머지를 모두 가져오기기
        });

        // id와 일치하는 데이터가 없을 때 오류 메시지 반환
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED, // 401 인증실패
                message: MESSAGES.AUTH.COMMON.JWT.NO_USER, // '인증 정보와 일치하는 사용자가 없습니다.'
            });
        }

        // user(비번을 제외한 user테이블의 특정 클라이언트 데이터) 할당
        req.user = user;
        // 다음 미들웨어로 이동
        next();
    } catch (error) {
        // 토큰 검증 실패 시 오류처리 미들웨어 실행
        next(error);
    }
};
