<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const el = ref<HTMLElement>();
const { height } = useElementSize(el);

watchEffect(() => {
  if (height.value) {
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
  --vp-layout-top-height: 88px;
}

@media (min-width: 375px) {
  html {
    --vp-layout-top-height: 64px;
  }
}

@media (min-width: 768px) {
  html {
    --vp-layout-top-height: 40px;
  }
}
</style>

<style scoped>
.banner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--vp-z-index-layout-top);

  padding: 8px;
  text-align: center;

  background: #383636;
  color: #fff;
}

a {
  text-decoration: underline;
}
</style>
