import type { FakerRegistry } from './registry.types';
import { utilsModule as utils } from './utils/registry';

// TODO @ST-DDT 2026-04-12: This file will be auto generated in a future PR.

/**
 * Global registry for the Faker library, containing all module registries with their standalone module functions.
 *
 * You normally don't need to access this registry unless you want to call `fake()` or other custom code needing to lookup standalone functions.
 *
 * @example
 * fake(fakerCore, 'The date is {{utils.getDefaultRefDate}}', [ fakerRegistry, fakerCore.locale.raw ]);
 */
export const fakerRegistry = {
  utils,
} as const satisfies FakerRegistry;
