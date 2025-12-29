<template>
  <component
    :is="tag"
    class="base-card bg-white overflow-hidden transition-all duration-300"
    :class="[
      shadowClasses,
      hoverClasses,
      roundedClasses,
      paddingClasses,
      borderClasses,
      { 'cursor-pointer': clickable },
    ]"
    @click="handleClick"
  >
    <!-- 卡片圖片區域（可選） -->
    <div
      v-if="$slots.image || imageSrc"
      class="overflow-hidden"
      :class="imageWrapperClass"
    >
      <slot name="image">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </slot>
    </div>

    <!-- 右上角標記 -->
    <div v-if="$slots.badge" class="absolute top-3 right-3 z-10">
      <slot name="badge"></slot>
    </div>

    <!-- 卡片內容區域 -->
    <div :class="contentClass">
      <!-- 卡片頭部 -->
      <div v-if="$slots.header || title" class="mb-3">
        <slot name="header">
          <h3 v-if="title" class="text-lg font-semibold text-gray-900">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-sm text-gray-500 mt-1">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <!-- 卡片主要內容 -->
      <div class="card-body">
        <slot></slot>
      </div>

      <!-- 卡片底部 -->
      <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-100">
        <slot name="footer"></slot>
      </div>
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  tag: {
    type: String,
    default: "div",
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  imageSrc: {
    type: String,
    default: "",
  },
  imageAlt: {
    type: String,
    default: "",
  },
  shadow: {
    type: String,
    default: "md",
    validator: (value) => ["none", "sm", "md", "lg", "xl"].includes(value),
  },
  hover: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: String,
    default: "lg",
    validator: (value) => ["none", "sm", "md", "lg", "xl"].includes(value),
  },
  padding: {
    type: String,
    default: "md",
    validator: (value) => ["none", "sm", "md", "lg"].includes(value),
  },
  border: {
    type: Boolean,
    default: false,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  imageWrapperClass: {
    type: String,
    default: "",
  },
  contentClass: {
    type: String,
    default: "p-4",
  },
});

const emit = defineEmits(["click"]);

const shadowClasses = computed(() => {
  const shadows = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };
  return shadows[props.shadow];
});

const hoverClasses = computed(() => {
  return props.hover ? "hover:shadow-xl hover:-translate-y-1" : "";
});

const roundedClasses = computed(() => {
  const rounded = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };
  return rounded[props.rounded];
});

const paddingClasses = computed(() => {
  if (props.padding === "none") return "";

  // 只在沒有圖片時才套用 padding
  if (!props.imageSrc && !props.$slots.image) {
    const paddings = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };
    return paddings[props.padding];
  }
  return "";
});

const borderClasses = computed(() => {
  return props.border ? "border border-gray-200" : "";
});

const handleClick = (event) => {
  if (props.clickable) {
    emit("click", event);
  }
};
</script>

<style scoped>
.base-card {
  position: relative;
}
</style>
