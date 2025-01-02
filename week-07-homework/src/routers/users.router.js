import express from 'express'; // 라우터 만들 기 위해 express 가져오기
// requireAccessToken 가져오기
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
// HTTP_STATUS 상수 가져오기
import { HTTP_STATUS } from '../constants/http-status.constant.js';
// 메시지 상수 가져오기
import { MESSAGES } from '../constants/message.constant.js';

// userRouter 생성
const usersRouter = express.Router();

// 유저 정보 조회 API
//메서드  URL   AccessToken 검증,
usersRouter.get('/me', requireAccessToken, (req, res, next) => {
    try {
        // 유저 정보를 data에 할당
        const data = req.user;

        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK, // 200
            message: MESSAGES.USERS.READ_ME.SUCCEED, // '내 정보 조회에 성공했습니다.'
            data,
        });
    } catch (error) {
        // 실패 시 에러핸들러 실행
        next(error);
    }
});

// usersRouter 전역변수로 만들기
export { usersRouter };
