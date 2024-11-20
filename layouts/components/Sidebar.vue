<template>
  <div class="relative">
    <div
      class="py-3 fixed hidden lg:flex lg:flex-col w-[230px] h-[calc(100%-50px)] mt-[50px] border-r bg-sidebg"
    >
      <div class="px-5 hidden lg:flex">
        <nuxt-link to="/admin/dashboard">
          <img src="~/assets/images/logo.svg" alt="" />
        </nuxt-link>
      </div>
      <div class="overflow-y-auto slim-scrollbar">
        <template v-for="(page, index) in pages" :key="index">
          <div
            @click="toggleDropdown(index)"
            class="flex space-x-3 py-2 items-center my-2 ml-4 mr-6 cursor-pointer"
            :class="{ 'border-b-2 border-[#AAAAAA]': hasActiveSubPage(page) }"
          >
            <i
              :class="[
                'mdi',
                page.icon,
                {
                  'text-primary': isActive(page.path),
                },
                'text-lg',
              ]"
            ></i>
            <p
              class="mx-2"
              :class="{
                'text-primary': isActive(page.path),
              }"
            >
              {{ page.title }}
            </p>
          </div>

          <!-- Submenu -->
          <div v-if="page.subPages && activeDropdown === index" class="">
            <nuxt-link
              v-for="(subPage, subIndex) in page.subPages"
              :key="subIndex"
              :to="subPage.path"
            >
              <div class="flex py-4 items-center mx-4 space-x-2 -mt-4">
                <img
                  :src="isActive(subPage.path) ? activeIcon : inactiveIcon"
                  alt="icon"
                  class="w-2 h-2"
                />
                <p
                  :class="{ 'text-primary': isActive(subPage.path) }"
                  class="overflow-hidden text-ellipsis whitespace-nowrap w-full"
                >
                  {{ subPage.title }}
                </p>
              </div>
            </nuxt-link>
          </div>
        </template>
      </div>
    </div>
    <div class="absolute flex flex-col lg:hidden h-screen top-3">
      <button
        @click="toggleSidebar"
        class="text-gray-800 focus:outline-none fixed top-3 left-5 z-50 lg:hidden"
      >
        <i
          :class="`mdi ${
            sidebar.isVisible ? 'mdi-close' : 'mdi-menu'
          } text-lg text-primary `"
        ></i>
      </button>
      <div
        class="fixed inset-y-0 left-0 z-30 bg-sidebg h-screen w-64 md:w-auto shadow-lg transform transition-transform duration-700"
        :class="{
          '-translate-x-full': !sidebar.isVisible,
          'translate-x-0': sidebar.isVisible,
        }"
      >
        <div class="my-20 w-full">
          <div class="px-5 hidden lg:flex">
            <nuxt-link to="/admin/dashboard">
              <img src="~/assets/images/logo.svg" alt="" />
            </nuxt-link>
          </div>
          <div class="overflow-y-auto h-[calc(100vh-100px)] slim-scrollbar">
            <template v-for="(page, index) in pages" :key="index">
              <div
                @click="toggleDropdown(index)"
                class="flex space-x-3 py-2 items-center my-2 ml-4 mr-6 cursor-pointer"
                :class="{
                  'border-b-2 border-[#AAAAAA]': hasActiveSubPage(page),
                }"
              >
                <i
                  :class="[
                    'mdi',
                    page.icon,
                    {
                      'text-primary': isActive(page.path),
                    },
                    'text-lg',
                  ]"
                ></i>
                <p
                  class="mx-2"
                  :class="{
                    'text-primary': isActive(page.path),
                  }"
                >
                  {{ page.title }}
                </p>
              </div>

              <!-- Submenu -->
              <div v-if="page.subPages && activeDropdown === index" class="">
                <nuxt-link
                  v-for="(subPage, subIndex) in page.subPages"
                  :key="subIndex"
                  :to="subPage.path"
                  @click="toggleSidebar"
                >
                  <div class="flex py-4 items-center mx-4 space-x-2 -mt-4">
                    <img
                      :src="isActive(subPage.path) ? activeIcon : inactiveIcon"
                      alt="icon"
                      class="w-2 h-2"
                    />
                    <p
                      :class="{ 'text-primary': isActive(subPage.path) }"
                      class="overflow-hidden text-ellipsis whitespace-nowrap w-full"
                    >
                      {{ subPage.title }}
                    </p>
                  </div>
                </nuxt-link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSidebarStore } from "~/stores/sidebar";
import { useAuthStore } from "~/stores/auth";
import activeIcon from "~/assets/images/arrow-left.svg";
import inactiveIcon from "~/assets/images/arrowleft.svg";

const sidebar = useSidebarStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const pages = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Manage Services",
    icon: "mdi-folder-edit",
    subPages: [
      {
        title: "List of Services",
        path: "/admin/services",
      },
      {
        title: "Create Service",
        path: "/admin/services/create",
      },
    ],
  },
  {
    title: "Report Generation",
    icon: "mdi-chart-box",
    subPages: [
      {
        title: "Track Purchased Services",
        path: "/admin/consultations/paid",
      },
      {
        title: "Payments",
        path: "/admin/consultations/booked",
      },
      {
        title: "Financials",
        path: "/admin/consultations/p",
      },
      {
        title: "Referrals",
        path: "/admin/consultations/b",
      },
      {
        title: "Abandoned Basket",
        path: "/admin/consultations/a",
      },
      {
        title: "Manage Booked Consultations",
        path: "/admin/consultations/d",
      },
    ],
  },
  {
    title: "User Management",
    path: "/admin/bookmark-outline",
    icon: "mdi-account-edit",
  },
  {
    title: "Reviews",
    path: "/admin/subscription",
    icon: "mdi-account details",
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: "mdi-cog-outline",
    subPages: [
      {
        title: "Account Settings",
        path: "/admin/settings",
      },
    ],
  },
];

const activeDropdown = ref(null);

function toggleDropdown(index) {
  const page = pages[index];

  if (page.subPages) {
    activeDropdown.value = activeDropdown.value === index ? null : index;
  } else {
    router.push(page.path);
    toggleSidebar();
  }
}

function hasActiveSubPage(page) {
  return (
    page.subPages && page.subPages.some((subPage) => isActive(subPage.path))
  );
}

function isActive(path) {
  return route.path === path;
}

function toggleSidebar() {
  sidebar.toggle();
}

function logout() {
  authStore.logout();
  router.push("/auth/login");
}
</script>
<style>
/* width */
.slim-scrollbar::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.slim-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.slim-scrollbar::-webkit-scrollbar-thumb {
  background: #d2d2d4;
  border-radius: 10px;
}
</style>
