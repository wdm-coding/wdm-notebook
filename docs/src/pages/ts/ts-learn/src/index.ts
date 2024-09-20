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


interface Point {
  x: string
  y: number,
  z?: number
}

interface Point {
  a: string
}

const point: Point = {
  x: '123',
  y: 456,
  a: '123'
}

