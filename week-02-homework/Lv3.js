//find 구현
const objArray1 = [
  { name: "apple", price: 100 },
  { name: "banana", price: 200 },
  { name: "grape", price: 300 },
];

// myFind 를 구현하여 arr.find 와 동일한 값이 나오도록 하기.
function myFind(arr, callback) {
  // myFind 구현
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      return arr[i];
    }
  }
}

const result1a = objArray1.find(function (obj) {
  return obj.name === "banana";
});
const result1b = myFind(objArray1, function (obj) {
  return obj.name === "banana";
});
console.log(result1a === result1b); // true

////////////////////////////////////////

//findIndex 구현
const objArray2 = [
  { name: "apple", price: 100 },
  { name: "banana", price: 200 },
  { name: "grape", price: 300 },
];

// myFindIndex 를 구현하여 arr.findIndex 와 동일한 값이 나오도록 하기.
function myFindIndex(arr, callback) {
  // myFindIndex 구현
  for (let i = 0; i < objArray2.length; i++) {
    if (callback(arr[i])) {
      return i;
    }
  }
}

const result2a = objArray2.findIndex(function (obj) {
  return obj.name === "banana";
});

const result2b = myFindIndex(objArray2, function (obj) {
  return obj.name === "banana";
});

console.log(result2a === result2b); // true

///////////////////////////

//filter 사용
const objArray3 = [
  { name: "apple", price: 100 },
  { name: "banana", price: 200 },
  { name: "grape", price: 300 },
];

// filter 를 이용하여 price가 200 이상인 객체 filter
const objFiltered = objArray3.filter(function (item) {
  return item.price >= 200;
});
console.log(objFiltered);

/////////////////////////////

//map 사용
const objArray4 = [
  { name: "apple", price: 100 },
  { name: "banana", price: 200 },
  { name: "grape", price: 300 },
];

// map을 이용하여 price값만 모아둔 배열 만들기
const objMap = objArray4.map(function (item) {
  return item.price;
});
console.log(objMap);
