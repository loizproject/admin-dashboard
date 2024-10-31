<template>
    <div class="w-full">
      <div class="flex justify-between w-full bg-white">
        <div class="w-full">
          <div class="flex w-full">
            <button
              class=""
              v-for="(button, index) in buttons"
              :key="index"
              :class="[
                'mx-2',
                activeButton === index
                  ? ' text-header  rounded-full'
                  : 'text-bodytext py-2.5',
              ]"
              @click="toggleContent(index)"
            >
              {{ button.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="mt-5 md:p-4">
        <component :is="activeComponent" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, defineProps } from "vue";
  
  // Define the type for each button in the array
  interface Button {
    label: string;
    component: any; // Adjust the type according to the type of components expected
  }
  
  const activeButton = ref(0);
  
  const toggleContent = (index: number) => {
    activeButton.value = index;
  };
  
  // Define the type for the props
  const props = defineProps<{
    buttons: Button[];
  }>();
  
  const activeComponent = computed(() => {
    return props.buttons[activeButton.value].component;
  });
  </script>
  