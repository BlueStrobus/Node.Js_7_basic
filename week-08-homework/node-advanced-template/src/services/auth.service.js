// auth.service.js
// 데이터 가공
// 인증 관련 상수 가져오기
import {
    HASH_SALT_ROUNDS, // 비밀번호 연산 몇번 돌릴 지 결정하는 정수
} from '../constants/auth.constant.js';

// ACCESS_TOKEN 비밀키 가져오기
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repositories/auth.repository.js';
import { emit } from 'process';
class AuthService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }
    // 가입여부 확인
    checkEmail = async (email) => {
        const existedUser = await this.#repository.checkEmail(email);
        if (existedUser) {
            return 'NO';
        } else {
            return 'OK';
        }
    };
    // 회원 등록
    createUser = async ({ email, password, name }) => {
        // 클라이언트로부터 받을 비밀번호를 bcrypt로 암호화
        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

        const createUser = await this.#repository.createUser({
            email,
            hashedPassword,
            name,
        });
        // 비번은 비우고  이메일과 이름만 res
        createUser.data.password = undefined;
        return createUser;
    };

    // 로그인
    isEmail = async (email) => {
        const signInData = await this.#repository.checkEmail(email);
        return signInData;
    };
}

export default new AuthService(AuthRepository);
