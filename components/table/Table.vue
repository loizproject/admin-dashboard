<template>
  <div @click="handleOutsideClick">
    <!-- Main table -->
    <div
      class="overflow-x-auto relative pb-48 hide-scrollbar bg-white p-3 rounded-lg"
    >
      <table v-if="data" class="w-full border-collapse">
        <!-- Table headers -->
        <thead
          class="text-left text-header text-sm rounded-t-2xl border-b border-[#D2D2D4]"
        >
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="text-sm px-3 overflow-hidden whitespace-nowrap font-normal"
            >
              {{ header }}
            </th>
            <th
              v-if="dropdownOptions"
              class="py-3 pl-4 text-left w-16 font-normal"
            >
              Details
            </th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody
          v-for="(row, rowIndex) in filteredData"
          :key="rowIndex"
          class="text-[#39404F] text-sm rounded-b-2xl"
          :class="{
            'shadow-md rounded-b': activeDetailsRow === rowIndex,
          }"
        >
          <tr
            class="cursor-pointer"
            :class="{
              'bg-[#D0EEF5] py-2 ': activeDetailsRow === rowIndex,
            }"
          >
            <td
              v-for="(item, colIndex) in row"
              :key="colIndex"
              :class="[
                colIndex !== 0 ? 'py-3' : 'py-3 pl-0',
                'px-3 text-sm overflow-hidden text-left text-header font-medium',
                {
                  '': activeDetailsRow === rowIndex,
                },
              ]"
            >
              <!-- Data display -->
              <div class="flex py-1 rounded">
                <span class="max-w-[250px] min-w-[100px] w-full">{{
                  item
                }}</span>
              </div>
            </td>
            <td
              v-if="dropdownOptions"
              class="py-3 pl-4 overflow-hidden whitespace-nowrap text-left"
            >
              <div>
                <i
                  @click="toggleDropdown(rowIndex, $event)"
                  class="mdi mdi-dots-vertical text-lg"
                ></i>
                <div
                  v-if="dropdownOpen[rowIndex]"
                  class="absolute right-0 mt-2 mr-3 z-40 rounded-xl shadow-md bg-white"
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
          <tr v-if="(activeDetailsRow === rowIndex) && showDetails" class="">
            <td :colspan="headers.length + 1">
              <slot name="details" :row="row" :rowIndex="rowIndex"></slot>
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

const activeDetailsRow = ref(null);
const dropdownOpen = ref([]);
const activeDropdownIndex = ref(null);

const toggleDropdown = (rowIndex, event) => {
  event.stopPropagation();
  if (
    activeDropdownIndex.value !== null &&
    activeDropdownIndex.value !== rowIndex
  ) {
    dropdownOpen.value[activeDropdownIndex.value] = false;
  }
  dropdownOpen.value[rowIndex] = !dropdownOpen.value[rowIndex];
  activeDropdownIndex.value = dropdownOpen.value[rowIndex] ? rowIndex : null;
};

// const handleOptionClick = (option, rowIndex) => {
//   emit("optionClick", { option, rowIndex });
// if (option === "View Details") {
//   activeDetailsRow.value =
//     activeDetailsRow.value === rowIndex ? null : rowIndex;
// }
// };

function handleOptionClick(option, index) {
  emit("optionClick", { option, index });
  activeDetailsRow.value = activeDetailsRow.value === index ? null : index;
}

const handleOutsideClick = () => {
  if (activeDropdownIndex.value !== null) {
    dropdownOpen.value[activeDropdownIndex.value] = false;
    activeDropdownIndex.value = null;
  }
};

const searchQuery = ref("");

const filteredData = computed(() => {
  return props.data.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function handleRowClick(row, index) {
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
