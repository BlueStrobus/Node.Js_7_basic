import readlineSync from "readline-sync";

// 프로그램 시작
function main() {
  // 사용자로부터 입력을 받습니다.
  const myChoice = readlineSync.question(
    `1. 사칙연산 계산기   2. 구구단 출력기(2~9단)   3. 종료\n`
  );
  // console.log(`당신의 선택은: ${myChoice}`);
  if (myChoice === "1") {
    console.clear(); // 다 지움
    console.log(`사칙연산 계산기를 선택하셨습니다.`);
    const n = readlineSync.question(`첫번째 숫자를 적으세요\n`);
    const f = readlineSync.question(`연산자를 적으세요\n`);
    const m = readlineSync.question(`두번째 숫자를 적으세요\n`);

    calculator(n, m, f);
  } else if (myChoice === "2") {
    console.clear(); // 다 지움
    console.log(`구구단 출력기(2~9단)를 선택하셨습니다.`);
    // 구구단 출력기 코드 추가
    printMultiplicationTable();
  } else if (myChoice === "3") {
    console.log("종료합니다");
  } else {
    console.log("올바른 번호를 입력하세요.");
    main();
  }
  // 입력에 따라 해당 기능을 실행합니다.

  // switch분기를 타서
  // 1-> 사칙연산 계산기 실행
  // 2-> 구구단 출력 프로그램 실행
}
// 사칙연산 계산기 함수
function calculator(n, m, f) {
  // 여기에 코드를 작성하세요.
  if (f === "*") {
    console.log(`결과 : ${n * m}`);
  } else if (f === "/") {
    console.log(`결과 : ${n / m}`);
  } else if (f === "-") {
    console.log(`결과 : ${n - m}`);
  } else if (f === "+") {
    console.log(`결과 : ${n + m}`);
  } else {
    console.log("연산에 실패하셨습니다.");
  }

  main();
}

// 구구단 출력 함수
function printMultiplicationTable() {
  // 여기에 코드를 작성하세요.
  for (let i = 2; i <= 9; i++) {
    console.log(`\n\n<<  ${i} 단 !  >>\n`);
    for (let j = 1; j <= 9; j++) {
      console.log(`${i} X ${j} = ${i * j}`);
    }
  }

  console.log(`\n\n\n\n`);
  main();
}

// 프로그램 실행
main();
