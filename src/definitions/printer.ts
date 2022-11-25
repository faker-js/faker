import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to print.
 */
export type PrinterDefinitions = LocaleEntry<{
  brand: string[];
  name: string[];
  type: string[];
  functions: string[];
  colorOutput: string[];
  use: string[];
  connectivity: string[];
  paperSize: string[];
  features: string[];
}>;
