export const DOC_CLASS_NAMES = ['Faker', 'SimpleFaker'];
export const DOC_INTERFACE_NAMES = ['Randomizer'];
export const DOC_UTILITY_NAMES = ['mergeLocales'];
export const DOC_MODULE_FILTER = (module: string): boolean =>
  module.endsWith('Module') && !module.startsWith('Simple');

// -----------------------------------------------------------------------------

// The following section is only there to debug our apidoc generation process.
// You can filter out the types and methods you want to debug by changing the filter functions.
// Do NOT commit changes to these filters to the repository.

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Debug: Checks whether the given type (class/module/interface) should be processed.
 *
 * @param name The name of the type to check.
 *
 * @returns True if the type should be processed, false otherwise.
 */
export function shouldProcessType(name: string): boolean {
  return true;
}

/**
 * Debug: Checks whether the given method should be processed.
 *
 * @param name The name of the method to check.
 *
 * @returns True if the method should be processed, false otherwise.
 */
export function shouldProcessMethod(name: string): boolean {
  return true;
}

/**
 * Debug: Checks whether the given signature should be processed.
 *
 * @param name The name of the method to check.
 * @param index The index of the signature in the method.
 *
 * @returns True if the signature should be processed, false otherwise.
 */
export function shouldProcessSignature(name: string, index: number): boolean {
  return true;
}

/**
 * Debug: Checks whether the given parameter should be processed.
 *
 * @param name The name of the parameter to check.
 *
 * @returns True if the parameter should be processed, false otherwise.
 */
export function shouldProcessParameter(name: string): boolean {
  return true;
}
