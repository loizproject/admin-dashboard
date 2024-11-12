<template>
  <div
    v-if="isToastVisible"
    class="fixed z-50 top-4 right-4 flex space-x-3 shadow-lg text-white p-4 rounded-lg transform transition-transform duration-300 ease-out opacity-100 border-l-4 ml-4"
    :class="[
      'toast',
      {
        'bg-red-50 border-red-500 ': message.type === 'error',
        'bg-green-50 border-green-500': message.type === 'success',
      },
    ]"
  >
    <div class="flex items-start space-x-3">
      <p
        :class="[
          message.type === 'error' ? 'text-red-500' : 'text-green-500',
          'w-full min-w-[200px] md:max-w-[500px] lg:max-w-[800px]',
        ]"
      >
        {{ message.text }}
      </p>
      <button
        @click="clearMessage"
        :class="[
          message.type === 'error' ? 'text-red-500' : 'text-green-500',
          ' hover:opacity-80 focus:outline-none',
        ]"
      >
        &#10006;
      </button>
    </div>
  </div>
  <!-- </transition> -->
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
