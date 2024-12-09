```markdown
# 🏟️ Player Management API

## 📚 Overview
축구선수를 주제로 RESTful API와 MVC 패턴을 활용하여 `/players`의 CRUD 기능을 구현한 프로젝트입니다.
https://ashen99.tistory.com/405

### 주요 기술 스택
- **Express.js**: 웹 애플리케이션 프레임워크
- **Node.js**: 런타임 환경
- **인메모리 데이터베이스**: 배열을 활용하여 데이터 관리

---

## ⚙️ 프로젝트 초기화
### 1. 프로젝트 생성 및 의존성 설치
```bash
# 프로젝트 초기화
yarn init -y

# Express 설치
yarn add express

# 개발 의존성 설치 (nodemon)
yarn add nodemon --dev
```

### 2. `package.json` 설정
```json
{
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

---

## 📂 파일 구조
```
📦 프로젝트 루트
├── app.js                # 서버 진입점
├── controllers/          # 컨트롤러 로직
│   └── playerController.js
├── models/               # 데이터 및 로직 관리
│   └── players.js
└── views/                # API 테스트 (Insomnia 등)
```

---

## 🚀 API 명세서

### 1. **GET** `/api/players`
모든 플레이어 정보 조회

#### 요청
- **Method**: GET
- **Headers**: 없음
- **Body**: 없음

#### 응답
```json
200 OK
[
  { "name": "손흥민", "speed": 200, "shooting": 150, "grade": "S" },
  ...
]
```
```json
500 Internal Server Error
{ "message": "Internal server error" }
```

---

### 2. **POST** `/api/players`
새로운 플레이어 추가

#### 요청
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "박지성",
  "speed": 95,
  "shooting": 88,
  "grade": "A"
}
```

#### 응답
```json
201 Created
{ "name": "박지성", "speed": 95, "shooting": 88, "grade": "A" }
```
```json
400 Bad Request
{ "message": "All fields (name, speed, shooting, grade) are required." }
```
```json
409 Conflict
{ "message": "Player with this name already exists." }
```

---

### 3. **PUT** `/api/players/:name`
특정 플레이어 업데이트

#### 요청
- **Method**: PUT
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{ "speed": 98, "shooting": 90, "grade": "S" }
```

#### 응답
```json
200 OK
{ "name": "박지성", "speed": 98, "shooting": 90, "grade": "S" }
```
```json
404 Not Found
{ "message": "Player not found" }
```

---

### 4. **DELETE** `/api/players/:name`
특정 플레이어 삭제

#### 요청
- **Method**: DELETE
- **Headers**: 없음

#### 응답
```json
204 No Content
```
```json
404 Not Found
{ "message": "Player not found" }
```

---

## 🧩 RESTful API 설계 규칙
1. **소문자 사용**: `http://example.com/api/players`
2. **하이픈 사용**: `http://example.com/player-management`
3. **맨 뒤에 슬래시(/) 미포함**: `http://example.com/players`
4. **HTTP Method 사용**: GET, POST, PUT, DELETE 등
5. **파일 확장자 제외**: JSON, XML 등은 `Accept` 헤더로 정의
6. **복수형 사용**: `http://example.com/api/players`
---

---

## 🧩 사용한 에러 상태 코드

**200**: `요청 성공 및 데이터를 반환함.`
**201**: `자원이 성공적으로 생성됨.`
**204**: `요청 성공 및 응답 본문 없음.`
**400**: `잘못된 요청 데이터.`
**404**: `자원을 찾을 수 없음.`
**409**: `중복된 자원으로 인해 요청 거절.`
**500**: `서버 내부 오류.`


---

---

## 참고 자료
- [RESTful API 설계 규칙](https://nbcamp.spartacodingclub.kr/blog/%EA%B0%9C%EB%85%90-%EC%BD%95-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EC%A7%80%EC%8B%9D-%ED%8E%B8-restful%ED%95%9C-api-%EC%84%A4%EA%B3%84%EB%B2%95-21182)
- [Express.js 공식 문서](https://expressjs.com/)

---
```
