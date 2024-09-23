// 基础类型
const msg:string = 'Hello World!!';
const isDone:boolean = true;
const a:number[] = [1,2,3];
const b:any[] = [1,2,'3'];
const arr1: Array<string> = ['1','2'];
const arr2: Array<string | number> = ['1','2',3];
const arr3: (string | number)[] = ['1','2',3];
enum Color {Red = 1, Green, Blue};
const c:Color = Color.Red;
const obj:object = {name:'Jack'};
const objS:{name:string,age?:number} = {name:'Jack'};


// 函数
function add (x:number, y:number):number {
  return x + y;
}

// 箭头函数

const add2 = (x:number, y:number):number => {
  return x + y;
}

function add4(x:number, y:number): number;
function add4(x:string, y:string): string;
function add4(x:any, y:any) {
  return x + y;
}


interface PublicPoint {
  x: string
  y: number,
  z?: number
}
interface PublicPoint2 {
  x: string
  y: number,
  z?: number,
  b: number
}

interface Point extends PublicPoint,PublicPoint2 {
  a: string
}

const point: Point = {
  x: '123',
  y: 456,
  a: '123',
  z: 123,
  b: 123
}

interface Func{
  (x:number, y:number): number
}

const add3: Func = (x, y) => {
  return x + y;
}

interface Role {
  [id:number]:string
}

const role: Role = ['admin', 'user']
// role.length = 3
const roleObj: Role = {
  1: 'admin',
  2: 'user'
}

interface MyType {
  color: string,
}
const getTypes = (myType: MyType) => {
  return `${myType.color}`
}
// 1. 类型断言

getTypes({
  color: 'red',
  size: 123
} as MyType)

// 2.索引签名
interface MyType {
  color: string,
  [prop: string]: any
}
getTypes({
  color: 'red',
  size: 123,
  name: 'Jack'
})

// 3.类型兼容(不推荐)

const option = {
  color: 'red',
  size: 123,
  name: 'Jack'
}

const getTypes2 = ({color}: MyType) => {
  return `${color}`
}

getTypes2(option)


