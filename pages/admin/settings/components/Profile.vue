<template>
  <div>
    <div class="space-y-3 text-header">
      <h1 class="text-lg font-semibold text-header">Profile</h1>
      <p class="text-header text-sm">View, update your profile and biodata.</p>
    </div>
    <div
      class="space-y-6 bg-white rounded-lg p-6 mt-8 flex justify-between items-end"
    >
      <div class="flex space-x-4 items-center">
        <div class="bg-gray-400 h-28 w-28 rounded-full"></div>
        <div>
          <p class="text-2xl">
            {{ user?.user?.firstName + " " + user?.user?.lastName }}
          </p>
          <div class="flex items-center space-x-2">
            <i class="mdi mdi-map-marker text-primary"></i>
            <p class="text-sm">Lagos, Nigeria</p>
          </div>
        </div>
      </div>
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
    <div
      class="space-y-4 bg-white rounded-lg p-6 mt-8 flex flex-col items-end w-full"
    >
      <div class="flex justify-between items-center w-full">
        <p class="text-header font-semibold">Biodata</p>
        <div
          class="flex items-center justify-center space-x-2 text-primary text-sm cursor-pointer"
        >
          <i class="mdi mdi-pencil"></i>
          <p>Edit Biodata</p>
        </div>
      </div>
      <div class="w-full h-[0.5px] bg-gradient-bg"></div>
      <div class="space-y-6 w-full">
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Email</p>
          <p class="text-sm text-header">{{ user?.user?.email }}</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Phone Number</p>
          <p class="text-sm text-header">+234 812 345 6789</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Date of Birth</p>
          <p class="text-sm text-header">15 March 1990</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Marital Status</p>
          <p class="text-sm text-header">Single</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Location</p>
          <p class="text-sm text-header">Lagos, Nigeria</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Occupation</p>
          <p class="text-sm text-header">Software Engineer</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Income Range</p>
          <p class="text-sm text-header">$50,000 - $100,000</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Education</p>
          <p class="text-sm text-header">Bachelor's Degree</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Country of Residence</p>
          <p class="text-sm text-header">Nigeria</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Nationality</p>
          <p class="text-sm text-header">Nigerian</p>
        </div>
        <div class="w-full justify-between items-center flex">
          <p class="text-sm text-header">Preferred Contact Method</p>
          <p class="text-sm text-header">Email</p>
        </div>
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
