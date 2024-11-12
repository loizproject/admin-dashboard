import { defineStore } from "pinia";
import { ref } from "vue";

export const useStepsStore = defineStore("steps", () => {
  const count = ref(0);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const setStep = (step) => count.value = step; // Add this method

  return { count, increment, decrement, setStep };
});
