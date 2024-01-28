import type { Type } from 'ts-morph';

export function getTypeText(type: Type): string {
  return type.getText().replace(/import\("[^"]+"\)\./g, '');
}
