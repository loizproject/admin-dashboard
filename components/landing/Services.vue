<template>
  <div
    id="services"
    class="flex flex-col justify-center items-center content-center bg-[#FDFDFD] space-y-6 px-6 md:px-10 lg:px-24 py-16"
  >
    <p class="text-primary py-2 px-6 border border-[#DCDCDC] rounded-full">
      Wondering What We Offer? Check Out
    </p>
    <h1 class="text-header text-4xl font-bold">Our Services</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="bg-white shadow-lg border border-[#FFFAFA] p-4 rounded-lg space-y-6 relative"
      >
        <img
          src="~/assets/images/bg-img.svg"
          class="absolute top-0 right-0 h-28"
          alt=""
        />
        <img :src="card.imgSrc" alt="" class="w-10" />
        <div class="flex flex-col space-y-2">
          <h1 class="text-xl text-header font-semibold">{{ card.title }}</h1>
          <p class="text-bodytext text-sm">{{ card.description }}</p>
        </div>
      </div>
    </div>
    <nuxt-link to="/auth/signup">
      <button class="bg-primary py-2 px-16 rounded-full text-white">
        Register Now
      </button>
    </nuxt-link>
  </div>
</template>
<script setup>
import img1 from "~/assets/images/img1.svg";
import img2 from "~/assets/images/img2.svg";
import img3 from "~/assets/images/img3.svg";
const cards = [
  {
    imgSrc: img1,
    title: "Unique Business ID",
    description:
      "Get a unique Amnid ID for all your businesses to share with your customers across all platforms",
  },
  {
    imgSrc: img2,
    title: "Build Trust",
    description:
      "We understand the risk, when it comes to online transaction so we help you build trust.",
  },
  {
    imgSrc: img3,
    title: "Get & Read Reviews",
    description:
      "See past reviews of every business before transaction. Share your reviews with customers as a business ",
  },
];
</script>
