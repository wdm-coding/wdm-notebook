# 前端项目公用工具库

## 金额格式化

::: tip toLocaleString() 方法参数
1. locales：语言环境，比如`ar-EG`, `zh-CN`等
2. options：配置项，比如`style: 'percent'`表示百分比格式化
3. style：格式化样式，比如`percent`, `currency`, `decimal`等
:::
1. 千分位格式化
```ts
export function formatMoney(value: number | string) {
  return Number(value).toLocaleString()
}
```
2. 百分比格式化
```ts
export function formatPercent(value: number | string) {
  return Number(value).toLocaleString('', { style: 'percent' })
}
```
3. 货币格式化
```ts
export function formatCurrency(value: number | string) {
  return Number(value).toLocaleString('', { style: 'currency', currency: 'CNY' })
}
```
4. 数字格式化
```ts
export function formatNumber(value: number | string) {
  return Number(value).toLocaleString('', { style: 'decimal' })
}
```
5. 中文数字格式化
```ts
export function formatChineseNumber(value: number | string) {
  return Number(value).toLocaleString('', { style: 'decimal' })
}
```