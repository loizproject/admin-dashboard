<script setup lang="ts">
// No need to import twMerge anymore

const props = defineProps({
  class: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div :class="`p-2 md:p-4 rounded-lg bg-white ${props.class}`" v-bind="$attrs">
    <slot />
  </div>
</template>
