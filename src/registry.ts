import type { FakerCore } from '.';
import { utilsModule as utils } from './utils/registry';

// TODO @ST-DDT 2026-04-12: This file will be auto generated in a future PR.

/**
 * Global Registry for the Faker library, containing all module registries.
 */
type FakerRegistry = Record<
  string,
  Record<string, (fakerCore: FakerCore, ...args: never[]) => unknown>
>;

/**
 * Global registry for the Faker library, containing all module registries with their standalone module functions.
 */
export const fakerRegistry = {
  utils,
} satisfies FakerRegistry;
