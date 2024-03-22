export const DOC_CLASS_NAMES = ['Faker', 'SimpleFaker'];
export const DOC_INTERFACE_NAMES = ['Randomizer'];
export const DOC_UTILITY_NAMES = ['mergeLocales'];
export const DOC_MODULE_FILTER = (module: string): boolean =>
  module.endsWith('Module') && !module.startsWith('Simple');
