// [조건문 연습 문제]

// 문제 1: 숫자를 입력받아 짝수인지 홀수인지 출력하세요.
function num(n) {
  return n % 2 === 0 ? "짝수" : "홀수";
}

console.log(num(6));
// 문제 2: 점수를 입력받아 학점을 출력하세요.
// 90점 이상 A, 80점 이상 B, 70점 이상 C, 그 외 D
function score(n) {
  switch (n) {
    case n > 90:
      return "A";
      break;
    case n > 80:
      return "B";
      break;
    case n > 70:
      return "C";
      break;
    default:
      return "D";
  }
}

console.log(score(85));
// 문제 3: 나이를 입력받아 성인인지 미성년자인지 출력하세요.
let adult = (age) => {
  return age >= 19 ? "성인" : "미성년자";
};

console.log(adult(77));
// 문제 4: switch문을 사용하여 요일을 출력하세요.
let day = (d) => {
  switch (d) {
    case 1:
      return "월요일";
      break;
    case 2:
      return "화요일";
      break;
    case 3:
      return "수요일";
      break;
    case 4:
      return "목요일";
      break;
    case 5:
      return "금요일";
      break;
    default:
      return "주말";
  }
};

console.log(day(2));

// 문제 5: 두 숫자를 비교하여 큰 수를 출력하세요.
let comparison = (n, m) => (n > m ? n : m);
console.log(comparison(3, 10));
