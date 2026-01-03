<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <!-- Logo 區域 -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Luvo</h1>
        </router-link>
        <p class="text-gray-600">加入 Luvo 會員</p>
      </div>

      <!-- 註冊表單卡片 -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2 text-center">
          會員註冊
        </h2>
        <p class="text-sm text-gray-600 text-center mb-6">
          註冊即享 NT$100 購物金
        </p>

        <!-- 錯誤訊息 -->
        <div
          v-if="errorMessage"
          class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
        >
          {{ errorMessage }}
        </div>

        <!-- 成功訊息 -->
        <div
          v-if="successMessage"
          class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm"
        >
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- 姓名 -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              姓名 <span class="text-red-600">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="請輸入真實姓名"
              required
              :class="[
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                errors.name
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-amber-500',
              ]"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              電子信箱 <span class="text-red-600">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="example@email.com"
              required
              :class="[
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                errors.email
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-amber-500',
              ]"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- 手機號碼 -->
          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              手機號碼 <span class="text-red-600">*</span>
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="0912345678"
              required
              maxlength="10"
              :class="[
                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                errors.phone
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-amber-500',
              ]"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
              {{ errors.phone }}
            </p>
          </div>

          <!-- 密碼 -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              密碼 <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="至少 6 個字元"
                required
                :class="[
                  'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.password
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-amber-500',
                ]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="!showPassword"
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
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
            <!-- 密碼強度指示器 -->
            <div v-if="form.password" class="mt-2">
              <div class="flex gap-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  :class="[
                    'h-1 flex-1 rounded-full transition-colors',
                    i <= passwordStrength
                      ? passwordStrength === 1
                        ? 'bg-red-500'
                        : passwordStrength === 2
                          ? 'bg-orange-500'
                          : passwordStrength === 3
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      : 'bg-gray-200',
                  ]"
                ></div>
              </div>
              <p class="text-xs text-gray-600 mt-1">
                密碼強度：{{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <!-- 確認密碼 -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              確認密碼 <span class="text-red-600">*</span>
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="請再次輸入密碼"
                required
                :class="[
                  'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.confirmPassword
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-amber-500',
                ]"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="!showConfirmPassword"
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
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- 生日（選填） -->
          <div>
            <label
              for="birthday"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              生日（選填）
            </label>
            <input
              id="birthday"
              v-model="form.birthday"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
            />
            <p class="mt-1 text-xs text-gray-500">
              🎁 填寫生日可於當月獲得專屬優惠
            </p>
          </div>

          <!-- 服務條款 -->
          <div>
            <label class="flex items-start cursor-pointer">
              <input
                v-model="form.agreedToTerms"
                type="checkbox"
                class="mt-1 h-4 w-4 text-amber-800 focus:ring-amber-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">
                我已閱讀並同意
                <router-link
                  to="/terms"
                  class="text-amber-800 hover:text-amber-900"
                >
                  服務條款
                </router-link>
                和
                <router-link
                  to="/privacy"
                  class="text-amber-800 hover:text-amber-900"
                >
                  隱私政策
                </router-link>
                <span class="text-red-600">*</span>
              </span>
            </label>
            <p v-if="errors.agreedToTerms" class="mt-1 text-sm text-red-600">
              {{ errors.agreedToTerms }}
            </p>
          </div>

          <!-- 電子報訂閱 -->
          <div>
            <label class="flex items-start cursor-pointer">
              <input
                v-model="form.subscribeNewsletter"
                type="checkbox"
                class="mt-1 h-4 w-4 text-amber-800 focus:ring-amber-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">
                訂閱電子報，接收最新優惠與新品資訊
              </span>
            </label>
          </div>

          <!-- 註冊按鈕 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-amber-800 text-white font-bold rounded-lg hover:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ loading ? "註冊中..." : "立即註冊" }}
          </button>
        </form>

        <!-- 登入連結 -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            已經是會員了？
            <router-link
              to="/login"
              class="font-medium text-amber-800 hover:text-amber-900"
            >
              立即登入
            </router-link>
          </p>
        </div>
      </div>

      <!-- 返回首頁 -->
      <div class="mt-4 text-center">
        <router-link
          to="/"
          class="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回首頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 表單資料
const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  birthday: "",
  agreedToTerms: false,
  subscribeNewsletter: false,
});

// 錯誤訊息
const errors = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: "",
});

const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 密碼強度計算
const passwordStrength = computed(() => {
  const password = form.password;
  if (!password) return 0;

  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password) && /[!@#$%^&*]/.test(password)) strength++;

  return strength;
});

const passwordStrengthText = computed(() => {
  const texts = ["", "弱", "中等", "良好", "強"];
  return texts[passwordStrength.value];
});

// 表單驗證
const validateForm = () => {
  let isValid = true;

  // 清空錯誤訊息
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  errorMessage.value = "";

  // 姓名驗證
  if (!form.name.trim()) {
    errors.name = "請輸入姓名";
    isValid = false;
  } else if (form.name.trim().length < 2) {
    errors.name = "姓名至少需要 2 個字";
    isValid = false;
  }

  // Email 驗證
  if (!form.email) {
    errors.email = "請輸入電子信箱";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "電子信箱格式不正確";
    isValid = false;
  }

  // 手機驗證
  if (!form.phone) {
    errors.phone = "請輸入手機號碼";
    isValid = false;
  } else if (!/^09\d{8}$/.test(form.phone)) {
    errors.phone = "手機號碼格式不正確（例如：0912345678）";
    isValid = false;
  }

  // 密碼驗證
  if (!form.password) {
    errors.password = "請輸入密碼";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "密碼至少需要 6 個字元";
    isValid = false;
  }

  // 確認密碼驗證
  if (!form.confirmPassword) {
    errors.confirmPassword = "請再次輸入密碼";
    isValid = false;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "兩次輸入的密碼不一致";
    isValid = false;
  }

  // 服務條款驗證
  if (!form.agreedToTerms) {
    errors.agreedToTerms = "請閱讀並同意服務條款";
    isValid = false;
  }

  return isValid;
};

// 處理註冊
const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    // TODO: 實際的註冊 API 呼叫
    // await userStore.register(form)

    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 模擬註冊成功
    successMessage.value = "註冊成功！即將跳轉至登入頁面...";

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    errorMessage.value = error.message || "註冊失敗，請稍後再試";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* 自訂樣式 */
</style>
