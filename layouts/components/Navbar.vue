<template>
  <div
    class="w-full flex fixed justify-between items-center px-2 shadow-sm border-b top-0 left-0 right-0 z-30 bg-white"
  >
    <div class="flex items-center cursor-pointer ml-8 lg:ml-0">
      <i class="mdi mdi-chevron-left text-3xl text-[#555555]"></i>
      <a
        href="https://loiztravels.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm"
      >
        <p>Back to Home</p>
      </a>
    </div>
    <div class="flex items-center space-x-4 mr-4">
      <div
        class="w-8 h-8 border rounded-full flex justify-center items-center border-[#F585C7]"
      >
        <i class="mdi mdi-bell-outline"></i>
      </div>
      <div class="flex items-center space-x-2">
        <img src="~/assets/images/profile.svg" alt="" class="w-10" />
        <div class="flex items-center cursor-pointer">
          <p>{{ user?.user?.firstName + " " + user?.user?.lastName }}</p>
          <i class="mdi mdi-chevron-down mt-0.5 text-lg"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const loading = ref(false);
const user = ref(null);
user.value = authStore.user;

watch(
  () => authStore.user,
  (newUser) => {
    user.value = newUser;
  }
);

const fetchUser = async () => {
  loading.value = true;
  try {
    await authStore.getUser();
    user.value = authStore.user;
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUser();
});
</script>
