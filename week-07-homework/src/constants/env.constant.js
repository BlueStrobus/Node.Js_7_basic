// env.constant.js
// .env 상수
import 'dotenv/config';

 // .env에서 지정한 서버포트 가져오기
export const SERVER_PORT = process.env.SERVER_PORT;
 // .env에서 지정한 ACCESS_TOKEN 비밀키 가져오기
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
