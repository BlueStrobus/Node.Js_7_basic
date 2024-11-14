// [반복문 연습 문제]

// 문제 1: 1부터 10까지의 숫자를 출력하세요.
let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}
// 문제 2: 1부터 10까지의 합을 계산하여 출력하세요.

let n = 0;
for (i = 1; i <= 10; i++) {
  n += i;
  if (i === 10) {
    console.log(n);
  }
}
// 문제 3: 구구단 3단을 출력하세요.

for (i = 0; i <= 10; i++) {
  console.log(`3 곱하기 ${i} 는 ${3 * i}`);
}

// 문제 4: 배열에 저장된 과일들을 하나씩 출력하세요.
var fruits = ["사과", "바나나", "포도"];
for (let fruit of fruits) {
  console.log(fruit);
}

// 문제 5: while문을 사용하여 5부터 1까지 역순으로 출력하세요.
let n5 = 5;
while (n5 > 0) {
  console.log(n5);
  n5--;
}
