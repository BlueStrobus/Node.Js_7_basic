// auth.repository.js
// DB 에서 가져오기
import { prisma } from '../utils/prisma.util.js';
import express from 'express'; // Express 모듈을 가져와서 라우터를 생성하는 데 사용
import bcrypt from 'bcrypt'; // bcrypt : 비밀번호를 해싱하거나 비교하는 데 사용되는 라이브러리
import jwt from 'jsonwebtoken'; // jsonwebtoken : JSON Web Token을 생성하고 검증하는 데 사용되는 라이브러리

class AuthRepository {
    #orm;
    constructor(orm) {
        this.#orm = orm;
    }

    // 이메일 확인
    checkEmail = async (email) => {
        const existedUser = await prisma.user.findUnique({ where: { email } });
        return existedUser;
    };
    // 회원등록
    createUser = async ({ email, hashedPassword, name }) => {
        // user 테이블에 유저 데이터 생성
        const data = await this.#orm.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return { data };
    };
}
export default new AuthRepository(prisma);
