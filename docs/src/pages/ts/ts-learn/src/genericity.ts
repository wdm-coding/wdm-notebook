const pushArr = <T>(arr:T[],item:T):T[]=>{
  arr.push(item)
  return arr
}

const stringArr = pushArr<string>([],'1')

const numberArr = pushArr<number>([],1)

// console.log(stringArr,numberArr);

// 元组数据交换位置
function swapGeneric<T,U>(tuple:[T,U]):[U,T]{
  return [tuple[1],tuple[0]]
}

const arr:[string,number] = ['str',1]

const swapped = swapGeneric<string,number>(arr)

console.log('swapped',swapped)
