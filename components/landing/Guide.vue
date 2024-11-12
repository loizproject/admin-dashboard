<template>
  <div
    id="guide"
    class="flex flex-col justify-center items-center content-center space-y-4 px-6 md:px-10 lg:px-24 py-16 bg-primary"
  >
    <p
      class="text-white py-2 text-sm px-6 border border-[#DCDCDC] rounded-full"
    >
      Step By Step Guide Of
    </p>
    <div class="flex flex-col justify-center items-center space-y-3">
      <h1 class="text-white text-4xl font-medium">How It Works</h1>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-8"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="bg-white shadow-lg border border-[#FFFAFA] p-4 rounded-lg space-y-6 relative my-5 flex flex-col text-center justify-start items-center"
      >
        <div class="w-10 h-10">
          <img :src="card.imgSrc" alt="" />
        </div>

        <div class="flex flex-col space-y-2">
          <h1 class="text-lg text-header font-semibold">{{ card.title }}</h1>
          <p class="text-[#5E5E5E] text-sm">{{ card.description }}</p>
        </div>
      </div>
    </div>
    <div>
      <nuxt-link to="/auth/signup">
        <button
          class="bg-white py-2 px-16 rounded-full text-primary text-sm uppercase"
        >
          Get Started
        </button>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup>
import img1 from "~/assets/images/img4.svg";
import img2 from "~/assets/images/img5.svg";
import img3 from "~/assets/images/img6.svg";
import img4 from "~/assets/images/img7.svg";
const cards = [
  {
    imgSrc: img1,
    title: "Create An Account",
    description:
      "Create an account on the Amnid platform with just a few clicks",
  },
  {
    imgSrc: img2,
    title: "Verify Business",
    description:
      "Verify your profile with valid documents & share your ID to your customers",
  },
  {
    imgSrc: img3,
    title: "Search Vendors",
    description:
      "Search for business with Amnid ID to see verification status and past reviews",
  },
  {
    imgSrc: img4,
    title: "Rate Experience",
    description:
      "Go beyond just transacting, let others after you know about your experience",
  },
];
</script>
