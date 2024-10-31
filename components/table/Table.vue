<template>
  <div @click="handleOutsideClick">
    <!-- Main table -->
    <div class="overflow-x-auto relative pb-48 hide-scrollbar">
      <table v-if="data" class="w-full border-collapse">
        <!-- Table headers -->
        <thead class="text-left text-bodytext3 font-medium text-sm">
          <tr>
            <th
              class="text-sm px-4 font-semibold py-4 bg-[#FBFBFB] rounded-l-2xl"
            >
              S/N
            </th>
            <!-- Table headers -->
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="text-sm bg-[#FBFBFB] font-semibold px-3 overflow-hidden whitespace-nowrap"
            >
              {{ header }}
            </th>
            <th
              v-if="dropdownOptions"
              class="py-4 pl-4 text-left bg-[#FBFBFB] rounded-r-2xl w-6 h-4"
            ></th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="text-[#39404F] text-sm bg-white">
          <tr
            v-for="(row, rowIndex) in filteredData"
            :key="rowIndex"
            class="border-b border-[#D2D2D4] cursor-pointer"
          >
            <!-- Checkbox for each row -->
            <td
              class="px-4 text-bodytext2 font-medium text-sm overflow-hidden text-left"
            >
              <p>
                {{ rowIndex + 1 + (props.page - 1) * 10 }}
              </p>
            </td>
            <!-- Table data cells -->
            <td
              v-for="(item, colIndex) in row"
              :key="colIndex"
              :class="[
                colIndex !== 0 ? 'py-4 ' : 'py-4 pl-0',
                'px-3 text-sm overflow-hidden text-left text-bodytext3 font-medium',
              ]"
            >
              <!-- Data display -->
              <div class="flex py-1 rounded">
                <span
                  class="max-w-[250px] min-w-[100px] w-full"
                  :class="{
                    'py-2 px-3 flex justify-center bg-[#DEFDE5] text-[#009621] rounded-2xl capitalize':
                      item === 'active' ||
                      item === 'completed' ||
                      item === 'very good' ||
                      item === 'submitted' ||
                      item === 'good',
                    'py-2 px-3 flex justify-center bg-dark text-white rounded-2xl':
                      headers[colIndex] === 'Total Ans',
                    'py-2 px-3 flex justify-center bg-[#FFFAEB] text-[#F79009] rounded-2xl capitalize':
                      item === 'incomplete' ||
                      item === 'pending' ||
                      item === 'fair',
                    'py-2 px-3 flex justify-center bg-[#FF0000] bg-opacity-5 text-[#FF0000] rounded-2xl capitalize':
                      item === 'very poor' || item === 'poor',
                  }"
                  >{{ item }}</span
                >
                <!-- Status indicator icon -->
                <svg
                  v-if="['successful', 'pending', 'failed'].includes(item)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style="stroke-width: 1.5"
                >
                  <!-- Status icon path -->
                </svg>
              </div>
            </td>
            <td
              v-if="dropdownOptions"
              class="py-4 pl-4 overflow-hidden whitespace-nowrap text-left"
            >
              <div class="">
                <i
                  @click="toggleDropdown(rowIndex, $event)"
                  class="pi pi-ellipsis-v"
                ></i>
                <div
                  v-if="dropdownOpen[rowIndex]"
                  class="absolute right-0 mt-2 ml-3 z-40 bg-white rounded-xl shadow-md"
                >
                  <ul class="">
                    <li
                      v-for="(option, optionIndex) in dropdownOptions"
                      :key="optionIndex"
                      :class="[
                        'px-6 py-3 font-light hover:bg-[#FFEAEC] hover:text-pink text-gray-800',
                        {
                          'rounded-t-xl': optionIndex === 0,
                          'rounded-b-xl':
                            optionIndex === dropdownOptions.length - 1,
                        },
                      ]"
                      @click="handleOptionClick(option, rowIndex)"
                    >
                      {{ option }}
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  onBeforeUnmount,
} from "vue";

const props = defineProps({
  data: Array,
  headers: Array,
  showDetails: Boolean,
  onRowClick: Function,
  header: String,
  dropdownOptions: Array,
  page: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["optionClick"]);

function handleOptionClick(option, index) {
  emit("optionClick", { option, index });
}

const searchQuery = ref("");

const filteredData = computed(() => {
  // Logic to filter table data based on search query
  return props.data.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const dropdownOpen = ref([]);
const activeDropdownIndex = ref(null);

const toggleDropdown = (rowIndex, event) => {
  event.stopPropagation();

  if (
    activeDropdownIndex.value !== null &&
    activeDropdownIndex.value !== rowIndex
  ) {
    dropdownOpen.value[activeDropdownIndex.value] = false; // Close any other open dropdown
  }

  dropdownOpen.value[rowIndex] = !dropdownOpen.value[rowIndex];
  activeDropdownIndex.value = dropdownOpen.value[rowIndex] ? rowIndex : null;
};

const handleOutsideClick = () => {
  if (activeDropdownIndex.value !== null) {
    dropdownOpen.value[activeDropdownIndex.value] = false;
    activeDropdownIndex.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function handleRowClick(row, index) {
  // Call the click action passed as prop
  props.onRowClick(row, index);
}
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
