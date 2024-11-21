//filter 구현
const objArray = [
  { name: "apple", price: 100 },
  { name: "banana", price: 200 },
  { name: "grape", price: 300 },
];

// myFilter 를 구현하여 arr.filter 와 동일한 값이 나오도록 하기.
function myFilter(arr, callback) {
  // myFilter 구현
  let objFArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      objFArr.push(arr[i]);
    }
  }
  console.log(objFArr);
}

myFilter(objArray, function (item) {
  return item.price >= 200;
});
//////////////////

//map 구현
// objArray 사용
// myMap를 구현하여 arr.map과 동일한 값이 나오도록 하기.  price값만 모아둔 배열 만들기
function myMap(arr, callback) {
  // myMap 구현
  let mapArr = [];
  for (let i = 0; i < objArray.length; i++) {
    mapArr.push(callback(arr[i]));
  }
  console.log(mapArr);
}

myMap(objArray, function (item) {
  return item.price;
});
/////////////////////

//reduce 사용
const arr = [1, 2, 3, 4, 5];

// reduce를 이용하여 arr의 모든 값에 곱하기 2를 한 값의 총합을 구하기.
const aReduce = arr.reduce(function (prev, current) {
  return prev + current * 2;
}, 0);
console.log(aReduce);
/////////////////////////////////

//  reduce 구현
function myReduce(arr, callback, prev) {
  let sum = prev;
  for (let i = 0; i < arr.length; i++) {
    sum = callback(sum, arr[i]);
  }
  console.log(sum);
}

myReduce(
  arr,
  function (sum, num) {
    return sum + num;
  },
  0
);
