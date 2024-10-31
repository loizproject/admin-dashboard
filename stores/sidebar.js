import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
  const isVisible = ref(false);
  const activeDropdown = ref(null);

  function toggle() {
    isVisible.value = !isVisible.value;
  }

  function toggleDropdown(index) {
    activeDropdown.value = activeDropdown.value === index ? null : index;
  }

  function show() {
    isVisible.value = true;
  }

  function hide() {
    isVisible.value = false;
  }

  return {
    isVisible,
    activeDropdown,
    toggle,
    toggleDropdown,
    show,
    hide,
  };
});
