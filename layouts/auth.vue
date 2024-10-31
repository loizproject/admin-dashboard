<template>
  <div class="flex flex-col w-full h-screen justify-center items-center p-6 ">
    <main
      class="w-full flex flex-col justify-center sm:w-[400px] border border-border self-center p-6"
    >
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
