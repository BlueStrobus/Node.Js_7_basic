// posts.repository.js

// prisma client 인스턴스 가져옴
import prisma from "../utill/prisma/prisma.js";

class PostsRepository {
    #orm; //  PostsService만 접근하도록 private(#) 설정
    constructor(orm) {
        this.#orm = orm;
        //  console.log("ORM Instance:", this.#orm);
    }

    // 게시글 생성
    createPost = async ({ title, content, password }) => {
        console.log("레포지토리");
        // #orm 사용 db 접근
        return await this.#orm.posts.create({ data: { title, content, password } });
    };
    // 모든 게시글 조회
    getPosts = async () => {
        console.log("레포지토리");
        // #orm 사용 db 접근
        return await this.#orm.posts.findMany({
            select: {
                // 조회할 필드 설정
                title: true,
                content: true,
            },
        });
    };
    // 특정 게시글 조회
    getPost = async ({ id }) => {
        console.log("레포지토리", id);

        console.log(typeof id);
        // Prisma Client 사용
        return await this.#orm.posts.findUnique({
            where: { id },
            select: {
                title: true,
                content: true,
            },
        });
    };
}

// 우리는 orm으로 prisma를 사용할꺼니까 생성자에 prisma를 전달하여
// PostsRepository 인스턴스 생성 후 반환
export default new PostsRepository(prisma);
