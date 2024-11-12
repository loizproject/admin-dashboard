<template>
  <div></div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  if (authStore.role === "customer") {
    router.push("/user");
  } else {
    router.push("/admin/dashboard");
  }
});
</script>
