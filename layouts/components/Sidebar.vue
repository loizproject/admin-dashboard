<template>
  <div>
    <div
      class="py-3 fixed hidden lg:flex lg:flex-col w-[230px] border-r h-screen bg-sidebg"
    >
      <div class="px-5 hidden lg:flex">
        <nuxt-link to="/dashboards/home">
          <img src="~/assets/images/logo.svg" alt="" />
        </nuxt-link>
      </div>
      <div class="overflow-y-auto h-[calc(100vh-100px)]">
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
              <div class="flex py-2 items-center mx-4 space-x-2 -mt-2">
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
    <div class="absolute flex flex-col lg:hidden h-screen">
      <button
        @click="toggleSidebar"
        class="text-gray-800 focus:outline-none z-40 ml-5 mt-7"
      >
        <i
          :class="`mdi ${sidebar.isVisible ? 'mdi-close' : 'mdi-menu'} w-6 h-6`"
        ></i>
      </button>
      <div
        class="fixed inset-y-0 left-0 z-30 my-5 bg-white h-screen w-64 md:w-auto shadow-lg transform transition-transform duration-700"
        :class="{
          '-translate-x-full': !sidebar.isVisible,
          'translate-x-0': sidebar.isVisible,
        }"
      >
        <div class="my-10 w-full overflow-y-auto h-[calc(100vh-200px)]">
          <div class="px-5 flex lg:hidden">
            <nuxt-link to="/dashboards/home">
              <h1 class="text-lg font-semibold self-center text-primary">
                SquadBetz
              </h1>
            </nuxt-link>
          </div>
          <div class="my-8">
            <template v-for="(page, index) in pages" :key="index">
              <div
                @click="toggleDropdown(index)"
                class="flex space-x-3 py-2 px-3 items-center my-4 mx-6 cursor-pointer"
              >
                <i
                  :class="[
                    'mdi',
                    page.icon,
                    {
                      'text-primary': isActive(page.path) && !page.subPages,
                    },
                    'text-lg',
                  ]"
                ></i>
                <p
                  class="mx-2"
                  :class="{
                    'text-primary': isActive(page.path) && !page.subPages,
                  }"
                >
                  {{ page.title }}
                </p>
              </div>

              <!-- Mobile Submenu -->
              <div
                v-if="page.subPages && activeDropdown === index"
                class="ml-10"
              >
                <nuxt-link
                  v-for="(subPage, subIndex) in page.subPages"
                  :key="subIndex"
                  :to="subPage.path"
                >
                  <div class="flex py-10 items-center">
                    <p :class="{ 'text-primary': isActive(subPage.path) }">
                      {{ subPage.title }}
                    </p>
                  </div>
                </nuxt-link>
              </div>
            </template>
          </div>
          <div
            @click="logout"
            class="flex space-x-2 mx-9 mt-6 items-center absolute bottom-10"
          >
            <p class="mx-2 text-error cursor-pointer">Log out</p>
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
    path: "/dashboards/dashboard",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Manage Services",
    icon: "mdi-folder-edit",
    subPages: [
      {
        title: "Purchases and Tracking",
        path: "/dashboards/services",
      },
    ],
  },
  {
    title: "Report Generation",
    icon: "mdi-chart-box",
    subPages: [
      {
        title: "Book Paid Consultation",
        path: "/dashboards/consultations/paid",
      },
      {
        title: "Manage Booked Consultation",
        path: "/dashboards/consultations/booked",
      },
    ],
  },
  {
    title: "User Management",
    path: "/dashboards/bookmark-outline",
    icon: "mdi-account-edit",
  },
  {
    title: "Reviews",
    path: "/dashboards/subscription",
    icon: "mdi-account details",
  },
  {
    title: "Settings",
    path: "/dashboards/notifications",
    icon: "mdi-cog-outline",
  },
];

const activeDropdown = ref(null);

function toggleDropdown(index) {
  const page = pages[index];

  if (page.subPages) {
    // Toggle dropdown only if there are subPages
    activeDropdown.value = activeDropdown.value === index ? null : index;
  } else {
    // Navigate to the page path if there are no subPages
    router.push(page.path);
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
