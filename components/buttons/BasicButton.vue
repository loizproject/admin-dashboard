<template>
  <button
    v-bind="$attrs"
    class="shadow-sm"
    :class="[sizeClasses, typeClasses, props.className]"
    :disabled="loading"
  >
    <div v-if="loading" role="status" class="w-full flex justify-center gap-2">
      <svg
        aria-hidden="true"
        class="inline animate-spin"
        :class="[loaderClass]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
      <span>Loading...</span>
    </div>
    <span v-else class="flex items-center space-x-1">
      <!-- Render icon before or after label based on iconPosition prop -->
      <span v-if="icon && iconPosition === 'before'" class="icon-before">
        <img :src="icon" alt="Icon" class="icon-image"
      /></span>
      <span v-if="label">{{ label }}</span>
      <span v-if="icon && iconPosition === 'after'" class="icon-after">
        <img :src="icon" alt="Icon" class="icon-image"
      /></span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type SizeTypes = "xs" | "sm" | "md" | "lg" | "xl";
type KindTypes =
  | "primary-round"
  | "primary-square"
  | "border"
  | "grey"
  | "danger"
  | "dark"
  | "current"
  | "disabled-square"
  | "disabled-round";
type IconPosition = "before" | "after";

const props = defineProps({
  size: {
    type: String as () => SizeTypes,
    required: false,
    default: "md",
  },
  label: {
    type: String,
    required: false,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  kind: {
    type: String as () => KindTypes,
    required: false,
    default: "primary",
  },
  loaderClass: {
    type: String,
    required: false,
    default: "w-4 h-4 text-gray-200 fill-primary",
  },
  className: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  iconPosition: {
    type: String as () => IconPosition, // Assign IconPosition type to iconPosition prop
    required: false,
    default: "before", // Set default value to 'before'
  },
});

const sizeClasses = computed((): string => {
  let result: string = "";
  switch (props.size) {
    case "xs":
      result = "px-2 py-1.5 text-xs";
      break;
    case "sm":
      result = "px-2 py-1.5 text-sm";
      break;
    case "md":
      result = "text-sm px-5 py-2.5";
      break;
    case "lg":
      result = "px-5 py-3 text-base";
      break;
    case "xl":
      result = "text-base px-6 py-3.5";
      break;

    default:
      break;
  }

  return result;
});

const typeClasses = computed((): string => {
  let result: string = "";
  switch (props.kind) {
    case "primary-round":
      result =
        "bg-primary text-white rounded-full flex justify-center hover:opacity-90";
      break;
    case "primary-square":
      result =
        "bg-primary text-white rounded-lg flex justify-center hover:opacity-90";
      break;
    case "border":
      result =
        "border border-primary text-primary rounded-lg flex justify-center";
      break;
    case "grey":
      result =
        "border border-dimgrey text-header rounded-lg flex justify-center onfocus:border-primary";
      break;
    case "danger":
      result =
        "text-error border border-error rounded-lg flex justify-center hover:opacity-90";
      break;
    case "current":
      result = "bg-[#02B15614] text-primary rounded-lg flex justify-center";
      break;
    case "disabled-square":
      result =
        "bg-primary text-white rounded-lg flex justify-center hover:opacity-90 bg-opacity-50 cursor-not-allowed";
      break;
    case "disabled-round":
      result =
        "bg-primary text-white rounded-full flex justify-center hover:opacity-90 bg-opacity-50 cursor-not-allowed";
      break;

    default:
      break;
  }

  return result;
});
</script>
