<!-- layouts/auth.vue -->
<template>
  <div class="">
    <Navbar class="h-[50px]" />
    <div class="lg:flex lg:justify-between">
      <Sidebar />
      <div class="h-full lg:w-[calc(100%-230px)] pt-[50px]">
        <div class="bg-bodybg">
          <slot></slot>
        </div>
      </div>
    </div>
    <Toast v-if="showToast" />
    <Loading />
  </div>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Toast from "~/components/toast/Toast.vue";
import Loading from "~/components/loaders/Loading.vue";
import { useToastStore } from "~/stores/toast";

const toastStore = useToastStore();

const showToast = ref(false);

watchEffect(() => {
  showToast.value = toastStore.message !== null;
});
</script>
