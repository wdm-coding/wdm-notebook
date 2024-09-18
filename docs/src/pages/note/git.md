# git常用指令

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