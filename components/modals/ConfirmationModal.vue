<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
  >
    <div
      class="bg-white text-black flex flex-col rounded-2xl w-full lg:w-[35%] overflow-y-auto hide-scrollbar mx-8 md:mx-20 lg:mx-60 max-h-[calc(100vh-100px)] mt-10 px-6 py-6"
    >
      <div
        class="mb-4 p-2 w-10 h-10 bg-red-100 rounded-full mx-auto flex items-center justify-center"
      >
        <img v-if="logo" :src="logo" alt="Logo" class="w-8 h-8 mx-auto" />
      </div>
      <h2 class="text-xl text-center font-semibold mb-4">{{ title }}</h2>
      <p class="mb-6 text-center text-gray-500">{{ body }}</p>

      <div class="flex justify-between space-x-4">
        <BasicButton
          @click="handleConfirm"
          :label="confirmLabel"
          class="w-[50%]"
          kind="danger"
        />
        <BasicButton
          @click="handleCancel"
          :label="cancelLabel"
          class="w-[50%]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import BasicButton from "../buttons/BasicButton.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  confirmLabel: {
    type: String,
    default: "Yes, Confirm",
  },
  cancelLabel: {
    type: String,
    default: "No, Cancel",
  },
  logo: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["confirm", "cancel"]);

const handleConfirm = () => {
  emits("confirm");
};

const handleCancel = () => {
  emits("cancel");
};
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
