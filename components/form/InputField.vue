<template>
  <div class="flex flex-col space-y-2">
    <label
      v-if="props.label"
      :for="props.name"
      :class="[labelClass, props.labelClass]"
    >
      {{ props.label }}
      <!-- <span v-if="props.required" class="text-red-500">*</span> -->
    </label>

    <input
      v-bind="$attrs"
      :type="props.type"
      v-model="fieldValue"
      @input="handleInput"
      :class="[
        'border block w-full',
        inputClass,
        props.inputClass,
        { 'cursor-not-allowed': deactivated },
      ]"
      :disabled="deactivated"
    />

    <p
      v-if="fieldError"
      :class="['text-sm mt-0.5', errorClass, props.errorClass]"
    >
      {{ fieldError }}
    </p>
    <p v-else-if="props.success" :class="['text-sm', successClass]">
      {{ props.success }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, defineProps, defineEmits } from "vue";
import { useField } from "vee-validate";
import * as Yup from "yup";

type sizeType = "sm" | "md" | "lg";
type inputType = "text" | "password" | "email" | "submit" | "number" | "date";

const props = defineProps({
  size: {
    type: String as () => sizeType,
    default: "md",
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  success: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    required: false,
  },
  inputClass: {
    type: String,
    required: false,
  },
  labelClass: {
    type: String,
    required: false,
  },
  labelClasss: {
    type: String,
    required: false,
  },
  errorClass: {
    type: String,
    required: false,
  },
  type: {
    type: String as () => inputType,
    default: "text",
  },
  deactivated: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "clearError"]);

// Define validation schema
const validationSchema = Yup.string()
  .required("This field is required")
  .min(3, "Must be at least 3 characters")
  .max(50, "Must be less than 50 characters");

// Set up field validation using VeeValidate
const { value: fieldValue, errorMessage: fieldError } = useField(
  props.name,
  validationSchema
);

const inputClass = computed((): string => {
  let output: string = "";

  if (props.size === "sm") {
    output += " p-2 rounded-sm ";
  }
  if (props.size === "md") {
    output += " p-2.5 rounded-lg ";
  }
  if (props.size === "lg") {
    output += " p-2.5 pb-12 rounded-lg ";
  }
  if (fieldError.value) {
    output += " border outline-none border-red-500 ";
  }
  if (props.success) {
    output += " border outline-none border-gray-300 focus:border-primary ";
  }
  if (!fieldError.value && !props.success) {
    output += " border outline-none border-gray-300 focus:border-primary ";
  }
  output +=
    "text-sm font-light lg:font-normal placeholder-bodytext3 w-full text-[#333] border focus:border-primary";
  return output;
});

const errorClass = computed((): string => {
  return fieldError.value ? " text-red-600 dark:text-red-500 italic " : "";
});

const successClass = "text-green-600 dark:text-green-500 ";

const labelClass = computed((): string => {
  let output: string = "text-bodytext text-sm";

  if (fieldError.value) {
    output += " text-red-700 dark:text-red-500 ";
  }

  if (props.success) {
    output += " text-green-700 dark:text-green-500 ";
  }

  return output;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
