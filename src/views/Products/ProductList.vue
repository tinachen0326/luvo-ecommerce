<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- 麵包屑 -->
    <div class="bg-white border-b">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center text-sm text-gray-600">
          <router-link to="/" class="hover:text-amber-800">首頁</router-link>
          <span class="mx-2">/</span>
          <span class="text-gray-900 font-medium">{{ categoryName }}</span>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- 頁面標題和篩選欄 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ categoryName }}
        </h1>

        <!-- 篩選和排序 -->
        <div
          class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
        >
          <!-- 商品數量 -->
          <p class="text-gray-600">
            共
            <span class="font-semibold text-gray-900">{{
              filteredProducts.length
            }}</span>
            件商品
          </p>

          <!-- 排序和視圖切換 -->
          <div class="flex gap-4 items-center">
            <!-- 排序 -->
            <select
              v-model="sortBy"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
            >
              <option value="default">預設排序</option>
              <option value="price-asc">價格：低到高</option>
              <option value="price-desc">價格：高到低</option>
              <option value="newest">最新上架</option>
              <option value="popular">最受歡迎</option>
              <option value="rating">評分最高</option>
            </select>

            <!-- 視圖切換 -->
            <div class="flex border border-gray-300 rounded-xl overflow-hidden">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'px-3 py-2 transition-colors',
                  viewMode === 'grid'
                    ? 'bg-amber-800 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50',
                ]"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'px-3 py-2 transition-colors',
                  viewMode === 'list'
                    ? 'bg-amber-800 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50',
                ]"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-8">
        <!-- 側邊篩選欄 -->
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 class="text-lg font-semibold mb-4">篩選條件</h3>

            <!-- 價格區間 -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">價格區間</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="0-3000"
                    v-model="selectedPriceRanges"
                    class="mr-2"
                  />
                  <span class="text-sm">$0 - $3,000</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="3000-5000"
                    v-model="selectedPriceRanges"
                    class="mr-2"
                  />
                  <span class="text-sm">$3,000 - $5,000</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="5000-8000"
                    v-model="selectedPriceRanges"
                    class="mr-2"
                  />
                  <span class="text-sm">$5,000 - $8,000</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    value="8000-999999"
                    v-model="selectedPriceRanges"
                    class="mr-2"
                  />
                  <span class="text-sm">$8,000 以上</span>
                </label>
              </div>
            </div>

            <!-- 尺寸 -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">尺寸</h4>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="size in ['39', '40', '41', '42', '43', '44']"
                  :key="size"
                  @click="toggleSize(size)"
                  :class="[
                    'px-3 py-2 border rounded text-sm transition-colors',
                    selectedSizes.includes(size)
                      ? 'border-amber-800 bg-amber-50 text-amber-600'
                      : 'border-gray-300 hover:border-amber-800',
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- 顏色 -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">顏色</h4>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in availableColors"
                  :key="color.name"
                  @click="toggleColor(color.hex)"
                  :class="[
                    'w-8 h-8 rounded-full border-2 transition-all',
                    selectedColors.includes(color.hex)
                      ? 'border-amber-800 ring-2 ring-amber-200'
                      : 'border-gray-300',
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                ></button>
              </div>
            </div>

            <!-- 清除篩選 -->
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              清除所有篩選
            </button>
          </div>
        </aside>

        <!-- 商品列表 -->
        <main class="flex-1">
          <!-- 載入中 -->
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"
            ></div>
          </div>

          <!-- 無商品 -->
          <div
            v-else-if="filteredProducts.length === 0"
            class="text-center py-12"
          >
            <svg
              class="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 class="text-xl font-medium text-gray-900 mb-2">
              找不到符合條件的商品
            </h3>
            <p class="text-gray-600 mb-4">請嘗試調整篩選條件</p>
            <BaseButton @click="clearFilters">清除篩選</BaseButton>
          </div>

          <!-- 商品網格/列表 -->
          <div
            v-else
            :class="[
              'grid gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1',
            ]"
          >
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="handleAddToCart"
              @toggle-favorite="handleToggleFavorite"
              @quick-view="handleQuickView"
            />
          </div>

          <!-- 分頁 -->
          <div
            v-if="filteredProducts.length > 0"
            class="mt-12 flex justify-center"
          >
            <nav class="flex items-center gap-2">
              <button
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                上一頁
              </button>
              <button class="px-4 py-2 bg-amber-800 text-white rounded-lg">
                1
              </button>
              <button
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                2
              </button>
              <button
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                3
              </button>
              <button
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                下一頁
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProductCard from "../../components/business/ProductCard.vue";
import BaseButton from "../../components/base/BaseButton.vue";
import { useProductStore } from "@/stores/useProductStore";

const route = useRoute();
const productStore = useProductStore();

// 商品資料
const products = ref([]);
const loading = ref(true);

// 視圖模式
const viewMode = ref("grid");

// 排序方式
const sortBy = ref("default");

// 篩選條件
const selectedPriceRanges = ref([]);
const selectedSizes = ref([]);
const selectedColors = ref([]);

