import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductStore = defineStore("product", () => {
  // ============ State ============
  const products = ref([]);
  const categories = ref([]);
  const isLoading = ref(false);
  const searchQuery = ref("");
  const recentlyViewed = ref([]);

  // ============ Getters ============

  // 熱門商品（根據評價數量）
  const popularProducts = computed(() => {
    return [...products.value]
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      .slice(0, 10);
  });

  // 新品（最近 30 天內上架）
  const newProducts = computed(() => {
    return products.value.filter((p) => p.isNew).slice(0, 10);
  });

  // 折扣商品
  const discountedProducts = computed(() => {
    return products.value.filter((p) => p.discount > 0);
  });

  // 搜尋結果
  const searchResults = computed(() => {
    if (!searchQuery.value.trim()) return [];

    const query = searchQuery.value.toLowerCase();
    return products.value.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  });

  // 依分類分組的商品
  const productsByCategory = computed(() => {
    const grouped = {};
    products.value.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  });

  // ============ Actions ============

  // 載入所有商品
  const fetchProducts = async () => {
    if (products.value.length > 0) return products.value;

    isLoading.value = true;

    try {
      // 模擬 API 請求
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模擬商品資料
      products.value = generateMockProducts();

      return products.value;
    } catch (error) {
      console.error("載入商品失敗:", error);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // 根據 ID 取得商品
  const getProductById = async (id) => {
    // 先從現有資料中查找
    let product = products.value.find((p) => p.id === parseInt(id));

    if (product) {
      // 加入最近瀏覽
      addToRecentlyViewed(product);
      return product;
    }

    // 如果找不到，嘗試載入所有商品
    await fetchProducts();
    product = products.value.find((p) => p.id === parseInt(id));

    if (product) {
      addToRecentlyViewed(product);
    }

    return product;
  };

  // 根據分類取得商品
  const getProductsByCategory = async (category) => {
    await fetchProducts();
    return products.value.filter((p) => p.category === category);
  };

  // 搜尋商品
  const searchProducts = async (query) => {
    searchQuery.value = query;

    if (!query.trim()) return [];

    await fetchProducts();
    return searchResults.value;
  };

  // 清除搜尋
  const clearSearch = () => {
    searchQuery.value = "";
  };

  // ============ 最近瀏覽 ============

  // 加入最近瀏覽
  const addToRecentlyViewed = (product) => {
    // 移除重複的
    const index = recentlyViewed.value.findIndex((p) => p.id === product.id);
    if (index > -1) {
      recentlyViewed.value.splice(index, 1);
    }

    // 加到最前面
    recentlyViewed.value.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      category: product.category,
      viewedAt: new Date().toISOString(),
    });

    // 最多保留 20 個
    if (recentlyViewed.value.length > 20) {
      recentlyViewed.value = recentlyViewed.value.slice(0, 20);
    }

    saveRecentlyViewed();
  };

  // 清空最近瀏覽
  const clearRecentlyViewed = () => {
    recentlyViewed.value = [];
    localStorage.removeItem("recentlyViewed");
  };

  // ============ 商品比較 ============

  const compareList = ref([]);

  // 加入比較
  const addToCompare = (product) => {
    if (compareList.value.length >= 4) {
      return { success: false, message: "最多只能比較 4 個商品" };
    }

    if (compareList.value.some((p) => p.id === product.id)) {
      return { success: false, message: "商品已在比較清單中" };
    }

    compareList.value.push(product);
    saveCompareList();
    return { success: true, message: "已加入比較" };
  };

  // 從比較中移除
  const removeFromCompare = (productId) => {
    const index = compareList.value.findIndex((p) => p.id === productId);
    if (index > -1) {
      compareList.value.splice(index, 1);
      saveCompareList();
      return { success: true };
    }
    return { success: false };
  };

  // 清空比較
  const clearCompare = () => {
    compareList.value = [];
    localStorage.removeItem("compareList");
  };

  // ============ 評價功能 ============

  // 新增評價
  const addReview = async (productId, review) => {
    const product = products.value.find((p) => p.id === productId);
    if (!product) return { success: false, error: "商品不存在" };

    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!product.reviews) {
      product.reviews = [];
    }

    const newReview = {
      id: Date.now(),
      userId: 1,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      images: review.images || [],
      createdAt: new Date().toISOString(),
      helpful: 0,
    };

    product.reviews.push(newReview);
    product.reviewCount = (product.reviewCount || 0) + 1;

    // 重新計算平均評分
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / product.reviews.length;

    return { success: true, review: newReview };
  };

  // 評價按「有用」
  const markReviewHelpful = async (productId, reviewId) => {
    const product = products.value.find((p) => p.id === productId);
    if (!product || !product.reviews) return { success: false };

    const review = product.reviews.find((r) => r.id === reviewId);
    if (!review) return { success: false };

    review.helpful = (review.helpful || 0) + 1;
    return { success: true };
  };

  // ============ 篩選和排序 ============

  // 應用多個篩選條件
  const filterProducts = (options = {}) => {
    let result = [...products.value];

    // 分類篩選
    if (options.category) {
      result = result.filter((p) => p.category === options.category);
    }

    // 價格範圍篩選
    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      result = result.filter((p) => {
        const price = p.discount ? p.price * (1 - p.discount / 100) : p.price;

        if (options.minPrice !== undefined && price < options.minPrice)
          return false;
        if (options.maxPrice !== undefined && price > options.maxPrice)
          return false;
        return true;
      });
    }

    // 評分篩選
    if (options.minRating) {
      result = result.filter((p) => (p.rating || 0) >= options.minRating);
    }

    // 庫存篩選
    if (options.inStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // 折扣篩選
    if (options.onSale) {
      result = result.filter((p) => p.discount > 0);
    }

    // 新品篩選
    if (options.isNew) {
      result = result.filter((p) => p.isNew);
    }

    // 排序
    if (options.sortBy) {
      switch (options.sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "popular":
          result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
          break;
        case "newest":
          result.sort((a, b) => b.id - a.id);
          break;
      }
    }

    return result;
  };

  // ============ 本地儲存 ============

  const saveRecentlyViewed = () => {
    try {
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(recentlyViewed.value)
      );
    } catch (error) {
      console.error("儲存瀏覽記錄失敗:", error);
    }
  };

  const loadRecentlyViewed = () => {
    try {
      const saved = localStorage.getItem("recentlyViewed");
      if (saved) {
        recentlyViewed.value = JSON.parse(saved);
      }
    } catch (error) {
      console.error("載入瀏覽記錄失敗:", error);
    }
  };

  const saveCompareList = () => {
    try {
      localStorage.setItem("compareList", JSON.stringify(compareList.value));
    } catch (error) {
      console.error("儲存比較清單失敗:", error);
    }
  };

  const loadCompareList = () => {
    try {
      const saved = localStorage.getItem("compareList");
      if (saved) {
        compareList.value = JSON.parse(saved);
      }
    } catch (error) {
      console.error("載入比較清單失敗:", error);
    }
  };

  // ============ 生成模擬資料 ============

  const generateMockProducts = () => {
    return [
      {
        id: 1,
        name: "【Luvo】紳士格調經典牛津皮鞋",
        price: 6980,
        category: "leather-shoes",
        icon: "👞",
        rating: 4.8,
        reviewCount: 128,
        isNew: true,
        stock: 10,
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["#000000", "#8B4513"],
        description: "採用頂級牛皮製作，經典牛津鞋設計，適合正式場合穿著。",
        features: ["真皮材質", "手工縫製", "防滑鞋底", "透氣內襯"],
        reviews: [],
      },
      {
        id: 2,
        name: "【Luvo】摩登時尚簡約牛津皮鞋",
        price: 4980,
        discount: 15,
        category: "leather-shoes",
        icon: "👞",
        rating: 4.5,
        reviewCount: 89,
        stock: 15,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["#000000", "#6F4E37"],
        description: "簡約設計，適合日常穿搭，舒適透氣。",
        features: ["牛皮材質", "輕量設計", "減震鞋墊", "耐磨鞋底"],
        reviews: [],
      },
      {
        id: 3,
        name: "【Luvo】復古風範雕花牛津皮鞋",
        price: 7980,
        category: "leather-shoes",
        icon: "👞",
        rating: 4.9,
        reviewCount: 156,
        isNew: true,
        stock: 8,
        sizes: ["39", "40", "41", "42"],
        colors: ["#8B4513", "#6F4E37"],
        description: "精緻雕花設計，展現復古優雅風格。",
        features: ["手工雕花", "進口牛皮", "舒適鞋墊", "經典款式"],
        reviews: [],
      },
      {
        id: 4,
        name: "【Luvo】商務正裝德比皮鞋",
        price: 5980,
        category: "leather-shoes",
        icon: "👞",
        rating: 4.6,
        reviewCount: 74,
        stock: 12,
        sizes: ["40", "41", "42", "43"],
        colors: ["#000000"],
        description: "經典德比設計，商務首選。",
        features: ["真皮材質", "透氣設計", "舒適好穿", "專業形象"],
        reviews: [],
      },
      {
        id: 5,
        name: "【Luvo】紳士樂福休閒皮鞋",
        price: 4580,
        discount: 20,
        category: "leather-shoes",
        icon: "👞",
        rating: 4.7,
        reviewCount: 92,
        stock: 20,
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["#8B4513", "#1E3A8A"],
        description: "無鞋帶設計，穿脫便利，休閒舒適。",
        features: ["樂福設計", "柔軟皮革", "記憶鞋墊", "防滑鞋底"],
        reviews: [],
      },
      {
        id: 6,
        name: "【Luvo】經典百搭孟克鞋",
        price: 6580,
        category: "leather-shoes",
        icon: "👞",
        rating: 4.4,
        reviewCount: 63,
        stock: 18,
        sizes: ["40", "41", "42", "43"],
        colors: ["#000000", "#8B4513", "#7F1D1D"],
        description: "孟克扣設計，獨特個性風格。",
        features: ["金屬扣設計", "真皮材質", "舒適內裡", "時尚百搭"],
        reviews: [],
      },
      {
        id: 7,
        name: "【Luvo】時尚切爾西靴",
        price: 8980,
        category: "boots",
        icon: "🥾",
        rating: 4.8,
        reviewCount: 142,
        isNew: true,
        stock: 10,
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["#000000", "#8B4513"],
        description: "經典切爾西靴，時尚與舒適兼具。",
        features: ["彈性鞋口", "真皮材質", "防水處理", "厚底增高"],
        reviews: [],
      },
      {
        id: 8,
        name: "【Luvo】工裝風馬丁靴",
        price: 7580,
        category: "boots",
        icon: "🥾",
        rating: 4.7,
        reviewCount: 108,
        stock: 15,
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["#000000", "#6F4E37"],
        description: "硬朗工裝風格，耐穿好搭。",
        features: ["厚底設計", "耐磨材質", "綁帶固定", "防滑鞋底"],
        reviews: [],
      },
      {
        id: 9,
        name: "【Luvo】輕量運動休閒鞋",
        price: 3980,
        discount: 25,
        category: "casual-shoes",
        icon: "👟",
        rating: 4.5,
        reviewCount: 215,
        stock: 30,
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["#000000", "#1E3A8A", "#6F4E37"],
        description: "輕量透氣，適合日常運動休閒。",
        features: ["透氣網布", "輕量設計", "減震科技", "耐磨外底"],
        reviews: [],
      },
    ];
  };

  // ============ 初始化 ============

  loadRecentlyViewed();
  loadCompareList();

  // ============ Return ============

  return {
    // State
    products,
    categories,
    isLoading,
    searchQuery,
    recentlyViewed,
    compareList,

    // Getters
    popularProducts,
    newProducts,
    discountedProducts,
    searchResults,
    productsByCategory,

    // Actions
    fetchProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    clearSearch,
    addToRecentlyViewed,
    clearRecentlyViewed,
    addToCompare,
    removeFromCompare,
    clearCompare,
    addReview,
    markReviewHelpful,
    filterProducts,
  };
});
