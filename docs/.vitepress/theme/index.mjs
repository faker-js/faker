import GlobalComponents from './components';
import DefaultTheme from 'vitepress/theme';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    for (const [name, component] of Object.entries(GlobalComponents)) {
      app.component(name, component);
    }
  },
};
