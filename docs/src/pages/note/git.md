# git常用指令
## 设置git 个人信息
```bash
git config user.name xxx
git config user.email
```
## 查看未add前具体修改的文件内容
```bash
git diff
git diff 文件名
git show [commitID]
```
## 撤销未提交到暂存区的修改
```bash
git checkout . # 撤销所有修改
git checkout 文件名 # 撤销某个文件修改
```
## 撤销git add . 操作
```bash
git reset HEAD # 撤销所有修改
git reset HEAD 文件名 # 撤销某个文件修改 git reset HEAD src/main.java
```
## 撤销git commit 操作
```bash
git reset --hard HEAD~1 # 撤销到上次提交，删除本次commit的代码
git reset --mixed HEAD~1 # 撤销到git add .前 保存代码
git reset --soft HEAD~1 # 撤销到git commit .前 恢复到暂存区
```
## 撤销git push 操作
```bash
git revert commitID # Git 会打开一个文本编辑器让你输入撤销提交的信息，保存并退出编辑器。:wq 并按 Enter。这会保存文件并退出 Vim。 
```

## 代码合并主分支

```bash
git checkout -b master origin/master # 创建master分支并且拉取远程master分支代码
git merge --squash develop # 合并develop代码到master 不会保留 develop 分支的提交历史。 所有更改会以“未暂存”状态（Unstaged Changes）出现在当前分支的工作区
git checkout --theirs ./src # 批量解决src文件的冲突 选择‌对方分支‌的版本
git checkout --ours # 选择‌当前分支‌的版本
```

```bash
git checkout master
git pull
git merge --squash develop
git checkout --theirs ./src
git add .
git commit -m "合并develop分支"
git push
git checkout develop
```
## 需要紧急切换分支，但当前修改未完成，不想提交，git stash保存修改到堆栈
```bash
git stash # 在master分支修改了内容，突然需要切换到develop分支
git checkout develop # 切换到develop分支
git stash pop # 恢复最近一次存储并删除堆栈记录
```
## 删除分支
```bash
git branch -d 分支名 # 删除本地已合并的分支
git push origin --delete 分支名 #删除远程分支
```
## git fetch 与 git pull 的区别

1. git fetch 从远程仓库获取最新的分支和提交信息，但不自动合并到本地分支
2. git pull 从远程仓库获取最新的更改，并自动合并到当前分支。

