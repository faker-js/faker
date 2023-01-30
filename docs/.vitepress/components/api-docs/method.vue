<script setup lang="ts">
import type { Method } from './method';
import MethodParameters from './method-parameters.vue';
import { slugify } from '../../shared/utils/slugify';
import { sourceBaseUrl } from '../../../api/source-base-url';

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
      <p>This method is deprecated and will be removed in a future version.</p>
    </div>

    <div v-html="props.method.description"></div>

    <p v-if="props.method.since">
      <em>Available since v{{ props.method.since }}</em>
    </p>

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
          <a
            v-if="seeAlso.startsWith('faker.')"
            :href="seeAlsoToUrl(seeAlso)"
            v-html="seeAlso"
          />
          <template v-else v-html="seeAlso" />
        </li>
      </ul>
    </div>

    <div v-if="props.method.sourcePath">
      <a
        v-if="props.method.sourcePath"
        :href="sourceBaseUrl + props.method.sourcePath"
        target="_blank"
        class="source-link"
      >
        Source
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="1.2em"
          height="1.2em"
          class="source-link-icon"
        >
          <path
            d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
a.source-link {
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  align-items: center;
}

svg.source-link-icon {
  display: inline;
  margin-left: 0.3em;
}
</style>
