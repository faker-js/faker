<script setup lang="ts">
import { deprecate } from 'util';
import type { MethodParameter } from './method';

const props = defineProps<{ parameters: MethodParameter[] }>();
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
        <tr v-for="parameter of props.parameters" :key="parameter.name">
          <td
            :class="{
              deprecated: parameter.description.includes('DEPRECATED'),
            }"
          >
            {{ parameter.name }}
          </td>
          <td>{{ parameter.type }}</td>
          <td>
            <code v-if="parameter.default">{{ parameter.default }}</code>
          </td>
          <td v-html="parameter.description"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td.deprecated {
  text-decoration: line-through;
}
</style>
