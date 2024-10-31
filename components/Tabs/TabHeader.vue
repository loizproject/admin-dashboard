<script setup lang="ts">
import { computed, ref } from 'vue';

// Interface
interface DataInterface {
    id: string | number;
    text: string;
    icon?: string;
    default?: boolean;
    disabled?: boolean;
};


const emit = defineEmits(['selected']);

const props = defineProps({
    data: {
        type: Array as () => Array<DataInterface>,
        required: true
    },
    default: {
        type: [String, Number],
        required: false
    }
});

const selectedTab = ref<string | number>("");

const selectItem = (tab: string | number): void => {
    selectedTab.value = tab;
    emit('selected', tab);
};

const onComponentLoad = (): void => {
    if (props.default) {
        selectItem(props.default);
    }
};


onComponentLoad();

</script>

<template>
    <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li v-for="(tab, index) in data" :key="index" class="mr-2">
                <button type="button" @click="selectItem(tab.id)" class="inline-flex p-4 border-b-2  rounded-t-lg group"
                    :class="{
                        'text-blue-600 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500': selectedTab === tab.id,
                        'border-transparent hover:border-gray-300 dark:hover:text-gray-300 hover:text-gray-600': selectedTab !== tab.id
                    }">
                    <div v-if="tab.icon" class="my-auto"
                        :class="{ 'text-blue-600 dark:text-blue-500': selectedTab === tab.id }" v-html="tab?.icon"></div>
                    <span class="my-auto">{{ tab?.text }}</span>
                </button>
            </li>
        </ul>
    </div>
</template>
