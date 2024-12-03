// Promise: 보물 찾고 열어보기
// 과제 내용:
// 1. 보물 상자를 여는 Promise 함수를 만들어보세요.
// 2. 함수는 다음 조건을 만족해야 합니다:
//        함수 이름은 findTreasure로 합니다.
function findTreasure() {
    return new Promise((resolve, reject) => {
        // 3초 동안 작업을 시뮬레이션
        setTimeout(() => {
            // 10% 확률로 성공 또는 90%확률로 실패가 발생합니다
            const isSuccess = Math.random() < 0.1;

            if (isSuccess) {
                resolve("축하합니다! 황금 보물을 발견했습니다!");
            } else {
                reject("보물을 찾는 데 실패했습니다. 다시 시도하세요.");
            }
        }, 3000); // 3초
    });
}

// 3. findTreasure를 호출한 뒤 async와 await를 사용하여 성공과 실패 메시지를 출력하세요.
async function openTreasureBox() {
    try {
        const result = await findTreasure();
        console.log(result); // 성공 시 메시지 출력
    } catch (error) {
        console.log(error); // 실패 시 메시지 출력
    }
}

openTreasureBox(); // 함수 호출


// 4. then, catch를 try/catch, async/await로 변경해보기. (이 부분은 스스로 공부해보세요!)
