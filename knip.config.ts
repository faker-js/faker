import { type KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: ['src/**/*', 'test/**/*'],
      ignore: [],
      ignoreDependencies: [],
      ignoreBinaries: [],
    },
  },
};

export default config;
