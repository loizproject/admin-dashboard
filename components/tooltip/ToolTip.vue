<script setup lang="ts">
import { computed } from "vue";

type ToolTipType = "TOP" | "BOTTOM" | "RIGHT" | "LEFT";

defineProps({
    message: {
        type: String,
        required: false,
        default: ""
    },
    position: {
        type: String as () => ToolTipType,
        required: false,
        default: "TOP"
    }
});


</script>

<template>
    <!-- Show tooltip on top -->
    <div role="tooltip"
        class="absolute opacity-5 inline-block p-1 text-sm font-medium bg-main-deepgreen rounded-lg shadow-sm">
        Tooltip on top
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>

    <!-- Show tooltip on right -->
    <!-- <div id="tooltip-right" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Tooltip on right
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div> -->

    <!-- Show tooltip on bottom -->
    <!-- <div id="tooltip-bottom" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Tooltip on bottom
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div> -->

    <!-- Show tooltip on left -->
    <!-- <div id="tooltip-left" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Tooltip on left
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div> -->
</template>