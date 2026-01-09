<template>
    <div class="min-h-screen bg-gray-50">
      <!-- 頁面標題 -->
      <div class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">訂單管理</h1>
              <p class="text-gray-600 mt-2">管理所有訂單資訊和處理狀態</p>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="exportOrders"
                class="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                匯出訂單
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container mx-auto px-4 py-8">
        <!-- 統計卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">待處理</p>
                <p class="text-3xl font-bold text-yellow-600">{{ orderStats.pending }}</p>
              </div>
              <div class="bg-yellow-100 p-3 rounded-full">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
  
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">處理中</p>
                <p class="text-3xl font-bold text-blue-600">{{ orderStats.processing }}</p>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
  
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">已出貨</p>
                <p class="text-3xl font-bold text-purple-600">{{ orderStats.shipped }}</p>
              </div>
              <div class="bg-purple-100 p-3 rounded-full">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
            </div>
          </div>
  
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">已完成</p>
                <p class="text-3xl font-bold text-green-600">{{ orderStats.completed }}</p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 篩選和搜尋區 -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <!-- 搜尋 -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">搜尋訂單</label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="訂單編號、客戶姓名..."
                  class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
  
            <!-- 狀態篩選 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">訂單狀態</label>
              <select
                v-model="filterStatus"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">全部狀態</option>
                <option value="pending">待處理</option>
                <option value="processing">處理中</option>
                <option value="shipped">已出貨</option>
                <option value="completed">已完成</option>
                <option value="cancelled">已取消</option>
              </select>
            </div>
  
            <!-- 日期範圍 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">開始日期</label>
              <input
                v-model="filterDateStart"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">結束日期</label>
              <input
                v-model="filterDateEnd"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
  
        <!-- 訂單列表 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">訂單編號</th>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">客戶資訊</th>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">商品數量</th>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">訂單金額</th>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">付款方式</th>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">狀態</th>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">下單時間</th>
                  <th class="text-left py-4 px-6 text-gray-600 font-medium text-sm">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in paginatedOrders"
                  :key="order.id"
                  class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td class="py-4 px-6">
                    <p class="font-medium text-gray-800">{{ order.orderNo }}</p>
                  </td>
                  <td class="py-4 px-6">
                    <p class="font-medium text-gray-800">{{ order.customer }}</p>
                    <p class="text-sm text-gray-500">{{ order.phone }}</p>
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-600">
                    {{ order.items.length }} 件商品
                  </td>
                  <td class="py-4 px-6">
                    <p class="font-medium text-gray-800">NT$ {{ formatNumber(order.amount) }}</p>
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-600">
                    {{ getPaymentMethodText(order.paymentMethod) }}
                  </td>
                  <td class="py-4 px-6">
                    <select
                      :value="order.status"
                      @change="updateOrderStatus(order, $event.target.value)"
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer',
                        getStatusClass(order.status)
                      ]"
                    >
                      <option value="pending">待處理</option>
                      <option value="processing">處理中</option>
                      <option value="shipped">已出貨</option>
                      <option value="completed">已完成</option>
                      <option value="cancelled">已取消</option>
                    </select>
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-600">
                    {{ order.createdAt }}
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewOrderDetail(order)"
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="查看詳情"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        @click="printOrder(order)"
                        class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="列印訂單"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- 分頁 -->
          <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p class="text-sm text-gray-600">
              顯示 {{ startIndex + 1 }} 至 {{ endIndex }} 筆，共 {{ filteredOrders.length }} 筆
            </p>
            <div class="flex items-center space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                上一頁
              </button>
              <template v-for="page in displayPages" :key="page">
                <button
                  v-if="page !== '...'"
                  @click="currentPage = page"
                  :class="[
                    'px-4 py-2 border rounded-lg transition-colors',
                    currentPage === page
                      ? 'bg-amber-800 text-white border-amber-800'
                      : 'border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <span v-else class="px-2 text-gray-500">...</span>
              </template>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                下一頁
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 訂單詳情 Modal -->
      <div
        v-if="showDetailModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeDetailModal"
      >
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-800">訂單詳情</h2>
              <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
  
          <div v-if="selectedOrder" class="p-6 space-y-6">
            <!-- 訂單基本資訊 -->
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-4">訂單資訊</h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-sm text-gray-500">訂單編號</p>
                    <p class="font-medium text-gray-800">{{ selectedOrder.orderNo }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">下單時間</p>
                    <p class="font-medium text-gray-800">{{ selectedOrder.createdAt }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">訂單狀態</p>
                    <span
                      :class="[
                        'inline-block px-3 py-1 rounded-full text-xs font-medium',
                        getStatusClass(selectedOrder.status)
                      ]"
                    >
                      {{ getStatusText(selectedOrder.status) }}
                    </span>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">付款方式</p>
                    <p class="font-medium text-gray-800">{{ getPaymentMethodText(selectedOrder.paymentMethod) }}</p>
                  </div>
                </div>
              </div>
  
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-4">收件人資訊</h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-sm text-gray-500">收件人</p>
                    <p class="font-medium text-gray-800">{{ selectedOrder.customer }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">聯絡電話</p>
                    <p class="font-medium text-gray-800">{{ selectedOrder.phone }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">配送地址</p>
                    <p class="font-medium text-gray-800">{{ selectedOrder.address }}</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- 商品清單 -->
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-4">商品清單</h3>
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="text-left py-3 px-4 text-gray-600 font-medium text-sm">商品</th>
                      <th class="text-left py-3 px-4 text-gray-600 font-medium text-sm">規格</th>
                      <th class="text-left py-3 px-4 text-gray-600 font-medium text-sm">單價</th>
                      <th class="text-left py-3 px-4 text-gray-600 font-medium text-sm">數量</th>
                      <th class="text-left py-3 px-4 text-gray-600 font-medium text-sm">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in selectedOrder.items"
                      :key="item.id"
                      class="border-t border-gray-100"
                    >
                      <td class="py-3 px-4">
                        <div class="flex items-center space-x-3">
                          <img
                            :src="item.image"
                            :alt="item.name"
                            class="w-12 h-12 object-cover rounded"
                          />
                          <p class="font-medium text-gray-800">{{ item.name }}</p>
                        </div>
                      </td>
                      <td class="py-3 px-4 text-sm text-gray-600">{{ item.spec }}</td>
                      <td class="py-3 px-4 text-sm text-gray-800">NT$ {{ formatNumber(item.price) }}</td>
                      <td class="py-3 px-4 text-sm text-gray-600">{{ item.quantity }}</td>
                      <td class="py-3 px-4 font-medium text-gray-800">
                        NT$ {{ formatNumber(item.price * item.quantity) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            <!-- 金額明細 -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">商品小計</span>
                  <span class="font-medium text-gray-800">NT$ {{ formatNumber(selectedOrder.subtotal) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">運費</span>
                  <span class="font-medium text-gray-800">NT$ {{ formatNumber(selectedOrder.shipping) }}</span>
                </div>
                <div v-if="selectedOrder.discount" class="flex justify-between text-green-600">
                  <span>折扣</span>
                  <span class="font-medium">- NT$ {{ formatNumber(selectedOrder.discount) }}</span>
                </div>
                <div class="pt-3 border-t border-gray-300 flex justify-between">
                  <span class="text-lg font-bold text-gray-800">訂單總額</span>
                  <span class="text-2xl font-bold text-amber-800">NT$ {{ formatNumber(selectedOrder.amount) }}</span>
                </div>
              </div>
            </div>
  
            <!-- 備註 -->
            <div v-if="selectedOrder.note">
              <h3 class="text-lg font-bold text-gray-800 mb-2">訂單備註</h3>
              <p class="text-gray-600 bg-gray-50 p-4 rounded-lg">{{ selectedOrder.note }}</p>
            </div>
  
            <!-- 操作按鈕 -->
            <div class="flex justify-end space-x-4 pt-4">
              <button
                @click="printOrder(selectedOrder)"
                class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                列印訂單
              </button>
              <button
                @click="closeDetailModal"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // 訂單列表
  const orders = ref([
    {
      id: 1,
      orderNo: 'ORD20250109001',
      customer: '王小明',
      phone: '0912-345-678',
      address: '台北市信義區信義路五段7號',
      items: [
        { id: 1, name: '紳士格調經典牛津皮鞋', spec: '黑色 / 42', price: 6980, quantity: 1, image: '/images/product-1.jpg' },
        { id: 2, name: '商務紳士襪 3雙組', spec: '黑色', price: 680, quantity: 2, image: '/images/product-9.jpg' }
      ],
      subtotal: 8340,
      shipping: 0,
      discount: 100,
      amount: 8240,
      paymentMethod: 'credit_card',
      status: 'pending',
      createdAt: '2025-01-09 14:30:25',
      note: '請在下午配送'
    },
    {
      id: 2,
      orderNo: 'ORD20250109002',
      customer: '李美麗',
      phone: '0923-456-789',
      address: '新北市板橋區中山路一段152號',
      items: [
        { id: 1, name: '摩登時尚簡約牛津皮鞋', spec: '棕色 / 40', price: 4980, quantity: 2, image: '/images/product-2.jpg' }
      ],
      subtotal: 9960,
      shipping: 100,
      discount: 0,
      amount: 10060,
      paymentMethod: 'atm',
      status: 'processing',
      createdAt: '2025-01-09 13:15:42',
      note: ''
    },
    {
      id: 3,
      orderNo: 'ORD20250109003',
      customer: '張大華',
      phone: '0934-567-890',
      address: '台中市西屯區台灣大道三段99號',
      items: [
        { id: 1, name: '復古風範雕花牛津皮鞋', spec: '咖啡色 / 43', price: 7980, quantity: 1, image: '/images/product-3.jpg' }
      ],
      subtotal: 7980,
      shipping: 0,
      discount: 0,
      amount: 7980,
      paymentMethod: 'cod',
      status: 'shipped',
      createdAt: '2025-01-09 11:20:18',
      note: ''
    },
    {
      id: 4,
      orderNo: 'ORD20250108004',
      customer: '陳小芬',
      phone: '0945-678-901',
      address: '高雄市前鎮區中山二路5號',
      items: [
        { id: 1, name: '經典切爾西靴', spec: '黑色 / 41', price: 8980, quantity: 1, image: '/images/product-7.jpg' },
        { id: 2, name: '經典真皮皮帶', spec: '黑色 / 110cm', price: 1980, quantity: 1, image: '/images/product-10.jpg' }
      ],
      subtotal: 10960,
      shipping: 0,
      discount: 0,
      amount: 10960,
      paymentMethod: 'credit_card',
      status: 'completed',
      createdAt: '2025-01-08 16:45:33',
      note: ''
    },
    {
      id: 5,
      orderNo: 'ORD20250108005',
      customer: '林志明',
      phone: '0956-789-012',
      address: '台南市東區東門路二段123號',
      items: [
        { id: 1, name: '都會型男樂福鞋', spec: '棕色 / 42', price: 5400, quantity: 2, image: '/images/product-5.jpg' },
        { id: 2, name: '時尚休閒運動鞋', spec: '白色 / 42', price: 3980, quantity: 1, image: '/images/product-6.jpg' }
      ],
      subtotal: 14780,
      shipping: 100,
      discount: 200,
      amount: 14680,
      paymentMethod: 'credit_card',
      status: 'completed',
      createdAt: '2025-01-08 10:30:55',
      note: ''
    },
    {
      id: 6,
      orderNo: 'ORD20250107006',
      customer: '黃建國',
      phone: '0967-890-123',
      address: '桃園市中壢區中正路88號',
      items: [
        { id: 1, name: '工裝馬丁靴', spec: '黑色 / 44', price: 7680, quantity: 1, image: '/images/product-8.jpg' }
      ],
      subtotal: 7680,
      shipping: 100,
      discount: 0,
      amount: 7780,
      paymentMethod: 'atm',
      status: 'processing',
      createdAt: '2025-01-07 18:22:11',
      note: ''
    },
    {
      id: 7,
      orderNo: 'ORD20250107007',
      customer: '吳佳玲',
      phone: '0978-901-234',
      address: '新竹市東區光復路二段101號',
      items: [
        { id: 1, name: '紳士格調經典牛津皮鞋', spec: '黑色 / 39', price: 6980, quantity: 1, image: '/images/product-1.jpg' }
      ],
      subtotal: 6980,
      shipping: 0,
      discount: 100,
      amount: 6880,
      paymentMethod: 'credit_card',
      status: 'cancelled',
      createdAt: '2025-01-07 09:15:47',
      note: '客戶取消訂單'
    }
  ]);
  
  // 篩選和搜尋
  const searchQuery = ref('');
  const filterStatus = ref('');
  const filterDateStart = ref('');
  const filterDateEnd = ref('');
  
  // 分頁
  const currentPage = ref(1);
  const pageSize = ref(10);
  
  // Modal 狀態
  const showDetailModal = ref(false);
  const selectedOrder = ref(null);
  
  // 計算訂單統計
  const orderStats = computed(() => {
    const stats = {
      pending: 0,
      processing: 0,
      shipped: 0,
      completed: 0,
      cancelled: 0
    };
    
    orders.value.forEach(order => {
      stats[order.status]++;
    });
    
    return stats;
  });
  
  // 計算過濾後的訂單
  const filteredOrders = computed(() => {
    let result = orders.value;
  
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(o => 
        o.orderNo.toLowerCase().includes(query) || 
        o.customer.toLowerCase().includes(query) ||
        o.phone.includes(query)
      );
    }
  
    if (filterStatus.value) {
      result = result.filter(o => o.status === filterStatus.value);
    }
  
    if (filterDateStart.value) {
      result = result.filter(o => o.createdAt >= filterDateStart.value);
    }
  
    if (filterDateEnd.value) {
      result = result.filter(o => o.createdAt <= filterDateEnd.value + ' 23:59:59');
    }
  
    return result;
  });
  
  // 計算分頁後的訂單
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredOrders.value.slice(start, end);
  });
  
  // 計算總頁數
  const totalPages = computed(() => {
    return Math.ceil(filteredOrders.value.length / pageSize.value);
  });
  
  // 計算起始和結束索引
  const startIndex = computed(() => {
    return (currentPage.value - 1) * pageSize.value;
  });
  
  const endIndex = computed(() => {
    return Math.min(currentPage.value * pageSize.value, filteredOrders.value.length);
  });
  
  // 計算顯示的頁碼
  const displayPages = computed(() => {
    const pages = [];
    const total = totalPages.value;
    const current = currentPage.value;
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      }
    }
    
    return pages;
  });
  
  // 格式化數字
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  // 獲取狀態樣式
  const getStatusClass = (status) => {
    const classes = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };
  
  // 獲取狀態文字
  const getStatusText = (status) => {
    const texts = {
      pending: '待處理',
      processing: '處理中',
      shipped: '已出貨',
      completed: '已完成',
      cancelled: '已取消'
    };
    return texts[status] || status;
  };
  
  // 獲取付款方式文字
  const getPaymentMethodText = (method) => {
    const methods = {
      credit_card: '信用卡',
      atm: 'ATM轉帳',
      cod: '貨到付款',
      line_pay: 'LINE Pay',
      apple_pay: 'Apple Pay'
    };
    return methods[method] || method;
  };
  
  // 更新訂單狀態
  const updateOrderStatus = (order, newStatus) => {
    if (confirm(`確定要將訂單 ${order.orderNo} 的狀態更改為「${getStatusText(newStatus)}」嗎？`)) {
      const index = orders.value.findIndex(o => o.id === order.id);
      if (index > -1) {
        orders.value[index].status = newStatus;
        alert('訂單狀態已更新');
      }
    }
  };
  
  // 查看訂單詳情
  const viewOrderDetail = (order) => {
    selectedOrder.value = order;
    showDetailModal.value = true;
  };
  
  // 關閉詳情 Modal
  const closeDetailModal = () => {
    showDetailModal.value = false;
    selectedOrder.value = null;
  };
  
  // 列印訂單
  const printOrder = (order) => {
    alert(`列印訂單：${order.orderNo}\n(此為示範功能，實際應用需整合列印功能)`);
  };
  
  // 匯出訂單
  const exportOrders = () => {
    alert(`匯出 ${filteredOrders.value.length} 筆訂單資料\n(此為示範功能，實際應用需整合匯出功能)`);
  };