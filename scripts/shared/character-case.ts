export function toKebabCase(...values: string[]): string {
  return values
    .join('-')
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
    .replaceAll(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toCamelCase(...values: string[]): string {
  const text = values
    .flatMap((value) => value.split(/[\s_-]+/))
    .map(toPascalCase)
    .join('');
  return text.substring(0, 1).toLowerCase() + text.substring(1);
}

export function toPascalCase(value: string): string {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}
