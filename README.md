# 🕹️ 像素風闖關問答遊戲 (Pixel Quiz Game)

這是一個基於 React Vite 開發，結合 Google Sheets 作為後端資料庫的 2000 年代街機風格問答遊戲。

## 🚀 快速開始

### 1. 環境準備
請確保你的電腦已安裝：
- [Node.js](https://nodejs.org/) (建議 v18 以上)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)

### 2. 安裝與執行
```zsh
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# (建議) 使用 PM2 在背景管理
npm install -g pm2
pm2 start "npm run dev" --name pixel-game
```
執行後，請進入 `http://localhost:5173` 開始遊玩。

## 📊 Google Sheets 與後端配置

本遊戲使用 Google Sheets 儲存題目與回答紀錄，需透過 Google Apps Script (GAS) 進行串接。

### Step 1: 建立 Google 試算表
建立一份新的 Google 試算表，並設定兩個工作表：

1.  **工作表「題目」**：
    - 欄位架構：`ID` | `題目內容` | `選項A` | `選項B` | `選項C` | `選項D` | `正確答案`
    - **注意**：「正確答案」欄位請填入大寫的 **A、B、C 或 D**。
2.  **工作表「回答」**：
    - 欄位架構：`ID` | `闖關次數` | `總分` | `最高分` | `第一次通關分數` | `花了幾次通關` | `最近遊玩時間`

### Step 2: 配置 Google Apps Script (GAS)
1. 在試算表中點擊：**擴充功能 > Apps Script**。
2. 將專案中的 `google_apps_script.js` 代碼完整貼上。
3. 點擊 **部署 > 新部署**：
    - 類型選擇：**網頁應用程式 (Web App)**。
    - 誰可以存取：**任何人 (Anyone)**。
4. 部署後，複製產生的 **網頁應用程式 URL**。

### Step 3: 設定環境變數 (.env)
在專案根目錄建立或修改 `.env` 檔案：
```env
VITE_GOOGLE_APPS_SCRIPT_URL=你的_GAS_網址
VITE_PASS_THRESHOLD=3
VITE_QUESTION_COUNT=5
```

## 🛠️ 技術細節
- **前端框架**：React + Vite
- **視覺風格**：Pixel Art (8-bit)
- **頭像生成**：DiceBear API (自動生成獨一無二的像素關主)
- **進程管理**：PM2

## 🌐 GitHub 發佈與開源資訊

本專案已初始化 Git 儲存庫，並可隨時發佈至 GitHub。

### 1. 推送至 GitHub 指令
如果你已經建立了 GitHub 遠端儲存庫，可以使用以下指令進行推送：
```zsh
git remote add origin <你的_GitHub_儲存庫_URL>
git branch -M main
git push -u origin main
```

### 💡 佈署常見問題 (Troubleshooting)
若你在 GitHub Pages 遇到 `404 main.jsx` 錯誤：
- 請確保 `vite.config.js` 中設定了 `base: './'`。
- 請確保 `index.html` 中的 script 路徑為相對路徑 `./src/main.jsx`。
- 本專案已預先完成此設定。

### 2. 開源授權
本專案採用 **MIT License**，歡迎自由修改與分享。

---
*由 Antigravity 團隊開發設計*
