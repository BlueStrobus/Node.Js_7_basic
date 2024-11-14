function calculator(expression) {
  const tokens = expression.match(/\d+|\+|\-|\*|\//g);
  if (!tokens) return null; // 잘못된 입력일 경우

  // 연산자 우선순위 처리: 곱셈과 나눗셈 먼저 계산
  const stack = [];
  let currentOp = null;

  for (let token of tokens) {
    if (!isNaN(token)) {
      const num = parseInt(token);
      if (currentOp) {
        const last = stack.pop();
        if (currentOp === "*") stack.push(last * num);
        else if (currentOp === "/") stack.push(last / num);
        currentOp = null;
      } else {
        stack.push(num);
      }
    } else {
      if (token === "*" || token === "/") {
        currentOp = token;
      } else {
        stack.push(token);
      }
    }
  }

  // 덧셈과 뺄셈 계산
  let result = stack.shift();
  while (stack.length > 0) {
    const operator = stack.shift();
    const nextNum = stack.shift();
    if (operator === "+") result += nextNum;
    else if (operator === "-") result -= nextNum;
  }

  return result;
}
