// Promise: 보물 찾고 열어보기
// 과제 내용:
// 1. 보물 상자를 여는 Promise 함수를 만들어보세요.
// 2. 함수는 다음 조건을 만족해야 합니다:
//        함수 이름은 findTreasure로 합니다.
function findTreasure() {
    return new Promise((resolve, reject) => {
        // 3초 동안 보물을 찾는 작업을 시뮬레이션합니다.
        setTimeout(() => {
            //  10% 확률로 성공 또는 90%확률로 실패가 발생합니다
            const isSuccess = Math.random() < 0.1;

            // 성공(resolve) 시 “축하합니다! 황금 보물을 발견했습니다!” 메시지를 반환.
            if (isSuccess) {
                resolve("축하합니다! 황금 보물을 발견했습니다!");
            } else {
                // 실패(reject) 시 “보물을 찾는 데 실패했습니다. 다시 시도하세요.” 메시지를 반환.
                reject("보물을 찾는 데 실패했습니다. 다시 시도하세요.");
            }
        }, 3000); // 3초 대기
    });
}

// 3. findTreasure를 호출한 뒤 try와 .catch()를 사용하여 성공과 실패 메시지를 출력하세요
async function treasureHunt() {
  try {
    const message = await findTreasure();
    console.log(message); // 성공 메시지 출력
  } catch (error) {
    console.log(error); // 실패 메시지 출력
  }
}

treasureHunt();

/*
(async function () {
    try {
        const result = await findTreasure();
        console.log(result); // 성공 메시지 출력
    } catch (error) {
        console.log(error); // 실패 메시지 출력
    }
})();*/