// 可用顏色
const availableColors = [
  { name: "黑色", hex: "#000000" },
  { name: "棕色", hex: "#8B4513" },
  { name: "咖啡色", hex: "#6F4E37" },
  { name: "深藍", hex: "#1E3A8A" },
  { name: "酒紅", hex: "#7F1D1D" },
];

// 分類名稱
const categoryName = computed(() => {
  const categoryMap = {
    "leather-shoes": "皮鞋",
    boots: "靴子",
    "casual-shoes": "休閒鞋",
  };
  return categoryMap[route.params.category] || "所有商品";
});

// 篩選後的商品
const filteredProducts = computed(() => {
  let result = [...products.value];

  // 價格篩選
  if (selectedPriceRanges.value.length > 0) {
    result = result.filter((product) => {
      return selectedPriceRanges.value.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });
    });
  }

  // 尺寸篩選
  if (selectedSizes.value.length > 0) {
    result = result.filter((product) =>
      product.sizes?.some((size) => selectedSizes.value.includes(size))
    );
  }

  // 顏色篩選
  if (selectedColors.value.length > 0) {
    result = result.filter((product) =>
      product.colors?.some((color) => selectedColors.value.includes(color))
    );
  }

  // 排序
  switch (sortBy.value) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => b.id - a.id);
      break;
    case "popular":
      result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      break;
    case "rating":
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
  }

  return result;
});

// 切換尺寸
const toggleSize = (size) => {
  const index = selectedSizes.value.indexOf(size);
  if (index > -1) {
    selectedSizes.value.splice(index, 1);
  } else {
    selectedSizes.value.push(size);
  }
};

// 切換顏色
const toggleColor = (color) => {
  const index = selectedColors.value.indexOf(color);
  if (index > -1) {
    selectedColors.value.splice(index, 1);
  } else {
    selectedColors.value.push(color);
  }
};

// 清除篩選
const clearFilters = () => {
  selectedPriceRanges.value = [];
  selectedSizes.value = [];
  selectedColors.value = [];
  sortBy.value = "default";
};

// 加入購物車
const handleAddToCart = (product) => {
  console.log("加入購物車:", product);
  // 這裡之後會接 Pinia store
  alert(`已將 ${product.name} 加入購物車！`);
};

// 切換收藏
const handleToggleFavorite = (product) => {
  console.log("切換收藏:", product);
};

// 快速查看
const handleQuickView = (product) => {
  console.log("快速查看:", product);
};

// 載入商品資料
onMounted(() => {
  // 模擬 API 請求
  setTimeout(() => {
    products.value = [
      {
        id: 1,
        name: "【Luvo】紳士格調經典牛津皮鞋",
        price: 6980,
        category: "leather-shoes",
        rating: 4.8,
        reviewCount: 128,
        isNew: true,
        stock: 10,
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["#000000", "#8B4513"],
      },
      {
        id: 2,
        name: "【Luvo】摩登時尚簡約牛津皮鞋",
        price: 4980,
        discount: 15,
        category: "leather-shoes",
        rating: 4.5,
        reviewCount: 89,
        stock: 15,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["#000000", "#6F4E37"],
      },
      {
        id: 3,
        name: "【Luvo】復古風範雕花牛津皮鞋",
        price: 7980,
        category: "leather-shoes",
        rating: 4.9,
        reviewCount: 156,
        isNew: true,
        stock: 8,
        sizes: ["39", "40", "41", "42"],
        colors: ["#8B4513", "#6F4E37"],
      },
      {
        id: 4,
        name: "【Luvo】商務正裝德比皮鞋",
        price: 5980,
        category: "leather-shoes",
        rating: 4.6,
        reviewCount: 74,
        stock: 12,
        sizes: ["40", "41", "42", "43"],
        colors: ["#000000"],
      },
      {
        id: 5,
        name: "【Luvo】紳士樂福休閒皮鞋",
        price: 4580,
        discount: 20,
        category: "leather-shoes",
        rating: 4.7,
        reviewCount: 92,
        stock: 20,
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["#8B4513", "#1E3A8A"],
      },
      {
        id: 6,
        name: "【Luvo】經典百搭孟克鞋",
        price: 6580,
        category: "leather-shoes",
        rating: 4.4,
        reviewCount: 63,
        stock: 18,
        sizes: ["40", "41", "42", "43"],
        colors: ["#000000", "#8B4513", "#7F1D1D"],
      },
      {
        id: 7,
        name: "【Luvo】時尚切爾西靴",
        price: 8980,
        category: "boots",
        rating: 4.8,
        reviewCount: 142,
        isNew: true,
        stock: 10,
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["#000000", "#8B4513"],
      },
      {
        id: 8,
        name: "【Luvo】工裝風馬丁靴",
        price: 7580,
        category: "boots",
        rating: 4.7,
        reviewCount: 108,
        stock: 15,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["#000000", "#6F4E37"],
      },
      {
        id: 9,
        name: "【Luvo】輕量運動休閒鞋",
        price: 3980,
        discount: 25,
        category: "casual-shoes",
        rating: 4.5,
        reviewCount: 215,
        stock: 30,
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["#000000", "#1E3A8A", "#6F4E37"],
      },
    ];
    loading.value = false;
  }, 1000);
});
</script>
