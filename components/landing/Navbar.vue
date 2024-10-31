<template>
  <div
    class="flex justify-between items-center mt-6 mb-10 px-6 md:px-10 lg:px-24"
  >
    <!-- Logo and Brand -->
    <img src="~/assets/images/logo.svg" alt="Logo" class="w-40"/>

    <!-- Desktop Menu -->
    <div class="lg:flex space-x-8 items-center hidden">
      <ul class="flex space-x-8 items-center">
        <li
          v-for="(menu, index) in menuList"
          :key="index"
          :class="
            isActive(menu.link)
              ? 'text-primary border-b-2 border-b-primary font-medium'
              : 'hover:text-primary text-[#4DA993]'
          "
          class="capitalize"
        >
          <nuxt-link :to="menu.link">
            {{ menu.name }}
          </nuxt-link>
        </li>
      </ul>
      <nuxt-link to="/auth/login">
        <p class="text-primary cursor-pointer font-medium">Login</p>
      </nuxt-link>
      <nuxt-link to="/auth/signup">
        <button
          class="bg-primary text-[#FCFCFC] px-6 py-2 rounded-full uppercase text-sm"
        >
          Register
        </button>
      </nuxt-link>
    </div>

    <!-- Mobile Menu Button -->
    <div class="lg:hidden">
      <button @click="toggleMobileMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      v-if="isMobileMenuOpen"
      class="absolute top-0 left-0 w-full bg-white h-screen lg:hidden z-50"
    >
      <div class="flex justify-between items-center p-6">
          <img src="~/assets/images/logo.svg" alt="Logo" />
        <button @click="toggleMobileMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <ul class="flex flex-col space-y-6 mt-10 px-6 text-center">
        <li v-for="(menu, index) in menuList" :key="index">
          <nuxt-link
            :to="menu.link"
            @click="toggleMobileMenu"
            class="capitalize text-primary text-xl"
          >
            {{ menu.name }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/auth/login">
            <p class="text-primary cursor-pointer font-medium text-xl">LogIn</p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/auth/signup">
            <button
              class="bg-primary text-[#FCFCFC] px-6 py-2 rounded-full uppercase text-lg w-full"
            >
              Register
            </button>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router"; // Import the useRoute function

const route = useRoute(); // Use the current route

const menuList = ref([
  { name: "home", link: "/" },
  { name: "about us", link: "/about" },
  { name: "contact us", link: "/contact" },
]);

// Check if the menu item is active
const isActive = (link) => {
  return route.path === link;
};

// Mobile Menu State
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style scoped>
/* Optional: Add any custom styles here */
</style>
