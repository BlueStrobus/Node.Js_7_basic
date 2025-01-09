import express from 'express'; // 라우터 만들 기 위해 express 가져오기
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // http-status 상수 가져오기기
import { MESSAGES } from '../constants/message.constant.js'; // 메시지 상수 가져오기
// 이력서 생성 데이터 유효성 검사 미들웨어 가져오기
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
// DB 가져오기
import { prisma } from '../utils/prisma.util.js';
// 이력서 수정 데이터 유효성 검사 미들웨어 가져오기
import { updateResumeValidator } from '../middlewares/validators/update-resume-validator.middleware.js';

// 이력서 라우터 생성
const resumesRouter = express.Router();

// 이력서 생성
//메서드  URL     이력서 유효성 인증
resumesRouter.post('/', createResumeValidator, async (req, res, next) => {
    try {
        // req.user는 require-access-token.middleware.js에서 생성됨
        // req.user : 비번을 제외한 user테이블의 특정 클라이언트 데이터
        const user = req.user;
        // 요청 body에서 이력서 제목, 내용 가져오기
        const { title, content } = req.body;
        // authorId에 user.id할당
        const authorId = user.id;

        // resume 테이블에 데이터 생성
        const data = await prisma.resume.create({
            data: {
                authorId,
                title,
                content,
            },
        });

        // 데이터 생성 성공 시 송신할 내용
        return res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED, // 201 생성에 성공
            message: MESSAGES.RESUMES.CREATE.SUCCEED, // '이력서 생성에 성공했습니다.'
            data,
        });
    } catch (error) {
        // 생성 실패 시 에러 핸들러 미들웨어로 이동
        next(error);
    }
});

// 이력서 목록 조회 - 내 모든 이력서
//메서드  URL
resumesRouter.get('/', async (req, res, next) => {
    try {
        // user 할당
        const user = req.user;
        // user.id 할당
        const authorId = user.id;

        // 요청의 쿼리 매게변수로 정렬기준 할당
        let { sort } = req.query;

        // 정렬의 값을 소문자로 일괄 변환
        sort = sort?.toLowerCase();

        // 정렬값이 내림차순도 오름차순도 아니라면 내림차순을 정렬기준으로 해라
        // 정렬 디폴트 값이 내림차순
        if (sort !== 'desc' && sort !== 'asc') {
            sort = 'desc';
        }

        // 생성 시간 내림차 순으로 resume 테이블에서 authorId(유저id)와 일치하는(본인이 작성한) 데이터 조회
        let data = await prisma.resume.findMany({
            where: { authorId },
            orderBy: {
                createdAt: sort,
            },
            include: {
                // select로 바꿔사용할 수 있음
                author: true, // User테이블의 정보 가져오기
            },
        });

        // 생성시간으로 내림차순 정렬된 이력서 테이블의 데이터 배열 수정
        data = data.map((resume) => {
            return {
                id: resume.id,
                authorName: resume.author.name,
                title: resume.title,
                content: resume.content,
                status: resume.status,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
            };
        });

        // 성공 시 반환값
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK, // 200 호출에 성공
            message: MESSAGES.RESUMES.READ_LIST.SUCCEED, // '이력서 목록 조회에 성공했습니다.'
            data,
        });
    } catch (error) {
        // 실패시 오류처리 핸들러 실행
        next(error);
    }
});

// 이력서 상세 조회
//메서드  URL
resumesRouter.get('/:id', async (req, res, next) => {
    try {
        // user 정보 할당
        const user = req.user;
        // userId 할당
        const authorId = user.id;

        // url에서 id 가져오기
        const { id } = req.params;

        // resume 테이블에서 숫자 타입으로 변환시킨 di와 authorId 모두 일치하는 레코드 찾아 할당
        let data = await prisma.resume.findUnique({
            where: { id: +id, authorId },
            include: { author: true }, // id 일치하는 user테이블의 레코드 가져오기
        });

        // id가 일치하는 값이 없는 경우 오류처리
        if (!data) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND, // 404 데이터가 없는 경우
                message: MESSAGES.RESUMES.COMMON.NOT_FOUND, // '이력서가 존재하지 않습니다.'
            });
        }

        // data는 단일 객체를 다루고 있기에 map함수 없이 수정 가능함
        data = {
            id: data.id,
            authorName: data.author.name,
            title: data.title,
            content: data.content,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };

        // 성공 시 반환
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK, // 200 호출에 성공
            message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED, // '이력서 상세 조회에 성공했습니다.'
            data,
        });
    } catch (error) {
        // 실패 시 오류처리 핸들러 미들웨어 실행
        next(error);
    }
});

// 이력서 수정
//메서드  URL   이력서 수정 데이터 유효성 인증
resumesRouter.put('/:id', updateResumeValidator, async (req, res, next) => {
    try {
        // user 정보 할당
        const user = req.user;
        // userId할당
        const authorId = user.id;

        // 요청 url의 id를 할당
        const { id } = req.params;
        // 요청 body에서 제목과 내용 가져오기
        const { title, content } = req.body;

        // resume 테이블에서 id 값이 +id(요청URL), authorId 두값과 일치하는 경우의 데이터 가져오기
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });

        // 값이 없을 경우
        if (!existedResume) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND, // 404 데이터가 없는 경우
                message: MESSAGES.RESUMES.COMMON.NOT_FOUND, // '이력서가 존재하지 않습니다.'
            });
        }

        // resume 테이블에서 id 값이 +id(요청URL), authorId 두값과 일치하는 경우의 데이터 수정하기
        const data = await prisma.resume.update({
            where: { id: +id, authorId },
            data: {
                // ...(title && { title })는 값이 없을 경우 수정하지 말고 이전 값 그대로 두라는 뜻
                ...(title && { title }),
                ...(content && { content }),
            },
        });

        // 성공시 반환
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK, // 200 호출에 성공
            message: MESSAGES.RESUMES.UPDATE.SUCCEED, // '이력서 수정에 성공했습니다.'
            data,
        });
    } catch (error) {
        // 실패 시 에러처리 미들웨어 실행
        next(error);
    }
});

// 이력서 삭제
//메서드  URL
resumesRouter.delete('/:id', async (req, res, next) => {
    try {
        // user 정보 할당
        const user = re.user;
        // userId 할당
        const authorId = user.id;
        // id를 요청의 url 에서 가져옴
        const { id } = req.params;

        // resume 테이블에서 id 값이 +id(요청URL), authorId 두값과 일치하는 경우의 데이터 가져오기
        let existedResume = await prisma.resume.findUnique({
            where: { id: +id, authorId },
        });
        // 없다면
        if (!existedResume) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND, //404 데이터가 없는 경우
                message: MESSAGES.RESUMES.COMMON.NOT_FOUND, // '이력서가 존재하지 않습니다.'
            });
        }

        // id가 일치하는 이력서가 있다면 삭제하기
        const data = await prisma.resume.delete({
            where: { id: +id, authorId },
        });

        /// 성공시 반환
        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK, // 200 호출에 성공
            message: MESSAGES.RESUMES.DELETE.SUCCEED, // '이력서 삭제에 성공했습니다.'
            data: { id: data.id },
        });
    } catch (error) {
        // 실패 시 에러 핸들러 미들웨어 실행
        next(error);
    }
});

// resumesRouter export
export { resumesRouter };
