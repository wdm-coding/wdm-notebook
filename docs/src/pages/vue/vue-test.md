# 测试框架

## 通用测试框架
1. Mocha
2. Jest
3. Vitest

## Vitest 测试框架
[Vitest 官网](https://cn.vitest.dev/)
1. 安装`npm install -D vitest`
2. 测试文件命名规则：`xxx.test.ts`
```ts
import { describe, it, expect } from 'vitest'
describe('测试用例', () => {
  it('测试用例1', () => {
    expect(1).toBe(1) // 测试数字1是否等于1
  })
  it('测试用例2', () => {
    expect(1 + 1).toBe(2) // 测试1+1是否等于2
  })
  it('测试用例3', () => {
    expect(1).not.toBe(2) // 测试数字1是否不等于2
  })
  it('测试用例4', () => {
    expect(0).toBeFalsy() // 测试数字0是否为假值
    expect(1).toBeTruthy() // 测试数字1是否为真值
  })
  it('测试用例5', () => {
    expect(123).toBeGreaterThan(121) // 测试大于123的数字
    expect(123).toBeLessThanOrEqual(123) // 测试小于等于123的数字
    expect(123).toBeLessThan(140) // 测试小于140的数字
  })
  it('测试用例6', () => {
    expect('123').toMatch(/123/) // 测试字符串是否匹配正则表达式
  })
  it('测试用例7', () => {
    expect({ name: 'xxx' }).toMatchObject({ name: 'xxx' }) // 测试对象是否匹配期望的对象结构
    expect({ name: 'xxx' }).toStrictEqual({ name: 'xxx' }) // 测试对象是否严格等于期望的对象结构
    expect({ name: 'xxx' }).toEqual({ name: 'xxx' }) // 测试对象是否等于期望的对象结构
  })
})
```
3. 测试命令：`vitest`

## 测试用例
1. 断言
2. 异步测试
3. 钩子函数（before, after）
4. 模拟数据
5. 覆盖率报告
```ts
import {
 describe, it, expect,vi
} from 'vitest'
 /* describe 是一个测试套件，用于组织多个相关的测试用例 */
 /* it 是一个测试用例，用于编写具体的测试逻辑 */
 /* expect 是一个断言函数，用于验证测试结果是否符合预期 */
 /* vi 是 Vitest 提供的一个模拟函数库，用于创建和操作模拟对象、函数等 */

// 1.测试回调函数 callback 函数是否被调用
import { testFun,asyncFun } from './testUtils'
describe('测试回调函数',() => {
  it('测试回调函数是否被调用',() => {
    const callback = vi.fn()
    testFun(99,callback)
    testFun(100,callback)
    testFun(101,callback)
    expect(callback).toBeCalledTimes(1) // 断言 callback 函数被调用了 1 次
  })
})
// 2. 测试对象上的方法是否被调用
describe('测试对象上的方法',() => {
  it('测试对象上的方法是否被调用',() => {
    const obj = {
      method: () => 1
    }
    const spy = vi.spyOn(obj, 'method')
    obj.method()
    expect(spy).toHaveBeenCalled() // 断言 method 方法没有被调用
    obj.method()
    expect(spy).toHaveBeenCalledTimes(2) // 断言 method 方法被调用了 2 次
  })
})
// 3.测试异步函数
describe('测试异步函数',() => {
  it('测试异步函数是否被调用',async () => {
    //  创建一个模拟函数，并设置其返回值为一个 Promise，该 Promise 在解析时将调用 json 方法并返回 { data: 123 }
    global.fetch = vi.fn().mockResolvedValue({ json: () => ({ data: 123 }) })
    const result = await asyncFun()
    expect(result.json()).toEqual({ data: 123 }) // 验证返回数据
    expect(fetch).toHaveBeenCalledWith('fake.url') // 验证调用参数
  })
})
```

## 基于vue3的组件测试框架

###  Vue Test Utils
1. [Vue Test Utils 官网](https://test-utils.vuejs.org/guide/#installation)
2. 安装`npm install --save-dev @vue/test-utils`
3. 测试文件命名规则：`xxx.spec.ts`
```ts
import {
describe, it, expect, vi
} from 'vitest'
import { mount } from '@vue/test-utils'
import XZButton from './index.vue'
describe('测试 XZButton 组件',() => {
  it('测试 XZButton 组件是否正确渲染',() => {
    const wrapper = mount(XZButton,{
      props: {
        type: 'primary'
      },
      slots: {
        default: '按钮'
      }
    })
    console.log(wrapper.html())
  })
})
```
### `document is not defined` 错误解决方案：
1. vitest 默认是在 node 环境下运行，而 vue3 需要浏览器环境。
2. 解决方案：使用 `jsdom` 模拟浏览器环境 `npm install jsdom --save-dev`
3. `vitest.config.ts` 配置文件
```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom' // 使用 jsdom 模拟浏览器环境
  }
})
```
### vue tesing library 