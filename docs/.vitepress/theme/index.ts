import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import Banner from '../components/Banner.vue';
import './index.css';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(Banner),
    });
  },
};
