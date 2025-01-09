// resumes.repository.js
// DB 가져오기
import { prisma } from '../utils/prisma.util.js';

class ResumeRepository {
    #orm;
    constructor(orm) {
        this.#orm = orm;
    }

    // 이력서 라우터 생성

    // 이력서 생성
    //메서드  URL     이력서 유효성 인증
    createResume = async ({ authorId, title, content }) => {
        const createResume = await this.#orm.resume.create({
            data: {
                authorId,
                title,
                content,
            },
        });
        return createResume;
    };
    // 이력서 목록 조회 - 내 모든 이력서
    //메서드  URL
    getMyResumes = async (authorId) => {
        const myResumes = await this.#orm.resume.findMany({
            where: { authorId },
            orderBy: {
                createdAt: desc,
            },
            include: {
                // select로 바꿔사용할 수 있음
                author: true, // User테이블의 정보 가져오기
            },
        });
        return myResumes;
    };

    // 이력서 상세 조회
    //메서드  URL
    getMyResume = async (id) => {
        const myResume = await this.#orm.resume.findUnique({
            where: { id: +id }, // authorId 일치여부 서비스에서 확인
            include: { author: true }, // id 일치하는 resume과 user테이블의 레코드 가져오기
        });

        return myResume;
    };
    // 이력서 수정
    //메서드  URL   이력서 수정 데이터 유효성 인증
    editResume = async ({ authorId, id, title, content }) => {
        const editResume = await this.#orm.resume.update({
            where: { AND: [{ id: +id }, { authorId }] },
            data: {
                // ...(title && { title })는 값이 없을 경우 수정하지 말고 이전 값 그대로 두라는 뜻
                ...(title && { title }),
                ...(content && { content }),
            },
        });
        return editResume;
    };
    // 이력서 삭제
    //메서드  URL

    deleteResume = async ({ authorId, id }) => {
        const deleteResume = await this.#orm.resume.delete({
            where: { id: +id, authorId },
        });
        return deleteResume;
    };
}
export default new ResumeRepository(prisma);
