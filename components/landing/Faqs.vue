<template>
  <div
    id="faqs"
    class="flex flex-col justify-center items-center content-center bg-[#FDFDFD] px-6 md:px-10 lg:px-24 py-10"
  >
    <h1 class="text-header text-4xl font-semibold">
      Frequently Asked Questions
    </h1>

    <div class="mx-20 my-16 w-full">
      <div
        v-if="loading"
        class="flex justify-center items-center content-center py-8"
      >
        <ProgressSpinner />
      </div>
      <div
        v-else
        v-for="(faq, index) in faqs"
        :key="index"
        class="text-[#5E5E5E] bg-white p-5 shadow-sm rounded-lg flex flex-col space-y-2  w-full my-6 cursor-pointer"
        @click="toggle(index)"
      >
        <div class="flex justify-between items-center">
          <p class="text-xl font-medium">{{ faq.question }}</p>
          <span class="cursor-pointer">
            <i
              :class="
                openIndex === index ? 'pi pi-angle-down' : 'pi pi-angle-right'
              "
              style="font-size: 1.5rem"
            ></i>
          </span>
        </div>
        <p v-if="openIndex === index" class="">
          {{ faq.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from "~/stores/common";
const commonStore = useCommonStore();
const loading = ref(false);

const faqs = ref([]);

const openIndex = ref(null);

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}

const fetchFaqs = async () => {
  loading.value = true;
  try {
    await commonStore.getFaqs();
    faqs.value = commonStore.faqs;
  } catch (error) {
    console.error("Error fetching verification:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchFaqs();
});
</script>
