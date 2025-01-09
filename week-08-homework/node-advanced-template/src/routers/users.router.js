import express from 'express'; // 라우터 만들 기 위해 express 가져오기
// requireAccessToken 가져오기
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

// userRouter 생성
const usersRouter = express.Router();

// 유저 정보 조회 API
//메서드  URL   AccessToken 검증,
usersRouter.get('/me', requireAccessToken, UserController.getUserInfo);

// usersRouter 전역변수로 만들기
export { usersRouter };
