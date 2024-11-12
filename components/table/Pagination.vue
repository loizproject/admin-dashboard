<template>
  <nav class="flex items-center justify-between -mt-40">
    <div class="flex items-center gap-2 rounded-lg text-sm text-[#1A1A1A]">
      Showing {{ totalCurrentItems }} of {{ totalItems }} results
    </div>
    <ul class="flex items-center gap-3 bg-whitebg rounded-lg">
      <li
        @click="handlePrevious"
        :disabled="currentPage === 1"
        :class="[
          'border border-primary px-2 py-1 rounded text-primary text-sm font-medium',
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        ]"
      >
        Previous
      </li>
      <li
        @click="handleNext"
        :disabled="currentPage === totalPages"
        :class="[
          'border border-primary px-2 py-1 rounded text-primary text-sm font-medium',
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        ]"
      >
        Next
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  totalCurrentItems: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(["pageChange"]);

const handlePrevious = () => {
  if (props.currentPage > 1) {
    emit("pageChange", props.currentPage - 1);
  }
};

const handleNext = () => {
  if (props.currentPage < props.totalPages) {
    emit("pageChange", props.currentPage + 1);
  }
};
</script>
