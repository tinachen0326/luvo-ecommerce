<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- 導航欄 -->
    <AppHeader />

    <!-- 主要內容區 -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- 頁尾 -->
    <AppFooter />

    <!-- 購物車側邊欄（全域） -->
    <CartSidebar />

    <!-- 通知提示（全域） -->
    <NotificationToast />
  </div>
</template>

<script setup>
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import CartSidebar from "./components/business/CartSidebar.vue";
import NotificationToast from "./components/base/NotificationToast.vue";
</script>

<style>
/* 全局樣式已在 main.css 中定義 */
</style>
