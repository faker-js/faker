import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import AsideSponsors from '../components/AsideSponsors.vue';
import './index.css';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': __BANNER__
        ? () =>
            h(
              defineAsyncComponent(() => import('../components/Banner.vue')),
              { version: __BANNER__ }
            )
        : null,
      'aside-ads-before': () => h(AsideSponsors),
    });
  },
};
