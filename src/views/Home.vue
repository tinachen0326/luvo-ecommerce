<template>
  <div>
    <!-- 形象圖 Hero Section -->
    <section
      class="relative h-[600px] overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900"
    >
      <!-- 暫時用漸層背景代替圖片 -->
      <!-- <img 
        src="/picture/Luvo_leather shoes-1.jpg" 
        alt="Luvo 形象圖" 
        class="w-full h-full object-cover"
      /> -->
      <div class="absolute inset-0 bg-black/40 flex items-center">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl text-white">
            <h1 class="text-5xl font-bold mb-4">「Love Your Step」</h1>
            <p class="text-lg leading-relaxed mb-2">(網頁為練習專案)</p>
            <p class="text-lg leading-relaxed">
              Luvo 的誕生源自創辦人對細節與生活品質的執著。<br />
              品牌旨在以創新的設計理念重新定義「皮鞋工藝」，<br />
              讓每雙鞋都不僅是一件商品，而是一件藝術品，陪伴人們邁出自信的每一步。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 新品搶先看 -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">
        新品搶先看
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 商品 1 -->
        <div
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div
            class="aspect-square overflow-hidden bg-gray-200 flex items-center justify-center"
          >
            <!-- <img 
              src="/picture/Luvo_leather shoes-2.jpg" 
              alt="紳士格調經典牛津皮鞋" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            /> -->
            <span class="text-gray-500 text-4xl">👞</span>
          </div>
          <div class="p-4 text-center">
            <h3 class="text-lg font-medium text-gray-800 mb-2">
              【Luvo】紳士格調經典牛津皮鞋
            </h3>
            <p class="text-2xl font-bold text-red-600">$6,980</p>
          </div>
        </div>

        <!-- 商品 2 -->
        <div
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div
            class="aspect-square overflow-hidden bg-gray-200 flex items-center justify-center"
          >
            <!-- <img 
              src="/picture/Luvo_leather shoes-3.jpg" 
              alt="摩登時尚簡約牛津皮鞋" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            /> -->
            <span class="text-gray-500 text-4xl">👞</span>
          </div>
          <div class="p-4 text-center">
            <h3 class="text-lg font-medium text-gray-800 mb-2">
              【Luvo】摩登時尚簡約牛津皮鞋
            </h3>
            <p class="text-2xl font-bold text-red-600">$4,980</p>
          </div>
        </div>

        <!-- 商品 3 -->
        <div
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div
            class="aspect-square overflow-hidden bg-gray-200 flex items-center justify-center"
          >
            <!-- <img 
              src="/picture/Luvo_leather shoes-4.jpg" 
              alt="復古風範雕花牛津皮鞋" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            /> -->
            <span class="text-gray-500 text-4xl">👞</span>
          </div>
          <div class="p-4 text-center">
            <h3 class="text-lg font-medium text-gray-800 mb-2">
              【Luvo】復古風範雕花牛津皮鞋
            </h3>
            <p class="text-2xl font-bold text-red-600">$7,980</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新優惠輪播 -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">
        最新優惠
      </h2>
      <div class="relative max-w-5xl mx-auto">
        <!-- 輪播圖容器 -->
        <div class="relative h-[400px] rounded-lg overflow-hidden">
          <transition name="fade" mode="out-in">
            <div
              :key="currentSlide"
              :class="['absolute inset-0', slides[currentSlide].bgColor]"
            >
              <!-- 暫時使用漸層背景，不用圖片 -->
              <div class="absolute inset-0 bg-black/20">
                <div class="container mx-auto px-8 h-full flex items-center">
                  <div class="text-white max-w-xl">
                    <h3 class="text-3xl font-bold mb-4">
                      {{ slides[currentSlide].title }}
                    </h3>
                    <div
                      class="text-lg leading-relaxed"
                      v-html="slides[currentSlide].content"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 左右切換按鈕 -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- 指示器 -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all',
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50',
            ]"
          ></button>
        </div>
      </div>
    </section>

    <!-- 加入會員專區 -->
    <section
      class="relative h-[500px] overflow-hidden my-12 bg-gradient-to-r from-gray-800 to-gray-900"
    >
      <!-- <img 
        src="/picture/Luvo_leather shoes-1.jpg" 
        alt="加入會員" 
        class="w-full h-full object-cover"
      /> -->
      <div class="absolute inset-0 bg-black/50 flex items-center">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl text-white">
            <h2 class="text-4xl font-bold mb-4">
              新朋友限定｜加入會員 立即享專屬好禮
            </h2>
            <p class="text-lg leading-relaxed mb-4">
              新會員三重好禮限時送：<br />
              1. $100 購物金 ｜註冊完成即贈，立即折抵無門檻<br />
              2. 生日獨享折扣券｜當月壽星享有專屬生日禮遇<br />
              3. 會員限定新品搶先看｜新品上市優先通知，不錯過任何一雙
            </p>
            <p class="text-sm text-gray-200">活動期間：即日起 – 6/30</p>
            <router-link
              to="/register"
              class="inline-block mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              立即加入會員
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 熱門分類 -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">
        熱門分類
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link
          v-for="category in categories"
          :key="category.name"
          :to="category.link"
          class="relative h-64 rounded-lg overflow-hidden group bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"
        >
          <!-- 暫時使用圖示 -->
          <div class="text-8xl">{{ category.icon }}</div>
          <!-- <img 
            :src="category.image" 
            :alt="category.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          /> -->
          <div
            class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"
          >
            <div class="absolute top-4 left-4">
              <h3 class="text-2xl font-bold text-white">
                {{ category.name }}
              </h3>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 輪播資料
const slides = ref([
  {
    image: "", // 暫時不用圖片
    title: "質感升級，品味不凡！",
    content: `活動期間：2/6 - 2/29<br>
              全館滿NT$3,000再享免運優惠！<br>
              (即日起至 2/29，精選皮鞋限時85折，最低 NT$2,380 起，讓您以最優價格享受經典工藝。)`,
    bgColor: "bg-gradient-to-r from-red-900 to-red-700",
  },
  {
    image: "",
    title: "新會員首購禮",
    content: "註冊即享 NT$100 折扣券（滿 NT$1,000 可用）",
    bgColor: "bg-gradient-to-r from-blue-900 to-blue-700",
  },
  {
    image: "",
    title: "品牌專屬優惠",
    content: "每消費 NT$100 = 1 積分，累積可折抵現金，購物越多回饋越多！",
    bgColor: "bg-gradient-to-r from-purple-900 to-purple-700",
  },
]);

const currentSlide = ref(0);
let autoPlayInterval = null;

// 下一張
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

// 上一張
const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

// 跳到指定張
const goToSlide = (index) => {
  currentSlide.value = index;
};

// 自動播放
const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 5000); // 每5秒切換
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
};

// 熱門分類
const categories = ref([
  { name: "皮鞋", icon: "👞", link: "/products/leather-shoes" },
  { name: "休閒鞋", icon: "👟", link: "/products/casual-shoes" },
  { name: "靴子", icon: "🥾", link: "/products/boots" },
  { name: "襪子", icon: "🧦", link: "/accessories/socks" },
  { name: "皮帶", icon: "👔", link: "/accessories/belts" },
  { name: "托特包", icon: "👜", link: "/accessories/bags" },
]);

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
