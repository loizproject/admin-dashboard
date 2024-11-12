<!-- Toast.vue -->
<template>
  <div
    v-if="isToastVisible"
    class="fixed z-50 top-4 right-4 flex space-x-3 text-white p-4 rounded shadow-md transform transition-transform duration-300 ease-out opacity-100 ml-10"
    :class="[
      'toast',
      {
        'bg-red-500': message.type === 'error',
        'bg-green-500': message.type === 'success',
        'bg-blue-400': message.type === 'info',
      },
    ]"
  >
    <div class="flex space-x-3">
      <p class="min-w-[250px] md:min-w-[400px] lg:max-w-[700px]">
        {{ message.text }}
      </p>
      <button
        @click="clearMessage"
        class="text-white hover:text-gray-300 focus:outline-none"
      >
        &#10006;
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from "~/stores/toast";

const toastStore = useToastStore();
const message = toastStore.message;
const isToastVisible = toastStore.isToastVisible;

const clearMessage = () => {
  toastStore.clearMessage();
};
</script>
