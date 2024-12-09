// // controllers/playerController.js
// import { players } from "../models/players.js";

// export const getAllPlayers = (req, res) => {
//     res.json(players);
// };

// export const addPlayer = (req, res) => {
//     const { name, speed, shooting, grade } = req.body;
//     const newPlayer = { name, speed, shooting, grade };
//     players.push(newPlayer);
//     res.status(201).json(newPlayer);
// };

// export const updatePlayer = (req, res) => {
//     const { name } = req.params;
//     const { speed, shooting, grade } = req.body;
//     const player = players.find((p) => p.name === name);

//     if (!player) return res.status(404).json({ message: "Player not found" });

//     if (speed) player.speed = speed;
//     if (shooting) player.shooting = shooting;
//     if (grade) player.grade = grade;

//     res.json(player);
// };

// export const deletePlayer = (req, res) => {
//     const { name } = req.params;
//     const index = players.findIndex((p) => p.name === name);

//     if (index === -1) return res.status(404).json({ message: "Player not found" });

//     players.splice(index, 1);
//     res.status(204).send();
// };

import { players } from "../models/players.js";

// 공통 에러 핸들러
const handleError = (res, code, message) => res.status(code).json({ message });

export const getAllPlayers = (req, res) => {
    try {
        res.status(200).json(players);
    } catch {
        handleError(res, 500, "Internal server error");
    }
};

export const addPlayer = (req, res) => {
    try {
        const { name, speed, shooting, grade } = req.body;
        if (!name || !speed || !shooting || !grade) return handleError(res, 400, "All fields (name, speed, shooting, grade) are required.");

        if (players.some((p) => p.name === name)) return handleError(res, 409, "Player with this name already exists.");

        const newPlayer = { name, speed, shooting, grade };
        players.push(newPlayer);
        res.status(201).json(newPlayer);
    } catch {
        handleError(res, 500, "Failed to add player");
    }
};

export const updatePlayer = (req, res) => {
    try {
        const { name } = req.params;
        const { speed, shooting, grade } = req.body;
        if (!name) return handleError(res, 400, "Player name is required.");

        const player = players.find((p) => p.name === name);
        if (!player) return handleError(res, 404, "Player not found.");

        Object.assign(player, { ...(speed && { speed }), ...(shooting && { shooting }), ...(grade && { grade }) });
        res.status(200).json(player);
    } catch {
        handleError(res, 500, "Failed to update player");
    }
};

export const deletePlayer = (req, res) => {
    try {
        const { name } = req.params;
        if (!name) return handleError(res, 400, "Player name is required.");

        const index = players.findIndex((p) => p.name === name);
        if (index === -1) return handleError(res, 404, "Player not found.");

        players.splice(index, 1);
        res.status(204).send();
    } catch {
        handleError(res, 500, "Failed to delete player");
    }
};
