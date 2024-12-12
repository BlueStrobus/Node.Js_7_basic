// // controllers/playerController.js
import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 공통 에러 핸들러 - 에러처리 미들웨어 만들기기
// const handleError = (res, code, message) => res.status(code).json({ message });
// playerController.js
function handleError(res, error) {
    if (!res.headersSent) {
        // 헤더가 이미 전송되었는지 확인
        res.status(500).json({ error: error.message });
    } else {
        console.error("Headers already sent:", error);
    }
}

// Read
export const getAllPlayers = async (req, res, next) => {
    try {
        const data = await prisma.players.findMany({
            select: {
                id: true,
                name: true,
                speed: true,
                shooting: true,
                grade: true,
                updateAt: true,
                createdAt: true,
            },
        });
        return res.status(200).json(data);
    } catch (error) {
        handleError(res, 500, `Internal server error - ${error}`);
    }
};

// Add
export const addPlayer = async (req, res, next) => {
    console.log("addPlayer");
    try {
        const { name, speed, shooting, grade } = req.body;
        if (!name || !speed || !shooting || !grade)
            return handleError(res, 400, "All fields (name, speed, shooting, grade) are required.");

        const existingPlayer = await prisma.players.findUnique({ where: { name } });
        if (existingPlayer) return handleError(res, 409, "Player with this name already exists.");

        const newPlayer = await prisma.players.create({
            data: { name, speed, shooting, grade },
        });

        res.status(201).json(newPlayer);
    } catch (error) {
        handleError(res, 500, `Failed to add player : ${error}`);
    }
};

// Update
export const updatePlayer = async (req, res, next) => {
    try {
        const { name } = req.params;
        const { updateName, speed, shooting, grade } = req.body;

        if (!name) return handleError(res, 400, "Player name is required.");

        const playerId = await prisma.players.findUnique({
            where: { name },
            select: { id: true },
        });
        if (!playerId) return handleError(res, 404, "Player not found.");

        // 업데이트하려는 이름이 데이터베이스에 존재하는지 확인
        if (updateName) {
            const existingPlayer = await prisma.players.findUnique({
                where: { name: updateName },
                select: { id: true },
            });

            if (existingPlayer && existingPlayer.id !== playerId.id) {
                return handleError(res, 409, "Player with this name already exists.");
            }
        }

        console.log(1);
        // 플레이어 업데이트
        const updateData = {};
        if (updateName !== undefined) updateData.name = updateName;
        if (speed !== undefined) updateData.speed = speed;
        if (shooting !== undefined) updateData.shooting = shooting;
        if (grade !== undefined) updateData.grade = grade;

        const updatedPlayer = await prisma.players.update({
            where: { id: playerId.id },
            data: updateData,
        });

        return res.status(200).json(updatedPlayer);
    } catch {
        handleError(res, 500, "Failed to update player");
    }
};

// export const updatePlayer = async (req, res, next) => {
//     try {
//         const { id } = req.params; // id로 대체
//         const { updateName, speed, shooting, grade } = req.body;

//         // 유효성 검사
//         if (!id) return handleError(res, 400, "Player ID is required.");
//         if (!updateName && speed === undefined && shooting === undefined && grade === undefined) {
//             return handleError(res, 400, "At least one field to update is required.");
//         }

//         // 플레이어 찾기
//         const findPlayer = await prisma.players.findUnique({
//             where: { id: parseInt(id) }, // id는 숫자형으로 파싱
//         });

//         if (!findPlayer) return handleError(res, 404, "Player not found.");

//         // 플레이어 업데이트
//         const updateData = {};
//         if (updateName) updateData.name = updateName;
//         if (speed !== undefined) updateData.speed = speed;
//         if (shooting !== undefined) updateData.shooting = shooting;
//         if (grade !== undefined) updateData.grade = grade;

//         const updatedPlayer = await prisma.players.update({
//             where: { id: parseInt(id) },
//             data: updateData,
//         });

//         res.status(200).json(updatedPlayer);
//     } catch (error) {
//         console.error(error); // 디버깅에 유용한 로그
//         handleError(res, 500, "Failed to update player");
//     }
// };

// Delete
export const deletePlayer = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (!name) return handleError(res, 400, "Player name is required.");

        const isPlayer = await prisma.players.findUnique({
            where: { name },
            select: { id: true },
        });
        if (!isPlayer) return handleError(res, 404, "Player not found.");

        const deleteP = await prisma.players.delete({
            where: { id: isPlayer.id },
        });

        return res.status(204).json();
    } catch {
        handleError(res, 500, "Failed to delete player");
    }
};
