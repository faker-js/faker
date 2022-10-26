import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './index.css';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () =>
        __BANNER__
          ? h(
              defineAsyncComponent(() => import('../components/Banner.vue')),
              { text: __BANNER__ }
            )
          : null,
    });
  },
};
