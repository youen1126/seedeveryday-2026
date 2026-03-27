# 六角 2025-2026 React專班 個人專題 電商平台「種子日常Seed everyday」

# 此專案作業使用 React + Vite

## 核心技術

```
- 框架: React,
- 建構工具: Vite,
- 狀態管理: Redux Toolkit,
- 路由管理: React Router,
- UI 框架: Bootstrap,
- 表單處理: React Hook Form,
- HTTP 請求: Axios,
- 樣式預處理: SCSS
```

## 開工標準流程：

由於`git checkout`是老指令，使用時有一些風險
建議都改用`git switch`來創建或切換分支

```
git fetch
git switch dev
git pull
git branch  # 確認你在哪個分支
# ↓ 二選一 ↓ #
git switch feature/search-page  # 已經開過的分支
git switch -c feature/xxx   # 新開分支
```

## 每次收工標準流程：

```
git status
git add .
git commit -m "feat: xxx"
git branch # 再次確認目前在 feature 分支
# ↓ 二選一 ↓ #
git push -u origin feature/xxx // 第一次推
git push  // 之前推過，往後推用這個指令
```

❗ 任何寫 code / commit / push 前，請先確認 git branch 的星號位置
命名範例：

```
git switch -c feature/search-page
git switch -c feature/api-fetch
git switch -c feature/modal-ui
```

## Commit 建議

### type

Type 是用來告訴進行 Code Review 的人應該以什麼態度來檢視 Commit 內容

```
feat: ... 新增/修改功能 (feature)
fix: ... 修補 bug (bug fix)
style: ... 切版/格式
refactor: ... 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
chore: ... 雜項（設定、工具）建構程序或輔助工具的變動 (maintain)。
perf: 改善效能 (A code change that improves performance)。
docs: 文件 (documentation)。
test: 增加測試 (when adding missing tests)。
revert: 撤銷回覆先前的 commit 例如：revert: type(scope)
subject: (回覆版本：xxxx)。
```

🚀 部署到 GitHub Pages

1. npm run build
2. npm run deploy
   ⚠️ 不要手動 push gh-pages
   ⚠️ 不要 commit dist 到 main
