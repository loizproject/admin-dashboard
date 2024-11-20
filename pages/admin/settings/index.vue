<template>
  <div class="p-6 text-header text-lg min-h-screen">
    <div class="flex justify-between items-center">
      <div class="space-y-4">
        <h1 class="text-2xl">Settings</h1>
      </div>
    </div>
    <div class="mt-5">
      <ButtonSwitch :buttons="buttons" />
    </div>
  </div>
</template>
<script setup>
import ButtonSwitch from "~/components/buttons/ButtonSwitch.vue";
import General from "./components/General.vue";
import Profile from "./components/Profile.vue";
import Security from "./components/Security.vue";

const buttons = [
  { label: "General", component: General },
  { label: "Profile", component: Profile },
  { label: "Security", component: Security },
];
</script>
