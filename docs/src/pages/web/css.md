# css 面试题

## 1. 什么是 CSS?
1. 层叠样式表（Cascading Style Sheets，简称 CSS）是一种用来表现 HTML 或 XML 等文件样式的计算机语言。
2. 它是用来给结构化文档添加样式（字体、间距和颜色等）的代码。

## 2. CSS 选择器有哪些？
1. 基础选择器: 包括元素选择器、类选择器、ID 选择器和通配符选择器(*)。
2. 组合选择器: 包括后代选择器、子选择器、相邻兄弟选择器和通用兄弟选择器。
3. 伪类选择器: 如:hover、:active等。
4. 伪元素选择器: 如::before、::after等。
5. 属性选择器: 如[type="text"]。
6. 否定伪类: 如:not()。
7. 兄弟选择器: 如+和~。
8. 子选择器: 如>。

## 3. :root 和 :global 选择器
1. 伪类选择器: :root 选择的是根元素，即 html 标签。优先级高于html元素选择器,声明全局 CSS 变量。
2. :global 选择器: 用于在 CSS Modules 中声明全局样式。

## 特殊选择器
1. `&[disabled]` 选择具有 disabled属性的元素，并为其应用特定样式
2. `&:not([disabled])` 选择不具有 disabled属性的元素，并为其应用特定样式
3. `&[disabled]:hover` 选择具有 disabled属性的元素，并在鼠标悬停时应用特定样式
4. `[class*=xz-icon]` 匹配所有类名中包含 "xz-icon" 的元素
5. `[class^=xz-icon]` 匹配所有类名以 "xz-icon" 开头的元素
6. `[class$=xz-icon]` 匹配所有类名以 "xz-icon" 结尾的元素
7. `& + &` 两个相同选择器的相邻组合 (button + button)

## scss 循环遍历生成颜色变量
```scss
@use "sass:color"; // 引入Sass的颜色模块，用于颜色操作
$theme-colors: ( // 定义颜色变量映射表
  primary: #007bff,
  success: #28a745,
  info: #17a2b8,
  warning: #ffc107,
  danger: #dc3545
);
// 遍历映射表，生成颜色变量和深色系、浅色系
@each $val, $color in $theme-colors {
  --xz-color-#{$val}: #{$color};
  // 生成深色系
  --xz-color-#{$val}-dark-1: #{color.scale($color, $lightness: -10%)};
  // 生成浅色系
  @for $i from 1 through 6 {
    $lightness: $i * 10%;
    $light-color: color.scale($color, $lightness: $lightness);
    --xz-color-#{$val}-light-#{$i}: #{$light-color};
  }
}
```