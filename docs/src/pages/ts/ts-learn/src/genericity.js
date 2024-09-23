var pushArr = function (arr, item) {
    arr.push(item);
    return arr;
};
var stringArr = pushArr([], '1');
var numberArr = pushArr([], 1);
// console.log(stringArr,numberArr);
// 元组数据交换位置
function swapGeneric(tuple) {
    return [tuple[1], tuple[0]];
}
var arr = ['str', 1];
var swapped = swapGeneric(arr);
console.log('swapped', swapped);
