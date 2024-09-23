# 泛型

泛型指的是，在定义函数、接口或类的时候不预先指定数据类型，而在使用时再指定类型的特性。

作用：泛型可以提升应用的可重用性，如使用其创建组件，则可以使组件可以支持多种数据类型。

```typeScript
  // 场景
  // 案例：
  const pushStringArr = (arr:string[],item:string):string[]=>{
    arr.push(item)
    return arr
  }

  const pushNumberArr = (arr:number[],item:number):number[]=>{
    arr.push(item)
    return arr
  }

  // 泛型
  const pushArr = <T>(arr:T[],item:T):T[]=>{
    arr.push(item)
    return arr
  }

  const stringArr = pushArr<string>([],'1')

  const numberArr = pushArr<number>([],1)

  // 元组数据交换位置
  function swapGeneric<T,U>(tuple:[T,U]):[U,T]{
    return [tuple[1],tuple[0]]
  }

  const arr:[string,number] = ['str',1]

  const swapped = swapGeneric<string,number>(arr)
```