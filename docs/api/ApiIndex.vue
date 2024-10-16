<!-- This content is mostly copied over from https://github.com/vuejs/docs/blob/main/src/api/ApiIndex.vue -->

<script setup lang="ts">
import { computed, ref } from 'vue';
import { slugify } from '../.vitepress/shared/utils/slugify';
import apiSearchIndex from './api-search-index.json';
import type { APIGroup } from './api-types';

const query = ref('');
const normalize = (s: string) => s.toLowerCase().replace(/-/g, ' ');

const filtered = computed(() => {
  const q = normalize(query.value);
  const matches = (text: string) => normalize(text).includes(q);

  return (apiSearchIndex as APIGroup[])
    .map((section) => {
      // section title match
      if (matches(section.text)) {
        return section;
      }

      // filter groups
      const matchedGroups = section.items
        .map((item) => {
          // group title match
          if (matches(item.text)) {
            return item;
          }
          // filter headers
          const matchedHeaders = item.headers.filter(
            ({ text, anchor }) => matches(text) || matches(anchor)
          );
          return matchedHeaders.length
            ? { text: item.text, link: item.link, headers: matchedHeaders }
            : null;
        })
        .filter((i) => i);

      return matchedGroups.length
        ? { text: section.text, items: matchedGroups }
        : null;
    })
    .filter((i) => i) as APIGroup[];
});
</script>

<template>
  <div id="api-index">
    <div class="header">
      <h1>API Reference</h1>
      <div class="api-filter">
        <label for="api-filter">Filter</label>
        <input
          type="search"
          placeholder="Enter keyword"
          id="api-filter"
          v-model="query"
        />
      </div>
    </div>

    <div v-for="section of filtered" :key="section.text" class="api-section">
      <h2 :id="slugify(section.text)">{{ section.text }}</h2>
      <div class="api-groups">
        <div v-for="item of section.items" :key="item.text" class="api-group">
          <h3>
            <a :href="item.link">{{ item.text }}</a>
          </h3>
          <ul>
            <li v-for="h of item.headers" :key="h.anchor">
              <!-- TODO @ST-DDT 2024-09-25: Remove this in v10 -->
              <a
                :href="
                  item.link +
                  '#' +
                  (h.anchor === 'userName' ? 'username-1' : slugify(h.anchor))
                "
                :class="{ deprecated: h.deprecated }"
                >{{ h.text }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="!filtered.length" class="no-match">
      No API matching "{{ query }}" found.
    </div>
  </div>
</template>

<style scoped>
#api-index {
  max-width: 1024px;
  margin: 0px auto;
  padding: 64px 32px;
}

h1,
h2,
h3 {
  font-weight: 600;
  line-height: 1;
}

h1,
h2 {
  letter-spacing: -0.02em;
}

h1 {
  font-size: 38px;
}

h2 {
  font-size: 24px;
  color: var(--vp-c-text-1);
  margin: 36px 0;
  transition: color 0.5s;
  padding-top: 36px;
  border-top: 1px solid var(--vp-c-divider-light);
}

h3 {
  letter-spacing: -0.01em;
  color: var(--vp-c-brand-1);
  font-size: 18px;
  margin-bottom: 1em;
  transition: color 0.5s;
}

.api-section {
  margin-bottom: 64px;
}

.api-groups ul a {
  font-size: 15px;
  font-weight: 500;
  line-height: 2;
  color: var(--vp-c-text-code);
  transition: color 0.5s;
}

.api-groups ul a.deprecated {
  text-decoration: line-through;
}

.dark .api-groups ul a {
  font-weight: 400;
}

.api-groups ul a:hover {
  color: var(--vp-c-brand-1);
  transition: none;
}

.api-group {
  break-inside: avoid;
  overflow: auto;
  margin-bottom: 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 28px 32px;
  transition: background-color 0.5s;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.api-filter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

.api-filter input {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 12px;
}

.api-filter:focus {
  border-color: var(--vp-c-brand-2);
}

.no-match {
  font-size: 1.2em;
  color: var(--vp-c-text-3);
  text-align: center;
  margin-top: 36px;
  padding-top: 36px;
  border-top: 1px solid var(--vp-c-divider-light);
}

@media (max-width: 768px) {
  #api-index {
    padding: 42px 24px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 22px;
    margin: 42px 0 32px;
    padding-top: 32px;
  }

  .api-groups ul a {
    font-size: 14px;
  }

  .header {
    display: block;
  }
}

@media (min-width: 768px) {
  .api-groups {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .api-groups {
    columns: 3;
  }
}
</style>
