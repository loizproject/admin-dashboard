<template>
  <div
    class="fixed -top-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
    @click.self="$emit('close')"
  >
    <div
      :class="{
        'bg-white text-black flex flex-col rounded-2xl w-full overflow-y-auto hide-scrollbar mx-8 md:w-[600px] max-h-[calc(100vh-50px)] lg:px-6 lg:py-4 mt-5': kind === 'Normal',
        'w-full lg:w-[35%]': kind === 'Blank',
      }"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: Boolean,
  kind: {
    type: String,
    default: 'Normal',
  },
});
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
