// app.js
import express from "express";
import playerRoutes from "./routes/player.routes.js";

const app = express();

app.use(express.json());
app.use("/api/players", playerRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT}port 서버실행`));
