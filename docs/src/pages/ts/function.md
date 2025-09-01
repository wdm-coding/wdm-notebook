# TS函数

## 函数重载
1. 一组具有相同名字，不同参数列表的函数，称为重载。
2. 与返回值无关，只与参数列表有关。
3. 具有一个实现签名和一个或多个重载签名。
4. 参数类型 和 返回值类型 必须一致。
```ts
// 函数重载 的 应用场景
enum MessageType {
  Image = 'image',
  Text = 'text',
  Video = 'video',
  Audio = 'audio',
  File = 'file',
  Location = 'location',
  Custom = 'custom'
}
type Message = {
  id:number,
  type:MessageType,
  sendmessage:string
}
let message:Message[] = [
  {
    id:1,
    type:MessageType.Image,
    sendmessage:'发送图片'
  },
  {
    id:2,
    type:MessageType.Text,
    sendmessage:'发送文本'
  },
  {
    id:3,
    type:MessageType.Video,
    sendmessage:'发送视频'
  },
  {
    id:4,
    type:MessageType.Audio,
    sendmessage:'发送音频'
  },
  {
    id:5,
    type:MessageType.File,
    sendmessage:'发送文件'
  },
  {
    id:6,
    type:MessageType.Location,
    sendmessage:'发送位置'
  },
  {
    id:7,
    type:MessageType.Custom,
    sendmessage:'发送自定义消息'
  },
  {
    id:8,
    type:MessageType.Custom,
    sendmessage:'发送自定义消息'
  },
  {
    id:9,
    type:MessageType.Custom,
    sendmessage:'发送自定义消息'
  }
]

function searchMsg(coodition:MessageType):Message[]; // 重载函数的声明，返回类型为Message数组
function searchMsg(coodition:number):Message|undefined; // 重载函数的声明，返回类型为Message|undefined
function searchMsg(coodition:MessageType|number):Message|undefined|Message[]{ // 重载函数的实现，根据参数类型返回不同的结果
  // 实现签名
  if(typeof coodition === 'number'){
    return message.find(item=> item.id === coodition)
  }else{
    return message.filter(item=> item.type === coodition)
  }
}

const result1 = searchMsg(1)
const result2 = searchMsg(MessageType.Custom)
console.log(result1);
console.log(result2)
```

## 泛型函数的应用
1. 泛型函数可以应用于不同类型的参数，提高代码的复用性。
2. 泛型函数可以应用于不同类型的返回值，提高代码的灵活性。
```ts
function quickSort<T>(arr: T[]): T[] {
    if (arr.length < 2) {
        return arr;
    }
    let midIndex = Math.floor(arr.length / 2);
    let mid: T = arr.splice(midIndex, 1)[0]!;
    let left: T[] = [];
    let right: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined && arr[i]! < mid) {
            left.push(arr[i]!);
        } else if (arr[i] !== undefined) {
            right.push(arr[i]!);
        }
    }
    return quickSort(left).concat(mid, quickSort(right));
}


const arr = [3, 2, 1,5,69,73,11]
const result = quickSort<number>(arr);
console.log(result); // 输出：[1, 2, 3]

const strArr = ['a', 'b', 'c','dsd','rgt','sdcscs'];
const strResult = quickSort<string>(strArr);
console.log(strResult); // 输出：['a', 'b', 'c']
```

## 泛型函数重载
1. 泛型函数重载可以应用于不同类型的参数，提高代码的复用性。
2. 泛型函数重载可以应用于不同类型的返回值，提高代码的灵活性。
```ts
function sort<T>(data:T):any[] | string | undefined{
  if(data instanceof Array){ // 如果是数组，判断是否全是中文字符串
    if(isChinese(data)){ // 如果是中文字符串数组，使用中文排序方法
      return sortChinese(data)
    }else{ // 如果是英文字符串数组，使用快速排序方法
      return quickSort(data)
    }
  }else if (typeof data === 'string'){ // 如果是字符串，快速排序方法
    return strSort(data)
  }
}
```

## 泛型工厂函数
1. 可以代表任意一个类的构造函数的类型。
2. `type ConstructionType = new (...args: any[]) => ClassName;` 表示一个构造函数类型，可以接受任意数量的参数。
  + new 关键字表明这是一个构造签名，用于描述类的构造函数'
  + `...args: any[]` 表示构造函数可以接受任意数量的参数，这些参数的类型为any。
  + 这种模式常用于需要动态创建类实例的场景，如工厂模式或依赖注入
```ts
// 泛型工厂函数类型

class CommercialBank {
  public name: string = '商业银行';
  public id: number = 1;
  static balance: number = 100;
  constructor(public bankName: string, public bankId: number) {
    this.name = bankName;
    this.id = bankId;
  }
  getName(): void {
    console.log(`${this.name}-${this.id}`);
  }
}
// 构造函数类型定义 实例类型
// type ConstructionType = new (...args: any[]) => CommercialBank;
interface ConstructionType {
  new (...args: any[]): CommercialBank;
}
//  构造函数工厂函数类型定义 静态方法
function createFactoryConstructor(constructionType:ConstructionType){
  console.log(constructionType)
  new constructionType()
}
createFactoryConstructor(CommercialBank)
```

## 交叉类型 和 通用交叉方法
```ts
// 交叉类型
type O1 = {a:string, b:number}
type O2 = {c:string, d:number}

type O3 = O1 & O2 // 交叉类型，相当于合并了两个对象类型的属性

let obj:O3 = {a:'1', b:2, c:'3', d:4}

type O4 = O1  | O2 // 联合类型，要么是O1，要么是O2

let obj2:O4 = {c:'1', d:2}
let obj3:O4 = {a:'1', b:2}

// 通用交叉类型的方法

function cross<T extends object,U extends object>(obj1:T,obj2:U):T&U{
  const combined = {} as T & U;
  union(combined, obj1)
  union(combined, obj2)
  return combined
}
function union(combine:any,curobj:any){
  for(let key in curobj)(
    combine[key] = curobj[key]
  )
}
console.log(cross(obj2, obj3))
```