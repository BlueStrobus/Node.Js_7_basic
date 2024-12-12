// routes/player.routes.js

import express from "express";
import {
    getAllPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
} from "../controllers/playerController.js";

const router = express.Router();

router.route("/").get(getAllPlayers).post(addPlayer);

router.route("/:name").put(updatePlayer).delete(deletePlayer);

export default router;
