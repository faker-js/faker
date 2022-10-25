<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { inBrowser } from 'vitepress';
import { ref, watchEffect } from 'vue';

const el = ref<HTMLElement>();
const { height } = useElementSize(el);

watchEffect(() => {
  if (inBrowser) {
    document.documentElement.style.setProperty(
      '--vp-layout-top-height',
      `${height.value + 16}px`
    );
  }
});
</script>

<template>
  <div ref="el" class="banner">
    These docs are of the next (unreleased) version. For docs of the current
    version visit: <a href="https://fakerjs.dev/">fakerjs.dev</a>
  </div>
</template>

<style>
html {
  --vp-layout-top-height: 40px;
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: var(--vp-z-index-layout-top);
  top: 0;
  left: 0;
  right: 0;

  text-align: center;
  padding: 8px;

  background: #383636;
  color: #fff;
}

a {
  text-decoration: underline;
}
</style>
