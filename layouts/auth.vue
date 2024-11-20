<template>
  <div
    class="flex flex-col w-full min-h-screen relative justify-center items-center p-6 bg-bodybg"
  >
    <header
      class="absolute top-3 w-full h-20 flex justify-between items-center p-8"
    >
      <img src="~/assets/images/logo.svg" alt="" class="w-48" />
      <div
        class="flex items-center space-x-2 text-primary text-sm cursor-pointer p-2 rounded-lg bg-transparent border border-transparent"
        style="
          background: linear-gradient(#fef3f9, #fef3f9) padding-box,
            linear-gradient(to right, #4e9cff, #ff0a8e) border-box;
        "
      >
        <p>Visit Website</p>
        <i class="mdi mdi-arrow-top-right"></i>
      </div>
    </header>
    <main class="flex flex-col justify-center self-center p-6 w-[400px]">
      <slot></slot>
    </main>

    <Toast v-if="showToast" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
// import AuthSidebar from "./components/AuthSidebar.vue";
import Toast from "~/components/toast/Toast.vue";
import { useToastStore } from "~/stores/toast";

const route = useRoute();
const isLoginRoute = ref(route.path === "/auth/login");

watchEffect(() => {
  isLoginRoute.value = route.path === "/auth/login";
});

const toastStore = useToastStore();
const showToast = ref(false);

watchEffect(() => {
  showToast.value = toastStore.message !== null;
});
</script>
