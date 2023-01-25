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
      <p>This method is deprecated and will be removed in a future version.</p>
    </div>

    <div v-html="props.method.description"></div>

    <div v-if="props.method.since || props.method.sourceLink">
      <p style="display: flex">
        <em v-if="props.method.since"
          >Available since v<span v-html="props.method.since"
        /></em>
        <a
          v-if="props.method.sourceLink"
          :href="props.method.sourceLink"
          style="margin-left: auto"
          target="_blank"
          >Goto Source</a
        >
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
          <a
            v-if="seeAlso.startsWith('faker.')"
            :href="seeAlsoToUrl(seeAlso)"
            v-html="seeAlso"
          />
          <template v-else v-html="seeAlso" />
        </li>
      </ul>
    </div>
  </div>
</template>
