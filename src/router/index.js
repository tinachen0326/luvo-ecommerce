import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Luvo 履藝 | 首頁" },
  },
  {
    path: "/products/:category",
    name: "Products",
    component: () => import("../views/Products/ProductList.vue"),
    meta: { title: "商品列表 | Luvo 履藝" },
  },
  // 其他路由暫時註解，等頁面做好再開啟
  /* 
  {
    path: '/new-member',
    name: 'NewMember',
    component: () => import('../views/NewMember.vue'),
    meta: { title: '新會員首購禮 | Luvo 履藝' }
  },
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('../views/Brand.vue'),
    meta: { title: '品牌專屬優惠 | Luvo 履藝' }
  },
  {
    path: '/discount',
    name: 'Discount',
    component: () => import('../views/Discount.vue'),
    meta: { title: '買2送1 | Luvo 履藝' }
  },
  {
    path: '/products/:category',
    name: 'Products',
    component: () => import('../views/Products/ProductList.vue'),
    meta: { title: '商品列表 | Luvo 履藝' }
  },
  {
    path: '/products/:category/:id',
    name: 'ProductDetail',
    component: () => import('../views/Products/ProductDetail.vue'),
    meta: { title: '商品詳情 | Luvo 履藝' }
  },
  {
    path: '/accessories/:type',
    name: 'Accessories',
    component: () => import('../views/Accessories.vue'),
    meta: { title: '生活配件 | Luvo 履藝' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: { title: '購物車 | Luvo 履藝' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/User/Login.vue'),
    meta: { title: '登入 | Luvo 履藝' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/User/Register.vue'),
    meta: { title: '註冊 | Luvo 履藝' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/User/Profile.vue'),
    meta: { title: '會員中心 | Luvo 履藝', requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/User/Orders.vue'),
    meta: { title: '我的訂單 | Luvo 履藝', requiresAuth: true }
  },
  {
    path: '/coupons',
    name: 'Coupons',
    component: () => import('../views/User/Coupons.vue'),
    meta: { title: '我的優惠券 | Luvo 履藝', requiresAuth: true }
  },
  {
    path: '/stores',
    name: 'Stores',
    component: () => import('../views/Stores.vue'),
    meta: { title: '門市查詢 | Luvo 履藝' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
    meta: { title: '結帳 | Luvo 履藝', requiresAuth: true }
  }
  */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 路由守衛
router.beforeEach((to, from, next) => {
  // 設置頁面標題
  document.title = to.meta.title || "Luvo 履藝";

  // 檢查是否需要登入
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
