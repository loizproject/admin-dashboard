<template>
  <div class="relative inline-block w-full">
    <div
      @click="toggleDropdown()"
      class="p-3 w-full flex justify-between items-center rounded-full"
    >
      <div>
        <div v-if="loadingState">
          <span>Loading...</span>
        </div>
        <div v-else>
          {{ selectedOption || placeholder }}
        </div>
      </div>
      <svg
        class="w-4 h-4"
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
    </div>
    <div
      v-show="open"
      class="absolute z-10 w-full bg-white border border-greybg rounded-md shadow-lg mt-2 overflow-y-auto hide-scrollbar max-h-[200px]"
    >
      <ul>
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="py-2 px-3 hover:bg-primary hover:text-white cursor-pointer text-sm"
        >
          {{ option }}
        </li>
      </ul>
    </div>
    <p v-if="fieldError" class="text-red-500 text-sm mt-2">{{ fieldError }}</p>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  modelValue: {
    type: String,
    default: "",
  },
  loadingState: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selectedOption = ref(props.modelValue);

const toggleDropdown = () => {
  if (!props.loadingState) {
    open.value = !open.value;
  }
};

const selectOption = (option) => {
  selectedOption.value = option;
  open.value = false;
  emit("update:modelValue", option);
};

// Validation schema using Yup
const { errors } = useForm({
  validationSchema: Yup.object({
    selectedOption: props.required
      ? Yup.string().required("This field is required")
      : Yup.string(),
  }),
});

const { value: fieldValue, errorMessage: fieldError } =
  useField("selectedOption");

// Sync the selectedOption with the modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    selectedOption.value = newVal;
  }
);

watch(selectedOption, (newVal) => {
  fieldValue.value = newVal;
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
