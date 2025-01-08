// app.js
import express from "express";
// postsRoutes가져옴
import postsRoutes from "./routes/posts.routes.js";

const app = express();
const PORT = 3017;

app.use(express.json());

// postsRoutes를 /api/posts Path에 연결
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => {
    console.log(PORT, "포트로 서버가 열렸어요!");
});
