<script setup>
import { ref } from 'vue';

const faker = ref();
const ready = ref(false);

import('../../../../dist/faker').then((_faker) => {
  window.faker = _faker.default;
  faker.value = _faker.default;
  ready.value = true;
});
</script>

<template>
  <h2>🚧 Playground under construction 🚧</h2>
  <h3>window.faker</h3>
  <pre v-if="ready">{{ Object.keys(faker) }}</pre>
</template>
