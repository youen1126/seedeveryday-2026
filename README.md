# 個人專題 電商平台「種子日常Seed everyday」

## 專案簡介

Seed Everyday 是一個以手作選物與種子商品為主題的前端電商網站，提供商品瀏覽、分類篩選、收藏、購物車、結帳，以及後台商品與訂單管理功能。

本專案採用 **前後端分離的 SPA 架構**，以前端 React 應用串接遠端 API。

在這個專案中除了前端功能開發，也特別著重購物流程的可用性、行動端操作體驗，以及品牌視覺一致性的優化。

## 近期網站優化紀錄（UX 重點）

- **資訊架構與可讀性優化**：重整首頁與商品/結帳頁的資訊層級（標題、文案、間距、行高、排序），降低認知負擔，讓使用者更快抓到決策資訊。
- **互動回饋與狀態設計**：補齊空狀態文案、送單中與 API 失敗提示、刪除商品反饋、分類點擊回饋、確認收件人資料 modal，提升操作可預期性與安心感。
- **關鍵購物流程防呆**：優化購物車與結帳邏輯（數量達上限禁用 `+`、離頁資料保留、運費/優惠/小計呈現一致），減少流程中斷與輸入錯誤。
- **導覽與定位體驗**：全站加入並統一麵包屑、修正返回上一頁與連結導向、導入 URL query params（分類/分頁/排序），強化可回溯與可分享的瀏覽路徑。
- **行動端友善與操作效率**：調整按鈕位置到拇指熱區、修正手機版 icon 與 logo 重疊、改善 RWD 尺寸與元件可點擊性，提升手機操作流暢度。
- **品牌一致性與微互動**：統一按鈕/input/toast 視覺語言、新增加入購物車飛入動畫與活動輪播，在不干擾流程下強化回饋感與品牌記憶點。

## 頁面優化紀錄（4/3）

- **資訊可讀性優化**：重新整理首頁、商品頁與結帳頁的標題層級、文案、間距、行高與資訊排序，降低畫面閱讀負擔，幫助使用者更快找到決策重點。
- **互動狀態補強**：補齊空狀態文案、送單中提示、API 錯誤訊息、刪除商品回饋與分類點擊狀態，讓操作結果更明確可預期。
- **載入效能優化**：調整圖片資源尺寸與載入策略，並為列表與非首屏圖片補上 lazy loading，提升首屏載入與列表瀏覽的流暢度。
- **元件結構整理**：整併重複 UI、抽出共用邏輯，重新切分頁面與元件職責，降低維護成本，也讓後續功能迭代更穩定。
- **基礎 SEO 與語意結構補強**：補上 title、meta description、alt 與標題層級，提升內容可理解性與基本搜尋友善度。

## 系統架構

```text
使用者
  ↓
React + Vite SPA
  ↓
Router（前台 / 後台）
  ↓
Views / Layouts / Components
  ↓
Redux Toolkit / Hooks
  ↓
Services API Layer
  ↓
Backend API
```

### 架構重點

- 前台與後台分開管理，透過不同 layout 與路由切分責任
- 後台頁面以 `ProtectedRoute` 驗證登入狀態
- 商品、購物車、訊息提示由 Redux Toolkit 管理
- 收藏清單使用 `localStorage` 保存
- API 呼叫集中在 `services` 層，方便維護與擴充

## 技術棧

- Framework: `React 19`
- Build Tool: `Vite 6`
- Router: `React Router 7`
- State Management: `Redux Toolkit`、`React Redux`
- HTTP Client: `Axios`
- Form Handling: `React Hook Form`
- UI / Styling: `Bootstrap 5`、`Bootstrap Icons`、`SCSS`
- Animation: `AOS`
- Carousel: `Swiper`
- Loading UI: `react-loader-spinner`
- Deploy: `gh-pages`

## 主要功能

- 前台首頁與品牌內容展示
- 商品列表與分類篩選
- 商品詳細頁與推薦商品輪播
- 收藏清單
- 購物車與結帳流程
- 後台登入驗證
- 後台商品管理
- 後台訂單管理

## 專案結構

```text
src/
├─ assets/        # 全域樣式與 SCSS
├─ components/    # 共用 / 前台 / 後台元件
├─ hooks/         # 自訂 hooks
├─ layout/        # 前後台 layout
├─ router/        # 路由設定
├─ services/      # API 封裝
├─ slice/         # Redux slices
├─ utils/         # 工具函式
├─ views/         # 頁面元件
├─ App.jsx
└─ main.jsx
```

## 補充說明

- 使用 `Hash Router`，較適合部署在 GitHub Pages
- API 相關設定透過 `VITE_API_BASE` 與 `VITE_API_PATH` 管理
- Vite 設有 `@` alias 指向 `src`

## GitHub Actions 基本 CI 設定

在 GitHub Actions 設定了一個最小可用的 CI workflow。

目前流程包含：

- push / pull request 到 main 時自動觸發
- 自動安裝依賴
- 自動執行 lint
- 自動執行 build

---

#### 此作品起源於：參與六角學院課程 2025-2026 React專班
