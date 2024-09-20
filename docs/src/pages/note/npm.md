# npm 相关命令

## 安装 cnpm

```shell
npm install -g cnpm --registry=https://registry.npmmirror.com/
```

## 安装 nrm

```shell
cnpm install -g nrm
```

## 查看源

```shell
nrm ls
```
::: tip
  npm ---------- https://registry.npmjs.org/

  yarn --------- https://registry.yarnpkg.com/

  tencent ------ https://mirrors.cloud.tencent.com/npm/

  cnpm --------- https://r.cnpmjs.org/

  taobao ------- https://registry.npmmirror.com/

  npmMirror ---- https://skimdb.npmjs.com/registry/
:::

## 切换源

```shell
nrm use taobao
```

## 安装yarn 与 pnpm

```shell
cnpm install -g yarn pnpm
```

## 安装degit

degit 是一个用于快速从 GitHub、GitLab、Bitbucket 等 Git 仓库中克隆并设置项目模板的工具。它特别适用于前端项目、开发环境配置、示例项目等场景，可以极大地简化项目初始化的过程。degit 不是一个编程语言中的功能或库，而是一个独立的命令行工具。

```shell
cnpm install -g degit

degit username/repo my-project
```

