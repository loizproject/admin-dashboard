<template>
  <div
    class="flex flex-col justify-center items-center content-center space-y-6 px-6 md:px-10 lg:px-24 pb-16"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="[
          'p-4  relative flex flex-col text-start justify-start items-start text-header space-y-4',
        ]"
      >
        <div class="p-3 bg-[#D9D9D9] rounded-full">
          <img :src="card.imgSrc" alt="" class="w-5" />
        </div>

        <div class="flex flex-col space-y-2 mt-2">
          <h1 class="text-xl font-semibold">{{ card.title }}</h1>
          <p class="text-sm">{{ card.description }}</p>
        </div>
        <div class="text-sm">
          <p>{{ card.mailheader }}</p>
          <div class="flex space-x-3">
            <div
              v-for="(link, index) in card.links"
              class="text-[#008565] underline cursor-pointer"
            >
              <a :href="link.link" target="_blank" rel="noopener noreferrer">{{
                link.name
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[
        'p-4  relative flex flex-col text-center justify-center items-center text-header space-y-4 mt-6',
      ]"
    >
      <div class="p-3 bg-[#D9D9D9] rounded-full">
        <img src="~/assets/images/hours.svg" alt="" class="w-5" />
      </div>

      <div class="flex flex-col space-y-2 mt-2">
        <h1 class="text-xl font-semibold">Business Hours</h1>
        <p class="text-sm">
          We’re available Monday to Friday, from 9 AM to 5 PM (GMT). Feel free
          to reach out during these hours for the quickest response with our
          chat box at the bottom right of your screen
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import img1 from "~/assets/images/email.svg";
import img2 from "~/assets/images/socials.svg";
const cards = [
  {
    imgSrc: img1,
    title: "Email",
    description:
      "For any inquiries or support-related questions, send an email, we will get back as soon as we can",
    mailheader: "Mail us at:",
    links: [{ name: "support@amnid.africa", link: "support@amnid.africa" }],
  },
  {
    imgSrc: img2,
    title: "Socials",
    description:
      "You can also connect with us on social media. Follow us for the latest updates and news",
    mailheader: "Connect with us on:",
    links: [
      { name: "Facebook", link: "#" },
      {
        name: "Instagram",
        link: "https://www.instagram.com/amnidafrica?igsh=MnFqNm9rbXcxajU4",
      },
      { name: "X (twitter)", link: "https://x.com/amnidafrica" },
    ],
  },
];
</script>
