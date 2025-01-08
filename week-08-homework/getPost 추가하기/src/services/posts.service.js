// posts.service.js
// PostsRepository : posts.repository.js 에서 생성해서 반환 된 인스턴스
import PostsRepository from "../repositories/posts.repository.js";

class PostsService {
    // repository는 오직 PostsService만 접근하도록 private(#) 설정
    #repository;

    // PostsService가 생성될 때 PostsRepository를 받게 함.
    constructor(repository) {
        this.#repository = repository;
    }

    // 게시글 생성
    createPost = async (postData) => {
        console.log("서비스");

        // PostsService가 생성될 때 받은 #repository를 활용하여 요청
        return await this.#repository.createPost(postData);
    };

    // 각 메서드 이름을 명확히 분리합니다
    getAllPosts = async () => {
        console.log("서비스");
        return await this.#repository.getPosts();
    };

    getPostById = async (id) => {
        console.log("서비스");
        return await this.#repository.getPost({ id });
    };
}
export default new PostsService(PostsRepository);
