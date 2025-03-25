# React + Vite + TypeScript

  1. [Vite官网](https://cn.vitejs.dev)

  2. [React官网](https://react.docschina.org)

  3. [TypeScript官网](https://www.typescriptlang.org/zh/)

## 安装
  npm create vite@latest react-ts-demo -- --template react-ts

## useState 与 TypeScript 结合使用

### 自动推断类型

  1. 根据初始值推断
  2. 适用于简单类型或者明确初始值

### 传递泛型参数

```ts
// 直接传递泛型参数
const [obj, setObj] = useState<{ name: string; age: number }>({
  name: '张三',
  age: 18,
})

// 使用类型别名
type Person = { name: string; age: number }
const [person, setPerson] = useState<Person>({
  name: '张三',
  age: 18,
})
```

### useState初始值为null

```ts
type Person = { name: string; age: number }
const [person, setPerson] = useState<Person | null>(null)
```

## Props 与 TypeScript 结合使用

### tyep 对象类型 或者 Interface 接口

```ts
interface Props {
  name:string,
  age?:number
}
// props 初始值为null 或者 Props
function Son(props:Props| null){
  return (
    <>
      <p>---Son---</p>
      <p>{props?.name}</p>
      <p>{props?.age}</p>
      <p>---Son---</p>
    </>
  )
}
function App() {
  
  return (
    <>
    <h1>App</h1>
    <Son name="wdm" age={18}></Son>
    </>
  )
}
```
### props的Cildren属性React.ReactNode类型
  1. 内置泛型参数为React.ReactNode
  2. 如果想要限制Children的类型，可以传递泛型参数

```ts
interface Props {
  children?:React.ReactNode,
}
// 父组件传递children
<Son name="wdm" age={18}>
  <h2>children传递</h2>
</Son>
// 子组件使用
{props?.children}
```

### 事件props传递函数参数注解
  1. 子传父，父组件传递函数给子组件，这类函数通常需要传递参数，所以需要注解参数类型
  2. 绑定内联函数可以直接推导参数类型，但是如果函数在其他地方定义，则需要手动注解
```ts
interface Props {
  name:string,
  age?:number,
  children?:React.ReactNode,
  onGetMsg?:(msg:string)=>void,
  onGetName?:(name:string)=>void
}
// 父组件传递函数
const getMsg = (msg:string) => {
  console.log(msg);
}
<Son name="wdm" age={18} onGetMsg={getMsg}>
  <h2>children传递</h2>
</Son>
<Son name="XXX" age={20} onGetName={(name)=>console.log(name)} />
// 子组件使用
{props?.onGetMsg ? <button onClick={()=>props?.onGetMsg?.(`我是子组件数据`) }>点击</button>:null}
{props?.onGetName ?<button onClick={()=>props?.onGetName?.(`我是${props.name}`) }>点击</button>:null}
```
## useRef 与 TypeScript 结合使用

### DOM类型注解 HTMLInputElement
  1. 直接传递泛型参数
  2. 使用内置的React.RefObject类型
```ts
const inputRef = useRef<HTMLInputElement>(null)
// 或者
const inputRef = useRef<React.RefObject<HTMLInputElement>>(null)
```

### 稳定引用的存储器(定时器)
  联合类型，使用可选链操作符访问
```ts
const timerId = useRef<number | undefined>(undefined)
timerId?.current = setTimeout(()=>{},1000)
```
