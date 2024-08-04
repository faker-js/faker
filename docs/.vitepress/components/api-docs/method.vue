<script setup lang="ts">
import { sourceBaseUrl } from '../../../api/source-base-url';
import { slugify } from '../../shared/utils/slugify';
import type { ApiDocsMethod } from './method';
import MethodParameters from './method-parameters.vue';
import Tabs from './Tabs.vue';

const props = defineProps<{ method: ApiDocsMethod }>();

function seeAlsoToUrl(see: string): string {
  const [, module, method] = see.replace(/\(.*/, '').split('\.');
  if (!method) {
    return 'faker.html#' + slugify(module);
  }
  return module + '.html#' + slugify(method);
}
</script>

<template>
  <div>
    <Tabs title="Signatures:" :values="props.method.signatures">
      <template v-slot="{ value: signature }">
        <div v-if="signature.deprecated" class="warning custom-block">
          <p class="custom-block-title">Deprecated</p>
          <p>
            This method is deprecated and will be removed in a future version.
          </p>
          <span v-html="signature.deprecated" />
        </div>

        <div v-html="signature.description"></div>

        <p v-if="signature.since">
          <em>Available since v{{ signature.since }}</em>
        </p>

        <MethodParameters
          v-if="signature.parameters.length > 0"
          :parameters="signature.parameters"
        />

        <p><strong>Returns:</strong> {{ signature.returns }}</p>

        <p v-if="signature.throws">
          <strong>Throws:</strong> <span v-html="signature.throws" />
        </p>

        <div v-html="signature.signature" />

        <h3>Examples</h3>
        <div v-html="signature.examples" />

        <div v-if="signature.seeAlsos.length > 0">
          <h3>See Also</h3>
          <ul>
            <li v-for="seeAlso of signature.seeAlsos" :key="seeAlso">
              <a
                v-if="seeAlso.startsWith('faker.')"
                :href="seeAlsoToUrl(seeAlso)"
                v-html="seeAlso"
              />
              <div v-else v-html="seeAlso" />
            </li>
          </ul>
        </div>

        <div v-if="signature.sourcePath">
          <h3>Source</h3>
          <ul>
            <li>
              <a
                :href="sourceBaseUrl + signature.sourcePath"
                target="_blank"
                class="source-link"
              >
                View Source
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
            </li>
          </ul>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<style scoped>
a.source-link {
  display: flex;
  align-items: center;
}

svg.source-link-icon {
  display: inline;
  margin-left: 0.3em;
}
</style>
