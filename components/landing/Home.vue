<template>
  <div
    id="home"
    class="flex flex-col justify-center items-center content-center space-y-6 px-6 md:px-10 lg:px-24 py-10"
  >
    <p class="text-primary py-2 px-6 border border-[#DCDCDC] rounded-full">
      We Are Committed To
    </p>
    <div class="flex flex-col justify-center items-center space-y-3">
      <h1 class="text-header text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Creating a Safe & Secure Online
      </h1>
      <div class="md:flex items-center space-x-1 text-center ">
        <h1 class="text-header text-3xl md:text-4xl lg:text-5xl font-bold -mt-2 lg:-mt-0">Shopping</h1>
        <span
          ><img src="~/assets/images/hero-text.svg" alt="" class="h-10 -mt-2 lg:mt-1 "
        /></span>
        <h1 class="text-header text-3xl md:text-4xl lg:text-5xl font-bold">Experience</h1>
      </div>
    </div>
    <p class="lg:w-[400px] items-center text-center text-bodytext text-lg">
      Shop With Verified & Trusted Vendors More Confidently Without Second
      Thoughts
    </p>
    <div class="relative w-full lg:w-[650px]">
      <input
        type="search"
        v-model="search"
        class="p-4 outline-none border rounded-full text-sm w-full h-full"
        placeholder="Search by store ID or store name..."
      />
      <button
        @click="fetchStore()"
        class="bg-primary text-white absolute flex space-x-2 items-center right-0 top-0 h-[85%] mt-1 justify-center mr-1 w-[30%] rounded-full text-sm"
      >
        <span
          ><svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.875 16.875L21.375 21.375"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.25 18.375C15.185 18.375 18.375 15.185 18.375 11.25C18.375 7.31497 15.185 4.125 11.25 4.125C7.31497 4.125 4.125 7.31497 4.125 11.25C4.125 15.185 7.31497 18.375 11.25 18.375Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p>Search</p>
      </button>
    </div>
    <div>
      <img src="~/assets/images/hero-img.png" alt="" class="my-6" />
    </div>
  </div>
</template>
<script setup>
import { useStoreStore } from "~/stores/store";

const useStore = useStoreStore();
const loading = ref(false);
const search = ref("");
const router = useRouter();

const fetchStore = async () => {
  if (search.value) {
    router.push(`/${search.value}`);
    loading.value = true;
    try {
      await useStore.getStoreSearch(search.value);
    } catch (error) {
      console.error("Error fetching review:", error);
    } finally {
      loading.value = false;
    }
  }
};
</script>
