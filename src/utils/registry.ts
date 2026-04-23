import type { ModuleRegistry } from '../registry.types';
import { getDefaultRefDate } from './get-default-ref-date';
import { setDefaultRefDate } from './set-default-ref-date';

/**
 * Registry module containing all standalone utility functions for the Faker library.
 */
export const utilsModule = {
  getDefaultRefDate,
  setDefaultRefDate,
} as const satisfies ModuleRegistry;
