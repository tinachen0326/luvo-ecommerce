<template>
  <!-- 遮罩層 -->
  <transition name="fade">
    <div
      v-if="cartStore.isCartOpen"
      class="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
      @click="cartStore.closeCart"
    ></div>
  </transition>

  <!-- 側邊欄 -->
  <transition name="slide">
    <div
      v-if="cartStore.isCartOpen"
      class="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
    >
      <!-- 標題列 -->
      <div
        class="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-600 to-red-700"
      >
        <div class="flex items-center gap-3">
          <div class="relative">
            <svg
              class="w-8 h-8 text-white"
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
            <!-- 商品數量徽章 -->
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce"
            >
              {{ cartStore.itemCount }}
            </span>
          </div>
          <h2 class="text-2xl font-bold text-white">購物車</h2>
        </div>
        <button
          @click="cartStore.closeCart"
          class="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- 免運進度條 -->
      <div
        v-if="cartStore.amountToFreeShipping > 0"
        class="p-4 bg-yellow-50 border-b"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">
            再消費
            <span class="text-red-600 font-bold"
              >${{
                cartStore.amountToFreeShipping.toLocaleString("zh-TW")
              }}</span
            >
            即享免運！
          </span>
          <span class="text-xs text-gray-500">{{ freeShippingProgress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            class="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500 relative"
            :style="{ width: `${freeShippingProgress}%` }"
          >
            <div class="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div v-else class="p-4 bg-green-50 border-b">
        <div class="flex items-center gap-2 text-green-700">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium">恭喜！您已享有免運優惠</span>
        </div>
      </div>

      <!-- 購物車商品列表 -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <!-- 空購物車 -->
        <div
          v-if="cartStore.items.length === 0"
          class="flex flex-col items-center justify-center h-full text-gray-400"
        >
          <svg
            class="w-32 h-32 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p class="text-xl font-medium mb-2">購物車是空的</p>
          <p class="text-sm">快去挑選喜歡的商品吧！</p>
          <button
            @click="cartStore.closeCart"
            class="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            開始購物
          </button>
        </div>

        <!-- 商品項目 -->
        <transition-group name="cart-item" tag="div" class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="`${item.id}-${item.selectedSize}-${item.selectedColor}`"
            class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-300"
          >
            <div class="flex gap-4">
              <!-- 商品圖 -->
              <div
                class="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-3xl flex-shrink-0 border-2 border-gray-200"
              >
                {{ item.icon }}
              </div>

              <!-- 商品資訊 -->
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-gray-900 mb-1 line-clamp-2">
                  {{ item.name }}
                </h3>

                <!-- 規格 -->
                <div class="flex gap-2 text-xs text-gray-500 mb-2">
                  <span
                    v-if="item.selectedSize"
                    class="px-2 py-1 bg-white rounded border"
                  >
                    尺寸: {{ item.selectedSize }}
                  </span>
                  <span
                    v-if="item.selectedColor"
                    class="flex items-center gap-1 px-2 py-1 bg-white rounded border"
                  >
                    顏色:
                    <span
                      class="w-3 h-3 rounded-full border"
                      :style="{ backgroundColor: item.selectedColor }"
                    ></span>
                  </span>
                </div>

                <!-- 價格和數量 -->
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-lg font-bold text-red-600">
                      ${{
                        (item.price * item.quantity).toLocaleString("zh-TW")
                      }}
                    </span>
                    <span
                      v-if="item.discount"
                      class="text-xs text-gray-400 line-through ml-2"
                    >
                      ${{
                        (item.originalPrice * item.quantity).toLocaleString(
                          "zh-TW"
                        )
                      }}
                    </span>
                  </div>

                  <!-- 數量控制 -->
                  <div class="flex items-center gap-2">
                    <button
                      @click="
                        cartStore.decrementQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      "
                      class="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      :class="{
                        'opacity-50 cursor-not-allowed': item.quantity <= 1,
                      }"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span class="w-8 text-center font-medium">{{
                      item.quantity
                    }}</span>

                    <button
                      @click="
                        cartStore.incrementQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      "
                      class="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      :class="{
                        'opacity-50 cursor-not-allowed':
                          item.quantity >= item.stock,
                      }"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 刪除按鈕 -->
              <button
                @click="
                  cartStore.removeItem(
                    item.id,
                    item.selectedSize,
                    item.selectedColor
                  )
                "
                class="text-gray-400 hover:text-red-600 transition-colors self-start"
                title="移除商品"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- 底部總計和結帳 -->
      <div
        v-if="cartStore.items.length > 0"
        class="border-t bg-white p-6 space-y-4"
      >
        <!-- 小計 -->
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">商品小計</span>
            <span class="font-medium"
              >${{ cartStore.subtotal.toLocaleString("zh-TW") }}</span
            >
          </div>

          <!-- 優惠券 -->
          <div
            v-if="cartStore.selectedCoupon"
            class="flex justify-between text-sm text-green-600"
          >
            <span>優惠券折扣</span>
            <span
              >-${{ cartStore.discountAmount.toLocaleString("zh-TW") }}</span
            >
          </div>

          <!-- 運費 -->
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">運費</span>
            <span
              :class="
                cartStore.shippingFee === 0 ? 'text-green-600 font-medium' : ''
              "
            >
              {{
                cartStore.shippingFee === 0
                  ? "免運"
                  : `$${cartStore.shippingFee}`
              }}
            </span>
          </div>
        </div>

        <!-- 總計 -->
        <div class="flex justify-between items-center pt-4 border-t">
          <span class="text-lg font-bold">總計</span>
          <span class="text-2xl font-bold text-red-600">
            ${{ cartStore.total.toLocaleString("zh-TW") }}
          </span>
        </div>

        <!-- 按鈕組 -->
        <div class="space-y-2">
          <router-link
            to="/checkout"
            @click="cartStore.closeCart"
            class="block w-full py-3 bg-red-600 text-white text-center font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
          >
            前往結帳
          </router-link>

          <div class="flex gap-2">
            <router-link
              to="/cart"
              @click="cartStore.closeCart"
              class="flex-1 py-2 border-2 border-gray-300 text-gray-700 text-center font-medium rounded-lg hover:border-red-600 hover:text-red-600 transition-colors"
            >
              查看購物車
            </router-link>

            <button
              @click="cartStore.clearCart"
              class="px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors"
              title="清空購物車"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../../stores/useCartStore";

const cartStore = useCartStore();

// 免運進度百分比
const freeShippingProgress = computed(() => {
  const progress = (cartStore.subtotal / 3000) * 100;
  return Math.min(100, Math.round(progress));
});
</script>

<style scoped>
/* 遮罩層動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 側邊欄滑入動畫 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* 購物車項目動畫 */
.cart-item-enter-active {
  transition: all 0.5s ease;
}

.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.cart-item-move {
  transition: transform 0.5s ease;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
