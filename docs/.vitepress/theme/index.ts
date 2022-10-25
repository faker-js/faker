import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './index.css';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () =>
        __MAIN__
          ? null
          : h(defineAsyncComponent(() => import('../components/Banner.vue'))),
    });
  },
};
