// 게시글 생성
router.post("/posts", async (req, res) => {
    const { title, content, password } = req.body;
    const post = await prisma.posts.create({
        data: {
            title,
            content,
            password,
        },
    });

    return res.status(201).json({ data: post });
});
