<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
  >
    <!-- 商品圖片區 -->
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <!-- 商品圖片 -->
      <div class="w-full h-full flex items-center justify-center text-6xl">
        {{ product.icon || "👞" }}
      </div>

      <!-- Hover 遮罩和快速操作 -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <div class="flex gap-2">
          <!-- 快速查看 -->
          <button
            @click.prevent="$emit('quick-view', product)"
            class="bg-white text-gray-800 p-3 rounded-full hover:bg-red-600 hover:text-white transition-colors shadow-lg"
            title="快速查看"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <!-- 加入收藏 -->
          <button
            @click.prevent="toggleFavorite"
            :class="[
              'p-3 rounded-full transition-colors shadow-lg',
              isFavorited
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-800 hover:bg-red-600 hover:text-white',
            ]"
            title="加入收藏"
          >
            <svg
              class="w-5 h-5"
              :fill="isFavorited ? 'currentColor' : 'none'"
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
        </div>
      </div>

      <!-- 標籤 -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span
          v-if="product.isNew"
          class="bg-red-600 text-white text-xs px-2 py-1 rounded"
        >
          NEW
        </span>
        <span
          v-if="product.discount"
          class="bg-yellow-500 text-white text-xs px-2 py-1 rounded"
        >
          -{{ product.discount }}%
        </span>
        <span
          v-if="product.stock === 0"
          class="bg-gray-800 text-white text-xs px-2 py-1 rounded"
        >
          售完
        </span>
      </div>
    </div>

    <!-- 商品資訊區 -->
    <router-link
      :to="`/products/${product.category}/${product.id}`"
      class="block p-4 hover:bg-gray-50 transition-colors"
    >
      <!-- 商品名稱 -->
      <h3
        class="text-base font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors"
      >
        {{ product.name }}
      </h3>

      <!-- 評分 -->
      <div class="flex items-center gap-2 mb-2">
        <div class="flex items-center">
          <svg
            v-for="star in 5"
            :key="star"
            :class="[
              'w-4 h-4',
              star <= Math.round(product.rating || 0)
                ? 'text-yellow-400'
                : 'text-gray-300',
            ]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
        <span class="text-sm text-gray-500">
          ({{ product.reviewCount || 0 }})
        </span>
      </div>

      <!-- 價格 -->
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold text-red-600">
          ${{ formatPrice(finalPrice) }}
        </span>
        <span
          v-if="product.discount"
          class="text-sm text-gray-400 line-through"
        >
          ${{ formatPrice(product.price) }}
        </span>
      </div>

      <!-- 顏色選項 -->
      <div
        v-if="product.colors && product.colors.length > 0"
        class="flex gap-1 mt-3"
      >
        <div
          v-for="color in product.colors.slice(0, 5)"
          :key="color"
          :style="{ backgroundColor: color }"
          class="w-5 h-5 rounded-full border-2 border-gray-300"
          :title="color"
        ></div>
        <span
          v-if="product.colors.length > 5"
          class="text-xs text-gray-500 self-center"
        >
          +{{ product.colors.length - 5 }}
        </span>
      </div>
    </router-link>

    <!-- 加入購物車按鈕 -->
    <div class="px-4 pb-4">
      <BaseButton
        @click="addToCart"
        :disabled="product.stock === 0"
        :loading="isAddingToCart"
        block
        size="sm"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {{ product.stock === 0 ? "已售完" : "加入購物車" }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseButton from "../base/BaseButton.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["quick-view", "add-to-cart", "toggle-favorite"]);

// 是否加入購物車中
const isAddingToCart = ref(false);

// 是否已收藏
const isFavorited = ref(props.product.isFavorited || false);

// 計算最終價格
const finalPrice = computed(() => {
  if (props.product.discount) {
    return props.product.price * (1 - props.product.discount / 100);
  }
  return props.product.price;
});

// 格式化價格
const formatPrice = (price) => {
  return price.toLocaleString("zh-TW");
};

// 加入購物車
const addToCart = async () => {
  if (props.product.stock === 0) return;

  isAddingToCart.value = true;

  // 模擬 API 請求
  setTimeout(() => {
    emit("add-to-cart", props.product);
    isAddingToCart.value = false;
  }, 500);
};

// 切換收藏
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  emit("toggle-favorite", props.product);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
