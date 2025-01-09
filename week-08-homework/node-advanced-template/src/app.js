// Express 모듈 가져오기 - 서버 생성, 라우팅 처리
import express from 'express';
// 서버 포트번호 가져오기
import { SERVER_PORT } from './constants/env.constant.js';
// 에러처리 미들웨어 가져오기
import { errorHandler } from './middlewares/error-handler.middleware.js';
// http 상태상수 가져오기
import { HTTP_STATUS } from './constants/http-status.constant.js';
// apiRouter 가져오기
import { apiRouter } from './routers/index.js';

// Express 애플리케이션 생성
const app = express();

// JSON형태의 요청 body를 처리할 수 있도록 설정
app.use(express.json());
// URL-encoded 요청을 처리할 수 있도록 설정
app.use(express.urlencoded({ extended: true }));

// health check api는 현재 서버의 상태가 정상인지 여부를 확인하는 것.
// 서버 실행 전반(전,중,후)에 걸쳐서 손쉽게 서버의 상태를 확인할 때 사용하기 좋다.
app.get('/health-check', (req, res) => {
    // 성공 시 반환 200(호출에 성공), `I'm healthy.`
    return res.status(HTTP_STATUS.OK).send(`I'm healthy.`);
});

// API 라우터 연결
// '/api' 경로로 들어오는 모든 요청은 `apiRouter`에서 처리
// apiRouter url 앞에 '/api'를 붙여 사용하기
app.use('/api', apiRouter);
// 전역 에러 핸들러 등록:
app.use(errorHandler);

// 서버 실행
app.listen(SERVER_PORT, () => {
    // 서버 실행 성공 시 콘솔 출력문
    console.log(`서버가 ${SERVER_PORT}번 포트에서 실행 중입니다.`);
});
