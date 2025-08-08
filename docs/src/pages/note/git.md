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
## 回退

```js
git reset HEAD commitID
```

## 代码合并主分支

```js
git checkout -b master origin/master
git merge --squash develop
git  checkout --theirs ./src （批量解决src文件的冲突）
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
