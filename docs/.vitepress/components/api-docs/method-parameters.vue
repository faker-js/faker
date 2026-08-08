<script setup lang="ts">
import type { ApiDocsMethodParameter } from './method';

const { parameters } = defineProps<{ parameters: ApiDocsMethodParameter[] }>();
</script>

<template>
  <div>
    <h3>Parameters</h3>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ name, description, type, default: def } of parameters"
          :key="name"
        >
          <td
            :class="{
              deprecated: description.includes('DEPRECATED'),
            }"
          >
            {{ name }}
          </td>
          <td class="type" v-html="type"></td>
          <td>
            <code v-if="def">{{ def }}</code>
          </td>
          <td v-html="description"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td.deprecated {
  text-decoration: line-through;
}

.type {
  font-family: var(--vp-font-family-mono);
}

/* `:deep` reaches the popover markup injected into the type column via v-html. */
.type :deep(.shadow-type-value) {
  font-family: inherit;
  font-size: inherit;
  color: var(--vp-c-brand-1);
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  cursor: help;
}

/* `display: none` overwrites VitePress' `.vp-doc` default of `inline`. */
.type :deep(.shadow-type-popover) {
  display: none;
  max-width: 20rem;
  margin: 0;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base);
  font-size: 0.875rem;
  line-height: 1.5;
  box-shadow: var(--vp-shadow-3);
}

.type :deep(.shadow-type-popover:popover-open) {
  display: block;
}

/* Position next to the trigger where anchor positioning is supported. */
@supports (anchor-name: --x) {
  .type :deep(.shadow-type-popover) {
    position: absolute;
    position-area: bottom span-right;
    margin-top: 4px;
  }
}
</style>
