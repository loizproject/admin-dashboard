<template>
  <div
    class="flex flex-col justify-center items-center content-center bg-[#FDFDFD] space-y-6 px-6 md:px-10 lg:px-24 py-10"
  >
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="[
          'bg-white shadow-lg border border-[#FFFAFA] p-4  relative flex flex-col text-center justify-start items-center',
          index === 0
            ? ' py-7 rounded-t-lg lg:rounded-l-none lg:rounded-t-lg'
            : 'py-5 rounded-b-lg lg:rounded-b-none lg:rounded-r-lg ',
        ]"
      >
        <div class="p-3 bg-[#FAFAFA] rounded-full">
          <img :src="card.imgSrc" alt="" class="w-5" />
        </div>

        <div class="flex flex-col space-y-2 mt-2">
          <h1 class="text-lg text-header font-semibold">{{ card.title }}</h1>
          <p class="text-[#5E5E5E] text-sm">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import img1 from "~/assets/images/vision.svg";
import img2 from "~/assets/images/mission.svg";
const cards = [
  {
    imgSrc: img1,
    title: "Our Vision",
    description:
      "We envision a future where fraudulent activities are significantly reduced, and every online transaction is secure and transparent. Our goal is to create a safer digital marketplace for both consumers and vendors by becoming the go-to platform for vendor verification.",
  },
  {
    imgSrc: img2,
    title: "Our Mission",
    description:
      "Our mission is to protect you from fraudulent vendors and empower businesses by building credibility and trust. To provide a seamless and user-friendly platform that enables businesses to verify their credibility and allows consumers to feel confident in their transactions.",
  },
];
</script>
