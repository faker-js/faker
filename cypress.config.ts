import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    fixturesFolder: false,
  },
});
