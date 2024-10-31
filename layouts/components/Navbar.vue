<template>
  <div class="w-full flex justify-between items-center px-2 shadow-sm border-b">
    <div class="flex items-center cursor-pointer">
      <i class="mdi mdi-chevron-left text-3xl text-[#555555]"></i>
      <p class="text-sm">Back to Home</p>
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
          <p>Ruth</p>
          <i class="mdi mdi-chevron-down mt-0.5 text-lg"></i>
        </div>
      </div>
    </div>
  </div>
</template>
