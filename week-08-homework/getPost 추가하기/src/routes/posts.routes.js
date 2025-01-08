// post.routes.js
// routes에서 연결할 controller 가져옴
import PostsController from "../controllers/posts.controller.js";
import express from "express";

// router 생성
const router = express.Router();

// controller의 method를 알맞는 router path와 연결
router.post("/", PostsController.createPost);
router.get("/", PostsController.getAllPosts);
router.get("/:postId", PostsController.getPostById);

export default router;
