<script setup>
import { faker } from '../../../../lib/esm';

window.faker = faker;
</script>

<template>
  <h2>🚧 Playground under construction 🚧</h2>
  <h3>window.faker</h3>
  <pre>{{ Object.keys(faker) }}</pre>
</template>
