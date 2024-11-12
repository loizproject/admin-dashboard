<template>
  <div class="flex flex-col space-y-2">
    <label v-if="label" :for="props.name || 'dropdown'" :class="labelClass">
      {{ label }}
    </label>
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="placeholder"
        @focus="open = true"
        :class="['w-full', inputClass]"
        :disabled="loading"
      />
      <svg
        v-if="!loading"
        class="absolute right-2 top-3 w-4 h-4 cursor-pointer"
        @click="toggleDropdown"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
      <div
        v-show="open"
        class="absolute z-10 w-full bg-white border border-greybg rounded-md shadow-lg mt-2 overflow-y-auto hide-scrollbar max-h-[200px]"
      >
        <ul>
          <li
            v-for="option in filteredOptions"
            :key="option"
            @click="selectOption(option)"
            class="py-2 px-3 hover:bg-primary hover:text-white cursor-pointer text-sm"
          >
            {{ option }}
          </li>
        </ul>
      </div>
      <p v-if="fieldError" class="text-red-500 text-sm mt-2">
        {{ fieldError }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, defineProps, defineEmits } from "vue";
import { useField } from "vee-validate";
import * as Yup from "yup";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Search or select an option",
  },
  modelValue: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

// Define validation schema for the dropdown
const validationSchema = Yup.string().required("Please select an option.");

// Set up validation using VeeValidate
const { value: selectedOption, errorMessage: fieldError } = useField(
  props.name || "dropdown",
  props.required ? validationSchema : undefined
);

const open = ref(false);
const searchQuery = ref("");

// Filter options based on search query
const filteredOptions = computed(() => {
  return props.options.filter((option) =>
    option.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleDropdown = () => {
  if (!props.loading) {
    open.value = !open.value;
  }
};

const selectOption = (option) => {
  selectedOption.value = option;
  searchQuery.value = option; // Set the search query to the selected option
  open.value = false;
  emit("update:modelValue", option);
};

watch(
  () => props.modelValue,
  (newVal) => {
    selectedOption.value = newVal;
    searchQuery.value = newVal; // Update search query when model value changes
  }
);

// Dynamic class for input based on validation
const inputClass = computed(() => {
  return fieldError.value
    ? "border-red-500"
    : "text-sm font-light lg:font-normal placeholder-bodytext3 w-full text-[#333] border border-gray-300 focus:border-primary outline-none cursor-pointer p-2.5 rounded-lg";
});

// Dynamic class for label based on validation
const labelClass = computed(() => {
  let output = "text-bodytext text-sm";
  if (props.labelClass) {
    output += ` ${props.labelClass}`;
  }
  if (fieldError.value) {
    output += "text-red-700";
  }
  return output;
});
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
