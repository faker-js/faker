import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './index.css';

export default {
  ...DefaultTheme,
  Layout() {
    return h(
      DefaultTheme.Layout,
      null,
      __BANNER__
        ? {
            'layout-top': () =>
              h(
                defineAsyncComponent(() => import('../components/Banner.vue')),
                { version: __BANNER__ }
              ),
          }
        : null
    );
  },
};
