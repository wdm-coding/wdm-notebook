# Vue JSX

## jsx 与 templete 的 区别？
1. 都会编译成 render 函数
2. jsx 写法更灵活，可以写逻辑。
3. jsx写法更接近原生js
4. jsx 插值用{}，属性用{}，事件绑定用on开头

## jsx 在vue中使用
1. 判断 `{flag.value && <jsxSon />}`
2. 循环 `{list.map((item) => <li key={item}>{item}</li>)}`

## jsx 使用 slot 插槽
1. 子组件定义插槽
```jsx
<div style="display:flex">
  默认插槽：{ctx.slots.default?.()}
</div>
<div style="display:flex">
  具名插槽：{ctx.slots.footer?.()}
</div>
<div style="display:flex">
  作用域插槽：{ctx.slots.header?.({name:'son-header',age:18})}
</div>
```
2. 父组件使用插槽
`<jsxSon onChange={sonChange} id={666}>`
`  {{`
   ` default: ()=><div>我是默认slot</div>,`
   ` footer: () => <div>我是具名slot</div>,`
   ` header: ({name,age}) => <div>我是作用域slot-{name}-{age}</div>`
  `}}`
`</jsxSon>`