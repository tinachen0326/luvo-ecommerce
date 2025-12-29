<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
  >
    <!-- 商品圖片區 -->
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <!-- 商品圖片佔位 -->
      <div class="w-full h-full flex items-center justify-center bg-gray-200">
        <span class="text-gray-400 text-sm">商品圖片</span>
      </div>

      <!-- Hover 遮罩和快速操作 -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <div class="flex gap-2">
          <!-- 快速查看 -->
          <button
            @click.prevent="$emit('quick-view', product)"
            class="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-amber-800 hover:text-white transition-colors shadow-lg text-sm font-medium"
            title="快速查看"
          >
            快速查看
          </button>

          <!-- 加入收藏 -->
          <button
            @click.prevent="toggleFavorite"
            :class="[
              'px-4 py-2 rounded-full transition-colors shadow-lg text-sm font-medium',
              isFavorited
                ? 'bg-amber-800 text-white'
                : 'bg-white text-gray-800 hover:bg-amber-800 hover:text-white',
            ]"
            title="加入收藏"
          >
            {{ isFavorited ? "已收藏" : "收藏" }}
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
        class="text-base font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors"
      >
        {{ product.name }}
      </h3>

      <!-- 評分 -->
      <div class="flex items-center gap-2 mb-2">
        <div class="flex items-center gap-1">
          <span class="text-sm font-medium text-gray-700">
            {{ product.rating || 0 }}
          </span>
          <span class="text-sm text-gray-500">分</span>
        </div>
        <span class="text-sm text-gray-500">
          ({{ product.reviewCount || 0 }} 則評價)
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
        {{ product.stock === 0 ? "已售完" : "加入購物車" }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseButton from "../base/BaseButton.vue";
import { useCartStore } from "../../stores/useCartStore";
import { useUserStore } from "../../stores/useUserStore";

const cartStore = useCartStore();
const userStore = useUserStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["quick-view"]);

// 是否加入購物車中
const isAddingToCart = ref(false);

// 是否已收藏（從 userStore 獲取）
const isFavorited = computed(() => {
  return userStore.isFavorited(props.product.id);
});

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
