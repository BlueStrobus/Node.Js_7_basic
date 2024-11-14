// [함수 연습 문제]

// 문제 1: 두 숫자를 더하는 함수를 작성하고 결과를 출력하세요.
let addN = (n, m) => {
  return n + m;
};
console.log(addN(3, 55));

// 문제 2: 이름을 매개변수로 받아서 "안녕하세요, [이름]님!"을 출력하는 함수를 작성하세요.
let hi = (name) => {
  console.log(`안녕하세요 ${name}님!`);
};
hi("지구인");

// 문제 3: 세 개의 숫자 중 가장 큰 수를 반환하는 함수를 작성하세요.
let arr = [3, 5, 2];
function max(arr) {
  let max = arr[0];
  for (let num of arr) {
    if (max < num) {
      max = num;
    }
  }
  return max;
}
max;

// 문제 4: 숫자를 매개변수로 받아 짝수인지 홀수인지 반환하는 함수를 작성하세요.
let sniffling = (n) => {
  return n % 2 === 0 ? "짝수" : "홀수";
};
console.log(sniffling(89));

// 문제 5: 배열을 매개변수로 받아 모든 요소를 출력하는 함수를 작성하세요.
let arrAll = (arr) => {
  console.log(...arr);
};
arrAll([1, 5, 8, 6, 1, 545, 4]);
