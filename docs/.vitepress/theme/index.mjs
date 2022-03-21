import DefaultTheme from 'vitepress/theme';
import GlobalComponents from './components';
import './index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    for (const [name, component] of Object.entries(GlobalComponents)) {
      app.component(name, component);
    }
  },
};
