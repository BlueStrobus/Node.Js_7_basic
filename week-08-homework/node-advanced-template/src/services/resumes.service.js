// resumes.service.js
import ResumeRepository from '../services/resumes.service.js';

class ResumeService {
    #service;
    constructor(service) {
        this.#service = service;
    }

    // 이력서 라우터 생성

    // 이력서 생성
    //메서드  URL     이력서 유효성 인증
    createResume = async ({ authorId, title, content }) => {
        let data = await this.#service.createResume;
        return { data };
    };

    // 이력서 목록 조회 - 내 모든 이력서
    //메서드  URL
    //  getMyResumes = async (authorId) => {
    getMyResumes = async (authorId) => {
        let data = await this.#service.getMyResumes(authorId);
        // 서비스스
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
        return { data };
    };

    // 이력서 상세 조회
    //메서드  URL
    // getMyResume = async (id ) => { // authorId 일치여부 서비스에서 확인
    getMyResume = async ({ authorId, id }) => {
        let data = await this.#service.getMyResume(id);
        if (data.authorId === authorId) {
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

            return { data };
        }
    };

    // 이력서 수정, 삭제용 상세조회
    getMyResume = async ({ authorId, id }) => {
        let data = await this.#service.getMyResume(id);
        if (data.authorId === authorId) {
            return { data };
        }
    };
    // 이력서 수정
    //메서드  URL   이력서 수정 데이터 유효성 인증
    // editResume = async ({ authorId, id, title, content }) => {
    editResume = async ({ authorId, id, title, content }) => {
        let data = await this.#service.editResume({
            authorId,
            id,
            title,
            content,
        });
        return { data };
    };
    // 이력서 삭제
    //메서드  URL
    // deleteResume = async ({ authorId, id }) => {
    deleteResume = async ({ authorId, id }) => {
        let data = await this.#service.deleteResume({ authorId, id });
        return { data };
    };
}

export default new ResumeService(ResumeRepository);
