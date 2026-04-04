# 個人專題 電商平台「種子日常Seed everyday」

## 專案簡介

Seed Everyday 是一個以手作選物與種子商品為主題的前端電商網站，提供商品瀏覽、分類篩選、收藏、購物車、結帳，以及後台商品與訂單管理功能。

本專案採用 **前後端分離的 SPA 架構**，以前端 React 應用串接遠端 API。

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

## 頁面優化紀錄 4/3

- 針對圖片資源進行基本優化，避免載入過大的素材影響頁面速度。
- 為列表與非首屏圖片加入 lazy loading，改善初始載入體驗。
- 拆分重複 UI 元件並抽出共用邏輯，提升元件可讀性與維護性。
- 檢查頁面結構，降低大元件承載過多責任造成的維護負擔。
- 上基本 SEO 設定，如 title、meta description、圖片 alt 與語意化標題結構。

---

#### 此作品起源於：參與六角學院課程 2025-2026 React專班
