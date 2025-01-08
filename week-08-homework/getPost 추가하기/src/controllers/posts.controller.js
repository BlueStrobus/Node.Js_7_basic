import PostsService from "../services/posts.service.js";

class PostsController {
    #service;

    constructor(service) {
        this.#service = service;
    }

    createPost = async (req, res) => {
        console.log("컨트롤러");
        try {
            const { title, content, password } = req.body;
            if (!title || !content || !password) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const post = await this.#service.createPost({ title, content, password });
            return res.status(201).json({ data: post });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    getAllPosts = async (req, res) => {
        console.log("컨트롤러");
        try {
            const posts = await this.#service.getAllPosts();
            return res.status(200).json({ data: posts });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    getPostById = async (req, res) => {
        console.log("getPostById 컨트롤러");
        try {
            const { postId } = req.params;
            if (!postId) {
                return res.status(400).json({ error: "postId is required" });
            }
            const post = await this.#service.getPostById(+postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.status(200).json({ data: post });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

export default new PostsController(PostsService);
