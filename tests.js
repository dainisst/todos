arr = [1, 2, 3, 3, 5, 6, 1, 1, 5];
arr.forEach(element => console.log(element * 2));
const newArr = arr.map(element => element * 2);
console.log(newArr);
const filtArr = arr.filter(element => element > 3);
console.log(filtArr);
const numbers = arr.reduce((accumulator, num) => {

})