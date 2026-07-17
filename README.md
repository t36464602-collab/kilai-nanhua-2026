# PTYMA 奇萊南華行動手冊（2026）

屏東旋風青年登山隊 2026/08/07-09 奇萊南華三天兩夜的行前手冊 PWA。

**線上網址：https://t36464602-collab.github.io/kilai-nanhua-2026/**

手機開啟後可「加入主畫面」安裝成 App（iPhone 請用 Safari 的分享 → 加入主畫面）；
開啟過一次後，行程、裝備與 GPX 軌跡皆可離線查看。

## 更新內容的方式（給領隊）

1. 改資料：所有行程、裝備、提醒文字都在 `src/lib/trip-data.ts`
   （可以跟 Claude Code 說要改什麼，或直接在 GitHub 網頁上編輯該檔）
2. push 到 `main` → GitHub Actions 會自動建置部署，約 2 分鐘
3. 隊員**重新開啟 app** 即自動更新，不必重新安裝

限制：更新在「重開 app 時」生效，不是即時推播；山上沒訊號拿不到新版，
出發後的臨時變更仍以領隊現場宣布為準。

## 本地開發

```bash
npm install
npm run dev        # 開發伺服器
npm run build      # 建置（tsc + vite build + PWA）
npm run preview    # 以子路徑模擬正式環境預覽
```

## 技術架構

- Vite + React 19 + TypeScript，hash router（`#/trip` 等，GitHub Pages 子路徑友善）
- vite-plugin-pwa（Workbox）：app shell 與 GPX precache、OpenTopoMap 圖磚 runtime 快取
- Leaflet + OpenTopoMap 顯示實走 GPX（`public/kilai-nanhua-2026.gpx`，2026/05/01 紀錄）
- 三日路線總覽為手繪 SVG（`src/lib/route-map-data.ts`），骨架依隊上參考圖重繪
- 裝備勾選存 `localStorage`（key：`ptyma-gear`），屬個人裝置狀態
- 「顯示我的位置」使用瀏覽器 Geolocation；GPS 不需網路，但為輔助功能，
  上山仍請攜帶離線地圖 App

## 資料來源

行程與裝備參考台灣 368「奇萊南華三天兩夜」、健行筆記實走 GPX、
林業保育署南投分署公告與天池山莊官網；完整連結見 app 內行程頁的「參考資料」。
時間為行前規劃推估值，出發前請以最新官方公告與領隊宣布為準。

## 沿革

- 前身為 `ptyma-kilai-nanhua-app`（vinext starter，已封存，未部署）
- 2026-07-17 以 Vite 重建並重新設計資訊架構
- 2026-07-18 行程依台灣 368 重排、裝備展開式清單、GPS 定位，上線 GitHub Pages
