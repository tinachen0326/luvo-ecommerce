<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 麵包屑導航 -->
    <div class="bg-white border-b">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex text-sm text-gray-600">
          <router-link to="/" class="hover:text-amber-800">首頁</router-link>
          <span class="mx-2">/</span>
          <span class="text-gray-900">我的訂單</span>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- 頁面標題 -->
      <h1 class="text-3xl font-bold text-gray-900 mb-8">我的訂單</h1>

      <!-- 篩選標籤 -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex flex-wrap gap-3">
          <button
            v-for="status in orderStatuses"
            :key="status.value"
            @click="currentStatus = status.value"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              currentStatus === status.value
                ? 'bg-amber-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ status.label }}
            <span
              v-if="getOrderCount(status.value) > 0"
              class="ml-2 px-2 py-0.5 text-xs rounded-full"
              :class="
                currentStatus === status.value
                  ? 'bg-white text-amber-800'
                  : 'bg-gray-300 text-gray-700'
              "
            >
              {{ getOrderCount(status.value) }}
            </span>
          </button>
        </div>
      </div>

      <!-- 訂單列表 -->
      <div v-if="filteredOrders.length > 0" class="space-y-4">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- 訂單標題 -->
          <div
            class="bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4 flex-wrap">
              <span class="text-sm text-gray-600">
                訂單編號：<span class="font-medium text-gray-900">{{
                  order.orderNumber
                }}</span>
              </span>
              <span class="text-sm text-gray-600">
                下單時間：{{ order.createdAt }}
              </span>
            </div>
            <span :class="getStatusClass(order.status)">
              {{ getStatusText(order.status) }}
            </span>
          </div>

          <!-- 訂單商品 -->
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex gap-4"
              >
                <!-- 商品圖片 -->
                <router-link :to="`/products/${item.productId}`">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
                  />
                </router-link>

                <!-- 商品資訊 -->
                <div class="flex-1">
                  <router-link
                    :to="`/products/${item.productId}`"
                    class="font-medium text-gray-900 hover:text-amber-800 transition-colors"
                  >
                    {{ item.name }}
                  </router-link>
                  <div class="mt-1 text-sm text-gray-600">
                    <span v-if="item.size">尺寸：{{ item.size }}</span>
                    <span v-if="item.color" class="ml-3"
                      >顏色：{{ item.color }}</span
                    >
                  </div>
                  <div class="mt-1 text-sm text-gray-600">
                    數量：{{ item.quantity }}
                  </div>
                </div>

                <!-- 價格 -->
                <div class="text-right">
                  <div class="font-bold text-gray-900">
                    ${{ (item.price * item.quantity).toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 訂單金額 -->
            <div class="mt-4 pt-4 border-t">
              <div class="flex justify-end">
                <div class="space-y-1 text-right">
                  <div class="text-sm text-gray-600">
                    商品小計：${{ order.subtotal.toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-600">
                    運費：${{ order.shippingFee.toLocaleString() }}
                  </div>
                  <div v-if="order.discount > 0" class="text-sm text-green-600">
                    折扣：-${{ order.discount.toLocaleString() }}
                  </div>
                  <div class="text-xl font-bold text-amber-800">
                    訂單總計：${{ order.total.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按鈕 -->
            <div class="mt-4 pt-4 border-t flex flex-wrap gap-3 justify-end">
              <!-- 查看詳情 -->
              <router-link
                :to="`/user/orders/${order.id}`"
                class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                查看詳情
              </router-link>

              <!-- 待付款 - 前往付款 -->
              <button
                v-if="order.status === 'pending'"
                @click="handlePayment(order)"
                class="px-4 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors"
              >
                前往付款
              </button>

              <!-- 待收貨 - 確認收貨 -->
              <button
                v-if="order.status === 'shipped'"
                @click="confirmReceipt(order.id)"
                class="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                確認收貨
              </button>

              <!-- 已完成 - 再次購買 -->
              <button
                v-if="order.status === 'completed'"
                @click="reorder(order)"
                class="px-4 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors"
              >
                再次購買
              </button>

              <!-- 已完成 - 評價商品 -->
              <button
                v-if="order.status === 'completed' && !order.reviewed"
                @click="reviewOrder(order.id)"
                class="px-4 py-2 border border-amber-800 text-amber-800 font-medium rounded-lg hover:bg-amber-50 transition-colors"
              >
                評價商品
              </button>

              <!-- 已取消/退款 - 刪除訂單 -->
              <button
                v-if="
                  order.status === 'cancelled' || order.status === 'refunded'
                "
                @click="deleteOrder(order.id)"
                class="px-4 py-2 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
              >
                刪除訂單
              </button>

              <!-- 申請退款 -->
              <button
                v-if="order.status === 'completed' && canRefund(order)"
                @click="requestRefund(order.id)"
                class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                申請退款
              </button>

              <!-- 取消訂單 -->
              <button
                v-if="
                  order.status === 'pending' || order.status === 'processing'
                "
                @click="cancelOrder(order.id)"
                class="px-4 py-2 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
              >
                取消訂單
              </button>

              <!-- 查詢物流 -->
              <button
                v-if="order.status === 'shipped' && order.trackingNumber"
                @click="trackOrder(order)"
                class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                🚚 查詢物流
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 無訂單提示 -->
      <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
        <svg
          class="w-24 h-24 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 mb-2">
          {{
            currentStatus === "all" ? "尚無訂單記錄" : "目前沒有符合條件的訂單"
          }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{
            currentStatus === "all"
              ? "快去挑選喜歡的商品吧！"
              : "試試其他篩選條件"
          }}
        </p>
        <router-link
          v-if="currentStatus === 'all'"
          to="/products"
          class="inline-block px-6 py-3 bg-amber-800 text-white font-bold rounded-lg hover:bg-amber-900 transition-colors"
        >
          開始購物
        </router-link>
        <button
          v-else
          @click="currentStatus = 'all'"
          class="inline-block px-6 py-3 bg-amber-800 text-white font-bold rounded-lg hover:bg-amber-900 transition-colors"
        >
          查看所有訂單
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 當前篩選狀態
const currentStatus = ref("all");

// 訂單狀態選項
const orderStatuses = ref([
  { value: "all", label: "全部訂單" },
  { value: "pending", label: "待付款" },
  { value: "processing", label: "處理中" },
  { value: "shipped", label: "待收貨" },
  { value: "completed", label: "已完成" },
  { value: "cancelled", label: "已取消" },
]);

// 訂單資料（模擬）
const orders = ref([
  {
    id: 1,
    orderNumber: "ORD20240103001",
    status: "completed",
    createdAt: "2024-01-03 14:30",
    items: [
      {
        id: 1,
        productId: 1,
        name: "【Luvo】紳士格調經典牛津皮鞋",
        image: "/images/product-1.jpg",
        price: 6980,
        quantity: 1,
        size: "42",
        color: "黑色",
      },
    ],
    subtotal: 6980,
    shippingFee: 0,
    discount: 0,
    total: 6980,
    trackingNumber: null,
    reviewed: false,
  },
  {
    id: 2,
    orderNumber: "ORD20231230002",
    status: "shipped",
    createdAt: "2023-12-30 10:15",
    items: [
      {
        id: 2,
        productId: 2,
        name: "【Luvo】摩登時尚簡約牛津皮鞋",
        image: "/images/product-2.jpg",
        price: 4980,
        quantity: 2,
        size: "41",
        color: "咖啡色",
      },
    ],
    subtotal: 9960,
    shippingFee: 100,
    discount: 100,
    total: 9960,
    trackingNumber: "1234567890",
    reviewed: false,
  },
  {
    id: 3,
    orderNumber: "ORD20231225003",
    status: "pending",
    createdAt: "2023-12-25 16:45",
    items: [
      {
        id: 3,
        productId: 3,
        name: "【Luvo】復古風範雕花牛津皮鞋",
        image: "/images/product-3.jpg",
        price: 7980,
        quantity: 1,
        size: "43",
        color: "棕色",
      },
    ],
    subtotal: 7980,
    shippingFee: 100,
    discount: 0,
    total: 8080,
    trackingNumber: null,
    reviewed: false,
  },
]);

// 篩選後的訂單
const filteredOrders = computed(() => {
  if (currentStatus.value === "all") {
    return orders.value;
  }
  return orders.value.filter((order) => order.status === currentStatus.value);
});

// 取得訂單數量
const getOrderCount = (status) => {
  if (status === "all") {
    return orders.value.length;
  }
  return orders.value.filter((order) => order.status === status).length;
};

// 取得狀態文字
const getStatusText = (status) => {
  const statusMap = {
    pending: "待付款",
    processing: "處理中",
    shipped: "待收貨",
    completed: "已完成",
    cancelled: "已取消",
    refunded: "已退款",
  };
  return statusMap[status] || status;
};

// 取得狀態樣式
const getStatusClass = (status) => {
  const baseClass = "px-3 py-1 text-sm font-medium rounded-full";
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-800",
    refunded: "bg-red-100 text-red-800",
  };
  return `${baseClass} ${statusClasses[status] || ""}`;
};

// 判斷是否可退款（例如：完成後 7 天內）
const canRefund = (order) => {
  // 簡化邏輯，實際應該檢查訂單完成日期
  return true;
};

// 前往付款
const handlePayment = (order) => {
  router.push(`/checkout?orderId=${order.id}`);
};

// 確認收貨
const confirmReceipt = (orderId) => {
  if (confirm("確認已收到商品？")) {
    const order = orders.value.find((o) => o.id === orderId);
    if (order) {
      order.status = "completed";
      alert("✓ 已確認收貨");
    }
  }
};

// 再次購買
const reorder = (order) => {
  alert("將商品加入購物車...");
  // TODO: 將訂單商品加入購物車
  router.push("/cart");
};

// 評價商品
const reviewOrder = (orderId) => {
  router.push(`/user/orders/${orderId}/review`);
};

// 刪除訂單
const deleteOrder = (orderId) => {
  if (confirm("確定要刪除此訂單嗎？")) {
    const index = orders.value.findIndex((o) => o.id === orderId);
    if (index > -1) {
      orders.value.splice(index, 1);
      alert("✓ 訂單已刪除");
    }
  }
};

// 申請退款
const requestRefund = (orderId) => {
  router.push(`/user/orders/${orderId}/refund`);
};

// 取消訂單
const cancelOrder = (orderId) => {
  if (confirm("確定要取消此訂單嗎？")) {
    const order = orders.value.find((o) => o.id === orderId);
    if (order) {
      order.status = "cancelled";
      alert("✓ 訂單已取消");
    }
  }
};

// 查詢物流
const trackOrder = (order) => {
  alert(`物流追蹤號：${order.trackingNumber}\n\n正在跳轉至物流查詢頁面...`);
  // TODO: 開啟物流追蹤頁面
};
</script>

<style scoped>
/* 自訂樣式 */
</style>
