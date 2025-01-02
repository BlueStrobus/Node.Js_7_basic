// Express 애플리케이션 에러핸들러 미들웨어
import { HTTP_STATUS } from '../constants/http-status.constant.js';

// 에러처리 미들웨어
export const errorHandler = (err, req, res, next) => {
  // 에러 로그 출력
  console.error(err);

  // joi에서 발생한 에러 처리
  // joi 라이브러리 : Node.js에서 사용할 수 있는 데이터 검증 및 스키마 유효성 검사 라이브러리이다. 
  // joi는 데이터의 형식, 범위, 값 등을 정의하고 유효성을 검사할 수 있게 해 준다.
  if (err.name === 'ValidationError') { // 유효성 검사시 발생한 오류 처리
    // 요청에 대한 에러 발생 시
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      // 잘못된 요청 
      status: HTTP_STATUS.BAD_REQUEST,//400
      message: err.message, // 에러 메시지
    });
  }

  // 그 밖의 예상치 못한 에러 처리
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR, // 500
    message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
  });
};
