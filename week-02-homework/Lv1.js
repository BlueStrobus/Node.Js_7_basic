// forEach 사용
const objArray = [
  { name: "apple", price: 100 },
  { name: "banana", price: 200 },
  { name: "grape", price: 300 },
];

// forEach를 이용하여 objArray의 name을 모두 출력
objArray.forEach(function (value) {
  console.log(value.name);
});

///////////////////////////////////

// indexOf 구현
// myIndexOf를 구현하여 arr1.indexOf와 동일한 값이 나오도록 하기.
const arr1 = [1, 2, 3, 4, 5];
function myIndexOf(arr, value) {
  // myIndexOf 구현
  for (let i = 0; i < arr1.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
}

const index1 = arr1.indexOf(3); // 2
const index2 = myIndexOf(arr1, 3); // 2
console.log(index1 === index2); // true

/////////////////////////////////

// includes 구현
// myIncludes를 구현하여 arr.myIncludes와 동일한 값이 나오도록 하기.
const arr2 = [1, 2, 3, 4, 5];
function myIncludes(arr, value) {
  // myIncludes 구현
  for (let i = 0; i < arr.length; i++) {
    if (arr[1] === value) {
      return true;
    }
  }
  return false;
}

const includes1 = arr2.includes(3); // true
const includes2 = myIncludes(arr2, 3); // true
console.log(index1 === index2); // true
