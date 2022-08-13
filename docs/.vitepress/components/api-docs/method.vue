<script setup lang="ts">
import type { Method } from './method';
import MethodParameters from './method-parameters.vue';

const props = defineProps<{ method: Method }>();

function seeAlsoToUrl(see: string): string {
  const [, module, method] = see.replace(/\(.*/, '').split('\.');
  return module + '.html#' + method;
}
</script>

<template>
  <div>
    <div v-if="props.method.deprecated" class="warning custom-block">
      <p class="custom-block-title">Deprecated</p>
      <p>This method is deprecated and will be removed in a future version.</p>
    </div>

    <div v-html="props.method.description"></div>

    <MethodParameters
      v-if="props.method.parameters.length > 0"
      :parameters="props.method.parameters"
    />

    <p><strong>Returns:</strong> {{ props.method.returns }}</p>

    <div v-html="props.method.examples" />

    <div v-if="props.method.seeAlsos.length > 0">
      <h3>See Also</h3>
      <div v-for="seeAlso of props.method.seeAlsos" :key="seeAlso">
        <a :href="seeAlsoToUrl(seeAlso)" v-if="seeAlso.startsWith('faker.')">
          <p>{{ seeAlso }}</p>
        </a>
        <p v-else>{{ seeAlso }}</p>
      </div>
    </div>
  </div>
</template>
