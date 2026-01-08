# 皮鞋電商平台系統 Luvo Ecommerce Platform

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 專案介紹

Luvo 履藝皮鞋是一個前端電商練習專案，使用 Vue.js 3 及現代前端技術棧構建完整的電商用戶界面。該專案展示了響應式設計、狀態管理、路由控制等現代前端開發最佳實踐。

## 專案網址

[luvo-ecommerce.vercel.app](https://luvo-ecommerce.vercel.app/)

## 測試登入的帳號密碼
- Email: demo@luvo.com
- 密碼: 123456

## 一般帳戶
- Email: user@luvo.com
- 密碼: user123

### 核心價值

- **完整的用戶體驗**：涵蓋商品展示、購物、結算等完整電商前端流程
- **現代化架構**：採用 Vue 3 Composition API 和模組化設計
- **響應式設計**：完美支援桌面端、平板和移動設備
- **狀態管理**：使用 Pinia 進行高效的狀態管理
- **組件化開發**：可重用的組件庫設計

## 核心功能

### 用戶功能

| 功能模塊     | 詳細描述                               |
| ------------ | -------------------------------------- |
| **商品瀏覽** | 響應式商品展示、分類篩選、搜尋、排序   |
| **購物車**   | 即時更新、數量調整、本地持久化         |
| **會員系統** | 用戶註冊、登入、個人資料管理、地址管理 |
| **訂單管理** | 下單流程、訂單查詢、訂單追蹤、狀態展示 |
| **商品評價** | 評分展示、評論瀏覽、圖片展示           |
| **收藏功能** | 心願清單、快速收藏、批量操作           |
| **優惠券**   | 優惠券領取、使用、優惠計算             |

### 管理員功能

| 功能模塊     | 詳細描述                               |
| ------------ | -------------------------------------- |
| **商品管理** | 增刪改查、庫存管理、規格管理、批量上傳 |
| **訂單管理** | 訂單狀態更新、出貨管理、退款處理       |
| **用戶管理** | 會員查詢、信息編輯、權限管理           |
| **數據統計** | 銷售報表、用戶數據、商品熱度分析       |
| **內容管理** | 輪播圖管理、公告發佈、頁面配置         |

## 技術棧

### 核心框架

- **框架**：Vue.js 3 with Composition API
- **狀態管理**：Pinia
- **路由**：Vue Router 4
- **構建工具**：Vite

### UI 與樣式

- **CSS 框架**：Tailwind CSS
- **圖標**：Heroicons / Lucide Icons
- **動畫**：Vue Transition / @vueuse/motion

### 工具庫

- **HTTP 客戶端**：Axios
- **數據驗證**：Vee-Validate + Yup
- **日期處理**：Day.js
- **工具函數**：VueUse
- **圖表庫**：Chart.js / ECharts
- **輪播圖**：Swiper

### 開發工具

- **代碼檢查**：ESLint
- **代碼格式化**：Prettier
- **版本控制**：Git

## 快速開始

### 前置需求

- Node.js 18.0.0 或以上版本
- npm 或 yarn 包管理器
- Git 版本控制工具

### 安裝步驟

#### 1. Clone 專案

```bash
git clone https://github.com/tinachen0326/luvo-ecommerce.git
cd luvo-ecommerce
```

#### 2. 安裝依賴

```bash
npm install
# 或
yarn install
```

#### 3. 環境配置

```bash
# 創建環境配置文件
cp .env.example .env
```

在 `.env` 文件中配置以下環境變量：

```env
# API 基礎路徑
VITE_API_BASE_URL=http://localhost:3000/api

# 上傳文件大小限制 (MB)
VITE_MAX_FILE_SIZE=5

# 應用標題
VITE_APP_TITLE=Luvo 履藝皮鞋
```

#### 4. 啟動開發服務

```bash
npm run dev
# 或
yarn dev
```

訪問 http://localhost:5173 查看應用

## 項目結構

```
luvo-ecommerce/
│
├── public/                         # 靜態資源
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── assets/                     # 資源文件
│   │   ├── images/                 # 圖片資源
│   │   ├── styles/                 # 全局樣式
│   │   │   ├── main.css
│   │   │   └── tailwind.css
│   │   └── icons/                  # 圖標文件
│   │
│   ├── components/                 # 組件目錄
│   │   ├── base/                   # 基礎組件
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseInput.vue
│   │   │   ├── BaseModal.vue
│   │   │   ├── BaseCard.vue
│   │   │   └── BasePagination.vue
│   │   ├── business/               # 業務組件
│   │   │   ├── ProductCard.vue
│   │   │   ├── ProductList.vue
│   │   │   ├── CartItem.vue
│   │   │   ├── OrderItem.vue
│   │   │   ├── ReviewCard.vue
│   │   │   └── AddressCard.vue
│   │   └── layout/                 # 佈局組件
│   │       ├── AppHeader.vue
│   │       ├── AppFooter.vue
│   │       ├── AppSidebar.vue
│   │       └── AppBreadcrumb.vue
│   │
│   ├── views/                      # 頁面視圖
│   │   ├── Home.vue                # 首頁
│   │   ├── Products/               # 商品相關頁面
│   │   │   ├── ProductList.vue     # 商品列表
│   │   │   └── ProductDetail.vue   # 商品詳情
│   │   ├── Cart.vue                # 購物車
│   │   ├── Checkout.vue            # 結算頁面
│   │   ├── User/                   # 用戶相關頁面
│   │   │   ├── Login.vue           # 登入
│   │   │   ├── Register.vue        # 註冊
│   │   │   ├── Profile.vue         # 個人資料
│   │   │   ├── Orders.vue          # 訂單列表
│   │   │   ├── OrderDetail.vue     # 訂單詳情
│   │   │   ├── Favorites.vue       # 收藏清單
│   │   │   └── Addresses.vue       # 地址管理
│   │   └── Admin/                  # 管理後台頁面
│   │       ├── Dashboard.vue       # 儀表板
│   │       ├── ProductManage.vue   # 商品管理
│   │       ├── OrderManage.vue     # 訂單管理
│   │       ├── UserManage.vue      # 用戶管理
│   │       └── Statistics.vue      # 數據統計
│   │
│   ├── stores/                     # Pinia 狀態管理
│   │   ├── useUserStore.js         # 用戶狀態
│   │   ├── useCartStore.js         # 購物車狀態
│   │   ├── useProductStore.js      # 商品狀態
│   │   ├── useOrderStore.js        # 訂單狀態
│   │   └── useUIStore.js           # UI 狀態
│   │
│   ├── router/                     # 路由配置
│   │   ├── index.js                # 路由主文件
│   │   └── guards.js               # 路由守衛
│   │
│   ├── composables/                # 組合式函數
│   │   ├── useAuth.js              # 認證邏輯
│   │   ├── useCart.js              # 購物車邏輯
│   │   ├── useProduct.js           # 商品邏輯
│   │   └── useValidation.js        # 表單驗證
│   │
│   ├── utils/                      # 工具函數
│   │   ├── api.js                  # API 請求封裝
│   │   ├── request.js              # Axios 配置
│   │   ├── helpers.js              # 通用工具函數
│   │   ├── validators.js           # 驗證工具
│   │   ├── formatters.js           # 格式化工具
│   │   └── constants.js            # 常量定義
│   │
│   ├── App.vue                     # 根組件
│   └── main.js                     # 應用入口
│
├── .env.example                    # 環境變量模板
├── .eslintrc.js                    # ESLint 配置
├── .prettierrc                     # Prettier 配置
├── .gitignore
├── index.html                      # HTML 模板
├── package.json                    # 項目配置
├── tailwind.config.js              # Tailwind 配置
├── vite.config.js                  # Vite 配置
└── README.md                       # 項目說明
```

## 開發指南

### 代碼規範

- 使用 ESLint 檢查代碼質量
- 使用 Prettier 統一代碼格式
- 遵循 Vue 3 Composition API 最佳實踐
- 組件命名使用 PascalCase
- 文件命名與組件名保持一致

### 開發命令

```bash
# 啟動開發服務器
npm run dev

# 生產構建
npm run build

# 預覽構建結果
npm run preview

# 代碼檢查
npm run lint

# 代碼格式化
npm run format

# 類型檢查 (如果使用 TypeScript)
npm run type-check
```

### 組件開發規範

**基礎組件命名**

```vue
<!-- 好的命名 -->
BaseButton.vue BaseInput.vue BaseCard.vue

<!-- 避免的命名 -->
Button.vue Input.vue Card.vue
```

**組合式函數命名**

```javascript
// 統一使用 use 前綴
useAuth.js;
useCart.js;
useProduct.js;
```

**Props 定義**

```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});
</script>
```

### 狀態管理規範

```javascript
// stores/useProductStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductStore = defineStore("product", () => {
  // State
  const products = ref([]);
  const loading = ref(false);

  // Getters
  const activeProducts = computed(() =>
    products.value.filter((p) => p.status === "active")
  );

  // Actions
  async function fetchProducts() {
    loading.value = true;
    try {
      // API call
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    activeProducts,
    fetchProducts,
  };
});
```

### API 調用規範

```javascript
// utils/api.js
import request from "./request";

export const productAPI = {
  // 獲取商品列表
  getProducts(params) {
    return request.get("/products", { params });
  },

  // 獲取商品詳情
  getProductDetail(id) {
    return request.get(`/products/${id}`);
  },

  // 創建商品
  createProduct(data) {
    return request.post("/products", data);
  },
};
```

## 常見問題

**Q: 如何配置 API 地址？**
在 `.env` 文件中設置 `VITE_API_BASE_URL`

**Q: 如何添加新的路由？**
在 `router/index.js` 中添加路由配置：

```javascript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('@/views/NewPage.vue')
}
```

**Q: 如何使用 Tailwind CSS 自定義配置？**
在 `tailwind.config.js` 中添加自定義配置：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#your-color",
      },
    },
  },
};
```

**Q: 如何處理圖片資源？**

- 小圖片放在 `src/assets/images/`，會被 Vite 處理
- 大圖片或靜態資源放在 `public/images/`，直接訪問

**Q: 開發時如何處理跨域問題？**
在 `vite.config.js` 中配置代理：

```javascript
export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
};
```

## 生產部署

### 構建項目

```bash
npm run build
```

構建後的文件在 `dist` 目錄中。

### 部署選項

**靜態網站託管**

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

**CDN 部署**
將 `dist` 目錄上傳到 CDN 服務

**Nginx 配置範例**

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /path/to/dist;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## 版權聲明

此專案僅供個人學習與紀錄使用，無授權任何學習教材用途與商業用途。
