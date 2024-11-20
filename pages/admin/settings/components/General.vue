<template>
  <div>
    <div class="space-y-3">
      <h1 class="text-lg font-semibold text-header">General settings</h1>
      <p class="text-header text-sm">
        Update your account and how people can contact you generally.
      </p>
    </div>
    <div
      class="space-y-6 bg-white rounded-lg px-4 mt-8 flex justify-between items-start"
    >
      <div class="w-[48%] my-6">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-header">Profile details</p>
          <div
            class="flex items-center justify-center space-x-2 w-[90px] text-primary text-sm cursor-pointer px-2 py-1.5 rounded-xl bg-transparent border border-transparent"
            style="
              background: linear-gradient(#fff, #fff) padding-box,
                linear-gradient(to right, #4e9cff, #ff0a8e) border-box;
            "
          >
            <i class="mdi mdi-pencil"></i>
            <p>Edit</p>
          </div>
        </div>
        <div class="space-y-8 my-6">
          <div>
            <label for="fullname" class="text-sm text-header">Fullname</label>
            <input
              type="text"
              class="w-full border-b border-gray-200 focus:outline-none text-sm text-header font-semibold placeholder:text-header"
              :placeholder="`${user?.user?.firstName} ${user?.user?.lastName}`"
            />
          </div>
          <div>
            <label for="Email address" class="text-sm text-header"
              >Email address</label
            >
            <input
              type="text"
              class="w-full border-b border-gray-200 focus:outline-none text-sm text-header font-semibold placeholder:text-header cursor-not-allowed"
              :placeholder="user?.user?.email"
              readonly
            />
          </div>
          <div>
            <label for="Home address" class="text-sm text-header"
              >Home address</label
            >
            <input
              type="text"
              class="w-full border-b border-gray-200 focus:outline-none text-sm text-header font-semibold placeholder:text-header"
              placeholder=""
            />
          </div>
        </div>
      </div>
      <div class="border-l border-gray-200 w-[2px] h-[400px]"></div>
      <div class="w-[48%] my-6">
        <p class="font-semibold text-header">Help and Support</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const user = ref(null);
user.value = authStore.user;
</script>
