import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// base 必須與 GitHub repo 名一致（含前後斜線），錯一字整站資源 404
const BASE = "/kilai-nanhua-2026/";

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "PTYMA 奇萊南華行動手冊",
        short_name: "奇萊南華",
        description: "屏東旋風青年登山隊 2026 奇萊南華行動手冊",
        lang: "zh-Hant",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#f5f1e8",
        theme_color: "#123c2f",
        // start_url 不放 #fragment：部分 iOS 版本對 fragment 處理有問題，
        // 落在根路徑一樣會渲染 #/ 首頁
        scope: BASE,
        start_url: BASE,
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // GPX（1.5 MB）一併 precache——離線時紅線軌跡是最重要的安全資訊
        globPatterns: ["**/*.{js,css,html,svg,png,gpx}"],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            // Leaflet 圖磚是 no-CORS 的 opaque response（status 0），
            // cacheableResponse 不含 0 的話完全不會快取
            urlPattern: /^https:\/\/[abc]\.tile\.opentopomap\.org\/.+\.png$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "topo-tiles",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 60,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
