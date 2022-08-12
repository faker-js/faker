/**
 * This file exists, because vitest doesn't allow me to debug code outside of src and test.
 * And it's easier to test these features independently from the main project.
 */
import { analyzeSignature } from '../../../scripts/apidoc/signature';
import { loadExampleMethods } from './utils';

/* Run with `pnpm tsx test/scripts/apidoc/signature.debug.ts` */

const methods = loadExampleMethods();

Object.entries(methods).forEach(([name, method]) => {
  console.log('Analyzing: ', name);
  const result = analyzeSignature(method.signatures[0], null, method.name);
  console.log('Result: ', result);
});
