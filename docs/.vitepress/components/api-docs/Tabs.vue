<script setup lang="ts" generic="T extends { name: string }">
import { computed, ref } from 'vue';

const { values } = defineProps<{
  title?: string;
  values: ReadonlyArray<T>;
}>();

const selectedTab = ref(0);
const selectedValue = computed(() => values[selectedTab.value]);
</script>

<template>
  <div>
    <div v-if="values.length === 1">
      <slot :value="selectedValue" v-once></slot>
    </div>
    <div v-else v-memo="[selectedTab]">
      <div class="tabs">
        {{ title ?? '' }}
        <button
          v-for="(value, index) in values"
          :key="index"
          :class="{ active: selectedTab === index }"
          @click="() => (selectedTab = index)"
        >
          {{ value.name }}
        </button>
      </div>
      <div class="tab-content">
        <slot :value="selectedValue"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  background-color: rgba(127, 127, 127, 0.5);
  transition: background-color 0.3s ease;
}

button.active {
  font-weight: bold;
  background-color: var(--vp-c-brand-1);
}

.tab-content {
  margin-top: 20px;
}
</style>
