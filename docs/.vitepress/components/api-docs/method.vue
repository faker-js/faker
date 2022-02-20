<script setup lang="ts">
import type { Method } from './method';
import MethodParameters from './method-parameters.vue';

const props = defineProps<{ method: Method }>();
</script>

<template>
  <div>
    <h2>{{ props.method.name }}</h2>

    <div v-html="props.method.description"></div>

    <MethodParameters
      v-if="props.method.parameters.length > 0"
      :parameters="props.method.parameters"
    />

    <p><strong>Returns:</strong> {{ props.method.returns }}</p>

    <div v-html="props.method.examples" />
  </div>
</template>
