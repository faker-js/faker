import type { FakerCore } from '.';

/**
 * Global Registry for the Faker library, containing all module registries.
 */
export type FakerRegistry = Record<string, ModuleRegistry>;

/**
 * Per module registry containing the module's standalone functions.
 */
export type ModuleRegistry = Record<
  string,
  (fakerCore: FakerCore, ...args: never[]) => unknown
>;
