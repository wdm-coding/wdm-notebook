# 产物源码分析(sourcemap)
记录了‌编译后代码‌与‌原始源代码‌之间的映射关系，便于调试。
+ 转换后的代码‌：经过压缩、混淆、编译后的代码
+ ‌原始源代码‌：开发者编写的代码
+ ‌映射文件‌：记录两者对应关系的 JSON 文件

## 配置规范
1. [inline-|hidden-|eval-] // 映射文件的位置：内联、隐藏或内联但不显示源代码
2. [nosources-] // 是否包含源代码
3. [cheap-[module-]] // 调试展示 cheap，cheap-module
::: tip cheap和cheap-module
1. "cheap" SourceMap 是一种优化策略，它通过牺牲部分映射精度来大幅提升构建性能：
‌仅映射行号（不映射列号）‌：只能定位到错误发生的行，不能精确定位到具体列
‌忽略 loader 转换前的源码‌：只追踪到 loader 处理后的代码（如 Babel 输出的代码）
‌构建速度更快‌：生成映射信息所需时间大大减少
‌文件体积更小‌：生成的 .map 文件大小显著减小
2. "cheap-module" 类似于 "cheap"，但它在追踪模块级别的映射时会更精确，例如在 webpack 中追踪到具体的 loader 处理后的代码。这对于调试模块级别的转换非常有用，尤其是在复杂的构建环境中。
:::
4. source-map // 固定后缀
5. 通过devtool配置
## 生产环境
1. source-map // 默认值，生成完整的映射文件
2. nosources-source-map // 生成不带源代码的映射文件
3. hidden-nosources-source-map // 生成不带源代码的映射文件，但不显示在浏览器中
4. hidden-source-map // 生成完整的映射文件，但不显示在浏览器中