// users.controller.js

// HTTP_STATUS 상수 가져오기
import { HTTP_STATUS } from '../constants/http-status.constant.js';
// 메시지 상수 가져오기
import { MESSAGES } from '../constants/message.constant.js';

class UserController {
    getUserInfo = (req, res, next) => {
        try {
            // 미들웨어에서 추가된 유저 정보를 가져옴
            const data = req.user;

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK, // 200
                message: MESSAGES.USERS.READ_ME.SUCCEED, // '내 정보 조회에 성공했습니다.'
                data,
            });
        } catch (error) {
            // 에러 발생 시, 에러 핸들러로 전달
            next(error);
        }
    };
}
export default new UserController();
