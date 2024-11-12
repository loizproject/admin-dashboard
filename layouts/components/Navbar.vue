<template>
  <div
    class="w-full flex fixed justify-between items-center px-2 shadow-sm border-b top-0 left-0 right-0 z-30 bg-white text-header"
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
        <div @click="toggleDropDown()" class="flex items-center cursor-pointer">
          <p>{{ user?.user?.firstName + " " + user?.user?.lastName }}</p>
          <i class="mdi mdi-chevron-down mt-0.5 text-lg"></i>
          <div
            v-show="dropDown"
            class="p-4 rounded shadow-md absolute top-14 right-2 z-20 bg-white border w-[300px]"
          >
            <div class="flex justify-between items-center">
              <p v-if="user" class="text-lg font-bold">
                {{ user?.user?.firstName + " " + user?.user?.lastName }}
              </p>
              <Button
                type="submit"
                size="md"
                label="Sign out"
                kind="primary-round"
                class="w-[100px]"
                @click="logout()"
              />
            </div>
            <div class="h-[1px] w-full bg-gradient-bg mt-2"></div>
            <div class="mt-4 space-y-4">
              <div class="flex justify-between items-center cursor-pointer">
                <p>Notifications</p>
                <div
                  class="w-6 h-8 border rounded-full flex justify-center items-center border-[#F585C7]"
                >
                  0
                </div>
              </div>
              <p class="cursor-pointer">Account Setting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
import Button from "~/components/buttons/BasicButton.vue";
const loading = ref(false);
const user = ref(null);
user.value = authStore.user;
const router = useRouter();
const dropDown = ref(false);

const toggleDropDown = () => {
  dropDown.value = !dropDown.value;
};

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

const logout = () => {
  authStore.logout();
  router.push("/auth/login");
};

onMounted(() => {
  fetchUser();
});
</script>
