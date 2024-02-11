/**
 * This file exists, because vitest doesn't allow me to debug code outside of src and test.
 * And it's easier to test these features independently from the main project.
 */
import { analyzeSignature } from '../../../scripts/apidoc/processing/signature';
import { initMarkdownRenderer } from '../../../scripts/apidoc/utils/markdown';
import { loadExampleMethods } from './utils';

/* Run with `pnpm tsx test/scripts/apidoc/signature.debug.ts` */

initMarkdownRenderer()
  .then(async () => {
    const methods = await loadExampleMethods();
    for (const [name, method] of Object.entries(methods)) {
      console.log('Analyzing:', name);
      const result = await analyzeSignature(method, '', method.name);
      console.log('Result:', result);
    }
  })
  .catch(console.error);
