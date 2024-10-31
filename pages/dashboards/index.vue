<template>
  <div></div>
</template>

<script setup>
import { onBeforeMount } from "vue";

const router = useRouter();

onBeforeMount(() => {
  router.push("/dashboards/dashboard");
});
</script>
