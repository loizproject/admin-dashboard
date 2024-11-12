<template>
  <div class="p-6 text-header text-lg h-screen">
    <div class="flex justify-between items-center">
      <div class="space-y-4">
        <h1 class="text-2xl">List of Services</h1>
        <p class="text-sm">View and manage service listing on your website.</p>
      </div>
      <nuxt-link to="/admin/services/create">
        <p
          class="px-2 py-1.5 border border-[#555555] cursor-pointer text-sm rounded-xl"
        >
          Create Service
        </p></nuxt-link
      >
    </div>
    <div class="my-10">
      <Table
        :data="tableData"
        :headers="tableHeaders"
        :dropdownOptions="dropdownOptions"
        :page="currentPage"
        @optionClick="handleOptionClick"
        @rowClick="handleRowClick"
        :showDetails="showDetails"
      >
        <template #details="{ row, rowIndex }">
          <!-- {{ singleService }} -->
          <div class="px-10 py-4 text-header space-y-8">
            <div class="space-y-3">
              <p>Service Name</p>
              <div class="flex items-center space-x-4">
                <input
                  type="text"
                  name=""
                  id=""
                  class="border border-[#CCCCCC] px-3 py-2.5 w-[300px] rounded focus-none outline-none"
                  :placeholder="singleService.title"
                  :value="singleService.title"
                  readonly
                />
                <div
                  class="w-8 h-8 flex justify-center items-center rounded-full border border-black cursor-pointer"
                >
                  <img src="~/assets/images/edit.svg" alt="" />
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <div class="flex justify-between items-center">
                <p>Service Sub-categories</p>
                <div
                  class="px-2 py-0.5 flex space-x-1 items-center border border-[#555555] cursor-pointer text-sm rounded-xl"
                >
                  <i class="mdi mdi-plus mt-0.5 text-lg"></i>
                  <p>Add Sub-category</p>
                </div>
              </div>
              <div class="space-y-3 my-6">
                <div v-for="(service, index) in singleService.subservices">
                  <div
                    class="border border-[#CCCCCC] px-3 py-1 flex justify-between items-center rounded"
                  >
                    <p>{{ service.title }}</p>
                    <i class="mdi mdi-dots-vertical text-lg cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex space-x-4 items-center justify-end">
              <div
                class="border border-red-500 text-red-500 cursor-pointer flex space-x-2 items-center px-3 py-1 rounded-lg"
              >
                <i class="mdi mdi-close-circle-outline mt-0.5 text-lg"></i>
                <p>Delete</p>
              </div>
              <div
                class="bg-gradient-bg cursor-pointer text-white flex justify-between items-center px-6 py-2.5 rounded-lg"
              >
                <p>Update</p>
              </div>
            </div>
            <!-- {{ rowIndex }}
            <p><strong>Service Details:</strong> {{ row.name }}</p>
            <p><strong>Price:</strong> {{ row.price }}</p>
            <p><strong>Date Created:</strong> {{ row.date }}</p> -->
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup>
import Table from "~/components/table/Table.vue";
import { useServicesStore } from "~/stores/services";
const serviceStore = useServicesStore();
const servicesData = ref([]);
const serviceIds = ref([]);
const tableData = ref([]);
const showDetails = ref(false);
const singleService = ref({});
const tableHeaders = ["Service Name", "Price", "Date Created"];
const dropdownOptions = ["View Details"];

const currentPage = ref(1);

function handleOptionClick({ option, index }) {
  const id = serviceIds.value[index];
  const service = servicesData.value[index];
  switch (option) {
    case "View Details":
      handleOption1(id, service, option, index);
      break;
  }
}

function handleOption1(id, service, option, index) {
  console.log(id, service, option, index);
  showDetails.value = true;
  singleService.value = service;
}

const fetchServices = async () => {
  const response = await serviceStore.getServices();
  servicesData.value = serviceStore.services;
  tableData.value = serviceStore.services.map((service) => {
    serviceIds.value.push(service.id);
    return {
      ServiceName: service.title || "",
      Price: service.price || 0,
      DateCreated: service.phone_number || "",
    };
  });
};

onMounted(() => {
  fetchServices();
});
</script>
