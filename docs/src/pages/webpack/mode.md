# mode (构建模式)
1. 根据mode使用不同的配置来构建。
2. development：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。
3. production：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production. 为模块和 chunk 启用确定性的混淆名称，剥离代码。
4. none 默认值：不启用任何默认优化选项。