<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const { version } = defineProps<{
  version: string;
}>();

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

const dismiss = () => {
  localStorage.setItem(
    'faker-version-banner',
    (Date.now() + 8.64e7 * 1).toString() // current time + 1 day
  );
  document.documentElement.classList.add('banner-dismissed');
};
</script>

<template>
  <div ref="el" class="banner">
    <div class="text">
      These docs are of {{ version }}. For docs of the current version visit:
      <a href="https://fakerjs.dev/">fakerjs.dev</a>
    </div>

    <button type="button" @click="dismiss">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        />
      </svg>
    </button>
  </div>
</template>

<style>
.banner-dismissed {
  --vp-layout-top-height: 0px !important;
}

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
.banner-dismissed .banner {
  display: none;
}

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

  display: flex;
  justify-content: space-between;
}

.text {
  flex: 1;
}

a {
  text-decoration: underline;
}

svg {
  width: 20px;
  height: 20px;
  margin-left: 8px;
}
</style>
