// 여태껏 app.js 에서 서버 여는 코드 위에 썼던 
// import from~과 

// 라우터 생성을 위해 express 가져오기
import express from 'express';
// 권한 라우터 가져오기
import { authRouter } from './auth.router.js';
// 유저 라우터 가져오기
import { usersRouter } from './users.router.js';
// 이력서 라우터 가져오기
import { resumesRouter } from './resumes.router.js';
// 액세스 토큰 검증하는 미들웨어
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

// apiRouter 생성성
const apiRouter = express.Router();
// 라우터의 경로
// '/auth' 경로로 들어오는 요청은 authRouter에서 처리
apiRouter.use('/auth', authRouter);
// '/users' 경로로 들어오는 요청은 usersRouter에서 처리
apiRouter.use('/users', usersRouter);
// '/resumes' 경로로 들어오는 요청은 requireAccessToken 미들웨어를 거친 후 resumesRouter(이력서)에서 처리
apiRouter.use('/resumes', requireAccessToken, resumesRouter);

// apiRouter export
export { apiRouter };