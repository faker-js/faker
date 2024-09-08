import { defineConfig } from '@visulima/packem/config';
import transformer from '@visulima/packem/transformer/esbuild';

export default defineConfig({
  minify: true,
  transformer,
  cjsInterop: true,
  rollup: {
    node10Compatibility: {
      writeToPackageJson: true,
    },
  },
});
