import readlineSync from "readline-sync";
// 설치 방법 : npm i 설치할것
// 프로그램 시작
function main() {
  // 사용자로부터 입력ㅇ르 받습니다.
  console.log(`1. 사칙연산 2. 구구단 출력 3. 종료`);
  const myChoice = readlineSync.question("숫자를 입력해주세요 : ");

  switch (myChoice) {
    case "1":
      numInput();
      break;
    case "2":
      printMultiplicationTable();
      break;
    case "3":
      process.exit();
    default:
      console.log("잘못 입력하셨습니다.\n종료됩니다.");
  }
}

function numInput() {
  console.clear(); // 다 지움
  console.log(`사칙연산 계산기를 선택하셨습니다.`);
  const n = readlineSync.question(`첫번째 숫자를 적으세요\n`);
  const f = readlineSync.question(`연산자를 적으세요(+ - / * %)\n`);
  const m = readlineSync.question(`두번째 숫자를 적으세요\n`);
  calculator(parseInt(n), parseInt(m), f);
}

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

function printMultiplicationTable() {
  console.clear(); // 다 지움
  console.log(`구구단을 선택하셨습니다.`);
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

main();
