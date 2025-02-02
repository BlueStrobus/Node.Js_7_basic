import { PrismaClient } from '@prisma/client'; // db연결

export const prisma = new PrismaClient({
    // Prisma를 이용해 데이터베이스를 접근할 때, SQL을 출력해줍니다.
    log: ['query', 'info', 'warn', 'error'],

    // 에러 메시지를 평문이 아닌, 개발자가 읽기 쉬운 형태로 출력해줍니다.
    errorFormat: 'pretty',
}); // PrismaClient 인스턴스를 생성합니다.

try {
    await prisma.$connect(); // 프리즈마로 db 연결결
    console.log('DB 연결에 성공했습니다.');
} catch (error) {
    // 연결 실패 에러 메시지
    console.error('DB 연결에 실패했습니다.', error);
}
