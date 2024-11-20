<template>
  <div>
    <div class="space-y-3">
      <h1 class="text-lg font-semibold text-header">Security</h1>
      <p class="text-header text-sm">
        Update login settings and devices connected to your account
      </p>
    </div>
    <div
      class="space-y-6 bg-white rounded-lg px-4 mt-8 flex justify-between items-start"
    >
      <div class="w-[48%] my-6 space-y-16">
        <div>
          <div class="flex justify-between items-center">
            <p class="font-semibold text-header">Login</p>
          </div>
          <div class="space-y-8 my-6">
            <div>
              <label for="fullname" class="text-sm text-header"
                >Current Password</label
              >
              <div class="flex items-center pr-20 space-x-16 mt-3">
                <input
                  type="text"
                  class="w-full border p-3 border-gray-200 focus:outline-none text-sm text-header font-semibold placeholder:text-header rounded-xl"
                  placeholder="*************"
                />
                <p class="text-primary underline text-sm cursor-pointer">
                  Change
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center">
            <p class="font-semibold text-header">Two-Factor Authentication</p>
            <div class="flex items-center space-x-2">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                ></div>
              </label>
            </div>
          </div>
          <div class="my-6 space-y-4">
            <div class="flex justify-between items-center">
              <div class="">
                <div class="flex items-center space-x-2">
                  <i class="mdi mdi-phone"></i>
                  <p class="text-sm text-header">**** *** **12</p>
                </div>
                <p class="text-xs text-header">Text message</p>
              </div>
              <p class="text-primary underline text-sm cursor-pointer">
                Change
              </p>
            </div>
            <div class="flex justify-between items-center">
              <div class="">
                <div class="flex items-center space-x-2">
                  <i class="mdi mdi-email"></i>
                  <p class="text-sm text-header">ruthdoe@xyzmail.com</p>
                </div>
                <p class="text-xs text-header">Email address</p>
              </div>
              <p class="text-primary underline text-sm cursor-pointer">
                Change
              </p>
            </div>
            <div class="flex justify-between items-center">
              <div class="">
                <div class="flex items-center space-x-2">
                  <i class="mdi mdi-cellphone"></i>
                  <p class="text-sm text-header">Authenticator App</p>
                </div>
                <p class="text-xs text-[#13ABCF]">Active</p>
              </div>
              <p class="text-primary underline text-sm cursor-pointer">
                Disable
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center">
            <p class="font-semibold text-header">
              Devices logged into your account
            </p>
          </div>
          <div class="my-6 space-y-4">
            <div
              class="border border-gray-200 rounded-lg p-2 flex justify-between items-center text-sm"
            >
              <div class="flex space-x-2">
                <i class="mdi mdi-cellphone"></i>
                <p>Samsung Galaxy S23</p>
              </div>
              <div class="flex space-x-6 items-center">
                <div class="w-1 h-1 bg-black rounded-full"></div>
                <p>Lagos, Nigeria</p>
              </div>
              <i class="mdi mdi-dots-vertical"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="border-l border-gray-200 w-[2px] h-[600px]"></div>
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
