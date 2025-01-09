// 반환 메시지 모음
import { MIN_PASSWORD_LENGTH } from './auth.constant.js'; // 비밀번호 최소길이 가져오기
import { MIN_RESUME_LENGTH } from './resume.constant.js'; // 자기소개 최소길이 가져오기

// 메시지 모음
export const MESSAGES = {
  AUTH: {
    COMMON: {
      // 오류 메시지지      
      // 이메일 + 오류 메시지
      EMAIL: { 
        REQUIRED: '이메일을 입력해 주세요.',
        INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
        DUPLICATED: '이미 가입 된 사용자입니다.',
      },
      // 비번 + 오류 메시지
      PASSWORD: {
        REQURIED: '비밀번호를 입력해 주세요.',
        MIN_LENGTH: `비밀번호는 ${MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CONFIRM: {
        REQURIED: '비밀번호 확인을 입력해 주세요.',
        NOT_MACHTED_WITH_PASSWORD: '입력 한 두 비밀번호가 일치하지 않습니다.',
      },
      // 이름
      NAME: {
        REQURIED: '이름을 입력해 주세요.',
      },
      // 인증 오류 메시지
      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
      },
    },
    // 성공 메시지
    // 회원가입
    SIGN_UP: {
      SUCCEED: '회원가입에 성공했습니다.',
    },
    // 로그인
    SIGN_IN: {
      SUCCEED: '로그인에 성공했습니다.',
    },
  },
  // 유저 정보 조회회
  USERS: {
    READ_ME: {
      SUCCEED: '내 정보 조회에 성공했습니다.',
    },
  },
  // 자기소개서 메시지 모음음
  RESUMES: {
    COMMON: {
      TITLE: { // 제목 없을 때 오류처리
        REQUIRED: '제목을 입력해 주세요.',
      },
      CONTENT: {
        REQUIRED: '자기소개를 입력해 주세요.', // 자기소개서 내용 없음 오류처리리
        MIN_LENGTH: `자기소개는 ${MIN_RESUME_LENGTH}자 이상 작성해야 합니다.`, // 자기소개서 최소 글자 길이 미달 시 오류처리
      },
      // 이력서가 없는 경우
      NOT_FOUND: '이력서가 존재하지 않습니다.',
    },
    // 이력서 작성 관련 성공 메시지
    CREATE: {// 이력서 생성
      SUCCEED: '이력서 생성에 성공했습니다.',
    },
    READ_LIST: {// 이력서 모두 조회
      SUCCEED: '이력서 목록 조회에 성공했습니다.',
    },
    READ_DETAIL: {// 이력서 상세조회
      SUCCEED: '이력서 상세 조회에 성공했습니다.',
    },
    UPDATE: {// 이력서 수정 
      SUCCEED: '이력서 수정에 성공했습니다.',
      NO_BODY_DATA: '수정 할 정보를 입력해 주세요.',
    },
    DELETE: {// 이력서 삭제
      SUCCEED: '이력서 삭제에 성공했습니다.',
    },
  },
};
