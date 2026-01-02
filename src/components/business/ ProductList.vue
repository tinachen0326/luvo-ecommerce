<template>
    <div class="min-h-screen bg-gray-50">
      <!-- 麵包屑導航 -->
      <div class="bg-white border-b">
        <div class="container mx-auto px-4 py-4">
          <nav class="flex text-sm text-gray-600">
            <router-link to="/" class="hover:text-amber-800">首頁</router-link>
            <span class="mx-2">/</span>
            <span class="text-gray-900">{{ categoryName }}</span>
          </nav>
        </div>
      </div>
  
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- 左側篩選欄 -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 class="text-lg font-bold text-gray-900 mb-4">篩選條件</h2>
  
              <!-- 分類 -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-3">商品分類</h3>
                <div class="space-y-2">
                  <label
                    v-for="category in categories"
                    :key="category.id"
                    class="flex items-center cursor-pointer hover:text-amber-800"
                  >
                    <input
                      type="radio"
                      :value="category.id"
                      v-model="filters.category"
                      @change="applyFilters"
                      class="mr-2 text-amber-800 focus:ring-amber-500"
                    />
                    <span class="text-sm">{{ category.name }}</span>
                  </label>
                </div>
              </div>
  
              <!-- 價格範圍 -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-3">價格區間</h3>
                <div class="space-y-2">
                  <label
                    v-for="range in priceRanges"
                    :key="range.id"
                    class="flex items-center cursor-pointer hover:text-amber-800"
                  >
                    <input
                      type="checkbox"
                      :value="range.id"
                      v-model="filters.priceRange"
                      @change="applyFilters"
                      class="mr-2 text-amber-800 focus:ring-amber-500 rounded"
                    />
                    <span class="text-sm">{{ range.label }}</span>
                  </label>
                </div>
              </div>
  
              <!-- 尺寸 -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-3">尺寸</h3>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="size in sizes"
                    :key="size"
                    @click="toggleSize(size)"
                    :class="[
                      'px-3 py-2 text-sm rounded border transition-colors',
                      filters.sizes.includes(size)
                        ? 'bg-amber-800 text-white border-amber-800'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-amber-800'
                    ]"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
  
              <!-- 顏色 -->
              <div class="mb-6">
                <h3 class="font-medium text-gray-900 mb-3">顏色</h3>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="color in colors"
                    :key="color.name"
                    @click="toggleColor(color.name)"
                    :class="[
                      'w-8 h-8 rounded-full border-2 transition-all',
                      filters.colors.includes(color.name)
                        ? 'border-amber-800 ring-2 ring-amber-300'
                        : 'border-gray-300 hover:border-amber-800'
                    ]"
                    :style="{ backgroundColor: color.hex }"
                    :title="color.name"
                  ></button>
                </div>
              </div>
  
              <!-- 清除篩選 -->
              <button
                @click="clearFilters"
                class="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                清除所有篩選
              </button>
            </div>
          </aside>
  
          <!-- 右側商品列表 -->
          <main class="flex-1">
            <!-- 標題與排序 -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ categoryName }}</h1>
                <p class="text-gray-600 text-sm mt-1">共 {{ filteredProducts.length }} 件商品</p>
              </div>
  
              <!-- 排序選項 -->
              <select
                v-model="sortBy"
                @change="sortProducts"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="default">預設排序</option>
                <option value="price-asc">價格：低到高</option>
                <option value="price-desc">價格：高到低</option>
                <option value="newest">最新上架</option>
                <option value="popular">最熱銷</option>
              </select>
            </div>
  
            <!-- 商品網格 -->
            <div
              v-if="filteredProducts.length > 0"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div
                v-for="product in paginatedProducts"
                :key="product.id"
                class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
              >
                <!-- 商品圖片 -->
                <router-link :to="`/products/${product.id}`" class="block relative">
                  <div class="aspect-[4/5] overflow-hidden bg-gray-200">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <!-- 標籤 -->
                  <div class="absolute top-2 left-2 flex flex-col gap-2">
                    <span
                      v-if="product.isNew"
                      class="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded"
                    >
                      NEW
                    </span>
                    <span
                      v-if="product.discount"
                      class="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded"
                    >
                      -{{ product.discount }}%
                    </span>
                  </div>
                  <!-- 收藏按鈕 -->
                  <button
                    @click.prevent="toggleFavorite(product.id)"
                    class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      :class="[
                        'w-5 h-5',
                        product.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                      ]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </router-link>
  
                <!-- 商品資訊 -->
                <div class="p-4">
                  <router-link :to="`/products/${product.id}`">
                    <h3 class="text-base font-medium text-gray-900 mb-2 hover:text-amber-800 transition-colors line-clamp-2">
                      {{ product.name }}
                    </h3>
                  </router-link>
  
                  <!-- 價格 -->
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-xl font-bold text-amber-800">
                      ${{ product.salePrice.toLocaleString() }}
                    </span>
                    <span
                      v-if="product.originalPrice > product.salePrice"
                      class="text-sm text-gray-500 line-through"
                    >
                      ${{ product.originalPrice.toLocaleString() }}
                    </span>
                  </div>
  
                  <!-- 評分 -->
                  <div class="flex items-center gap-1 mb-3">
                    <div class="flex">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        :class="[
                          'w-4 h-4',
                          i <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        ]"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="text-xs text-gray-600">({{ product.reviews }})</span>
                  </div>
  
                  <!-- 加入購物車按鈕 -->
                  <button
                    @click="addToCart(product)"
                    class="w-full px-4 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
  
            <!-- 無商品提示 -->
            <div v-else class="text-center py-12">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 class="text-xl font-medium text-gray-900 mb-2">找不到符合條件的商品</h3>
              <p class="text-gray-600 mb-4">試試調整篩選條件或清除所有篩選</p>
              <button
                @click="clearFilters"
                class="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors"
              >
                清除篩選
              </button>
            </div>
  
            <!-- 分頁 -->
            <div v-if="totalPages > 1" class="mt-8 flex justify-center">
              <nav class="flex gap-2">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  上一頁
                </button>
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'px-4 py-2 border rounded-lg',
                    currentPage === page
                      ? 'bg-amber-800 text-white border-amber-800'
                      : 'hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  // 當前分類
  const categoryName = ref('所有商品')
  
  // 篩選條件
  const filters = ref({
    category: 'all',
    priceRange: [],
    sizes: [],
    colors: []
  })
  
  // 排序方式
  const sortBy = ref('default')
  
  // 分頁
  const currentPage = ref(1)
  const itemsPerPage = 9
  
  // 分類選項
  const categories = ref([
    { id: 'all', name: '全部商品' },
    { id: 'leather-shoes', name: '皮鞋' },
    { id: 'casual-shoes', name: '休閒鞋' },
    { id: 'boots', name: '靴子' },
    { id: 'accessories', name: '配件' }
  ])
  
  // 價格區間
  const priceRanges = ref([
    { id: '0-3000', label: '$0 - $3,000', min: 0, max: 3000 },
    { id: '3000-5000', label: '$3,000 - $5,000', min: 3000, max: 5000 },
    { id: '5000-8000', label: '$5,000 - $8,000', min: 5000, max: 8000 },
    { id: '8000+', label: '$8,000 以上', min: 8000, max: Infinity }
  ])
  
  // 尺寸選項
  const sizes = ref(['39', '40', '41', '42', '43', '44', '45'])
  
  // 顏色選項
  const colors = ref([
    { name: '黑色', hex: '#000000' },
    { name: '棕色', hex: '#8B4513' },
    { name: '咖啡色', hex: '#6F4E37' },
    { name: '深藍色', hex: '#191970' },
    { name: '灰色', hex: '#808080' },
    { name: '白色', hex: '#FFFFFF' }
  ])
  
  // 商品資料（模擬）
  const allProducts = ref([
    {
      id: 1,
      name: '【Luvo】紳士格調經典牛津皮鞋',
      category: 'leather-shoes',
      image: '/images/product-1.jpg',
      originalPrice: 6980,
      salePrice: 6980,
      discount: 0,
      rating: 5,
      reviews: 128,
      isNew: true,
      isFavorite: false,
      sizes: ['40', '41', '42', '43'],
      colors: ['黑色', '棕色']
    },
    {
      id: 2,
      name: '【Luvo】摩登時尚簡約牛津皮鞋',
      category: 'leather-shoes',
      image: '/images/product-2.jpg',
      originalPrice: 5980,
      salePrice: 4980,
      discount: 15,
      rating: 4,
      reviews: 86,
      isNew: false,
      isFavorite: false,
      sizes: ['39', '40', '41', '42'],
      colors: ['黑色', '咖啡色']
    },
    {
      id: 3,
      name: '【Luvo】復古風範雕花牛津皮鞋',
      category: 'leather-shoes',
      image: '/images/product-3.jpg',
      originalPrice: 7980,
      salePrice: 7980,
      discount: 0,
      rating: 5,
      reviews: 95,
      isNew: true,
      isFavorite: false,
      sizes: ['41', '42', '43', '44'],
      colors: ['棕色', '黑色']
    },
    // 可以加入更多商品...
  ])
  
  // 篩選後的商品
  const filteredProducts = computed(() => {
    let result = [...allProducts.value]
  
    // 分類篩選
    if (filters.value.category !== 'all') {
      result = result.filter(p => p.category === filters.value.category)
    }
  
    // 價格篩選
    if (filters.value.priceRange.length > 0) {
      result = result.filter(product => {
        return filters.value.priceRange.some(rangeId => {
          const range = priceRanges.value.find(r => r.id === rangeId)
          return product.salePrice >= range.min && product.salePrice < range.max
        })
      })
    }
  
    // 尺寸篩選
    if (filters.value.sizes.length > 0) {
      result = result.filter(product => {
        return filters.value.sizes.some(size => product.sizes.includes(size))
      })
    }
  
    // 顏色篩選
    if (filters.value.colors.length > 0) {
      result = result.filter(product => {
        return filters.value.colors.some(color => product.colors.includes(color))
      })
    }
  
    return result
  })
  
  // 排序後的商品
  const sortedProducts = computed(() => {
    const products = [...filteredProducts.value]
  
    switch (sortBy.value) {
      case 'price-asc':
        return products.sort((a, b) => a.salePrice - b.salePrice)
      case 'price-desc':
        return products.sort((a, b) => b.salePrice - a.salePrice)
      case 'newest':
        return products.sort((a, b) => b.isNew - a.isNew)
      case 'popular':
        return products.sort((a, b) => b.reviews - a.reviews)
      default:
        return products
    }
  })
  
  // 分頁後的商品
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedProducts.value.slice(start, end)
  })
  
  // 總頁數
  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage)
  })
  
  // 切換尺寸
  const toggleSize = (size) => {
    const index = filters.value.sizes.indexOf(size)
    if (index > -1) {
      filters.value.sizes.splice(index, 1)
    } else {
      filters.value.sizes.push(size)
    }
    applyFilters()
  }
  
  // 切換顏色
  const toggleColor = (color) => {
    const index = filters.value.colors.indexOf(color)
    if (index > -1) {
      filters.value.colors.splice(index, 1)
    } else {
      filters.value.colors.push(color)
    }
    applyFilters()
  }
  
  // 應用篩選
  const applyFilters = () => {
    currentPage.value = 1
  }
  
  // 排序商品
  const sortProducts = () => {
    currentPage.value = 1
  }
  
  // 清除篩選
  const clearFilters = () => {
    filters.value = {
      category: 'all',
      priceRange: [],
      sizes: [],
      colors: []
    }
    sortBy.value = 'default'
    currentPage.value = 1
  }
  
  // 加入購物車
  const addToCart = (product) => {
    // TODO: 實際的加入購物車邏輯
    alert(`已將 ${product.name} 加入購物車`)
  }
  
  // 切換收藏
  const toggleFavorite = (productId) => {
    const product = allProducts.value.find(p => p.id === productId)
    if (product) {
      product.isFavorite = !product.isFavorite
    }
  }
  
  onMounted(() => {
    // 根據路由參數設定分類
    const category = route.params.category
    if (category) {
      filters.value.category = category
      const cat = categories.value.find(c => c.id === category)
      if (cat) {
        categoryName.value = cat.name
      }
    }
  })
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>