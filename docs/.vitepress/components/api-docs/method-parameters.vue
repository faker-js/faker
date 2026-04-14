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
          <td>{{ type }}</td>
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
</style>
