<template>
  <div
    v-if="isOpen"
    :class="[
      'fixed -inset-8 z-50 flex text-sm sm:text-base',
      type === 'filter'
        ? 'justify-end items-start'
        : 'justify-center items-center',
    ]"
  >
    <div :class="['absolute inset-0  opacity-50 bg-black']"></div>

    <div
      :class="[
        'mobile-width relative bg-white rounded-lg shadow-xl',
        type === 'filter' ? 'h-5/6 mt-16 mr-10' : '',
      ]"
    >
      <!-- Modal content -->
      <div :class="modalClasses">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose, computed } from "vue";

type SizeType =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full"
  | "screen-sm"
  | "screen-md"
  | "screen-lg"
  | "screen-xl"
  | "screen-2xl";

type ModalType = "normal" | "filter";

const props = defineProps({
  size: {
    type: String as () => SizeType,
    required: false,
    default: "md",
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String as () => ModalType,
    required: false,
    default: "normal",
  },
});

const modalClasses = computed(() => {
  return ["p-4", `w-${props.size}`];
});

defineExpose({
  modalClasses,
});
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .mobile-width {
    width: 350px !important;
  }
}
</style>
