import { type KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: ['src/**/*', 'test/**/*'],
      ignore: ['docs/**/*', 'scripts/**/*', '.prettierrc.d.ts', '.github/**/*'],
      ignoreDependencies: ['@actions/github', '@vueuse/core', 'vue'],
      ignoreBinaries: [],
    },
  },
};

export default config;
