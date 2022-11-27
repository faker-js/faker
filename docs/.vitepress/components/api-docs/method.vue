<script setup lang="ts">
import type { Method } from './method';
import MethodParameters from './method-parameters.vue';
import { slugify } from '../../shared/utils/slugify';

const props = defineProps<{ method: Method }>();

function seeAlsoToUrl(see: string): string {
  const [, module, method] = see.replace(/\(.*/, '').split('\.');
  return module + '.html#' + slugify(method);
}
</script>

<template>
  <div>
    <div v-if="props.method.deprecated" class="warning custom-block">
      <p class="custom-block-title">Deprecated</p>
      <p>
        This method is deprecated and will be removed in a future version.
        <span v-html="props.method.deprecated" />
      </p>
    </div>

    <div v-html="props.method.description"></div>

    <div v-if="props.method.since">
      <p>
        <em>Available since v<span v-html="props.method.since" /></em>
      </p>
    </div>

    <MethodParameters
      v-if="props.method.parameters.length > 0"
      :parameters="props.method.parameters"
    />

    <p><strong>Returns:</strong> {{ props.method.returns }}</p>

    <div v-html="props.method.examples" />

    <div v-if="props.method.seeAlsos.length > 0">
      <h3>See Also</h3>
      <ul>
        <li v-for="seeAlso of props.method.seeAlsos" :key="seeAlso">
          <a v-if="seeAlso.startsWith('faker.')" :href="seeAlsoToUrl(seeAlso)">
            {{ seeAlso }}
          </a>
          <template v-else>{{ seeAlso }}</template>
        </li>
      </ul>
    </div>
  </div>
</template>
