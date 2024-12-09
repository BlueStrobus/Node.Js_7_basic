// // routes/player.routes.js
// import express from "express";
// import { getAllPlayers, addPlayer, updatePlayer, deletePlayer } from "../controllers/playerController.js";

// const router = express.Router();

// router.get("/", getAllPlayers);
// router.post("/", addPlayer);
// router.patch("/:name", updatePlayer);
// router.delete("/:name", deletePlayer);

// export default router;

import express from "express";
import { getAllPlayers, addPlayer, updatePlayer, deletePlayer } from "../controllers/playerController.js";

const router = express.Router();

router.route("/").get(getAllPlayers).post(addPlayer);

router.route("/:name").put(updatePlayer).delete(deletePlayer);

export default router;
