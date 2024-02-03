import { type Type } from 'ts-morph';

export function getNameSuffix(type: Type): string {
  return type.isNullable() ? '?' : '';
}

export function getTypeText(
  type: Type,
  options: {
    abbreviate?: boolean;
    stripUndefined?: boolean;
    resolveTypeParameters?: boolean;
  } = {}
): string {
  const {
    abbreviate = false,
    stripUndefined = false,
    resolveTypeParameters = false,
  } = options;
  if (type.isArray()) {
    const elementTypeText = getTypeText(
      type.getArrayElementTypeOrThrow(),
      options
    );
    if (elementTypeText.includes('|') || elementTypeText.includes('{')) {
      return `Array<${elementTypeText}>`;
    }

    return `${elementTypeText}[]`;
  }

  if (type.isUnion()) {
    return type
      .getUnionTypes()
      .map((t) => getTypeText(t, options))
      .filter((t) => !stripUndefined || t !== 'undefined')
      .map((t) => (t.includes('|') || t.includes('(') ? `(${t})` : t))
      .sort()
      .join(' | ');
  }

  if (abbreviate && isOptionsLikeType(type)) {
    return '{ ... }';
  }

  if (resolveTypeParameters && type.isTypeParameter()) {
    const text = getTypeText(type.getApparentType());

    if (text === 'unknown') {
      return 'any';
    }

    return text;
  }

  return type.getText().replace(/import\("[^"]+"\)\./g, '');
}

export function isOptionsLikeType(type: Type): boolean {
  return (
    type.isObject() &&
    type.isAnonymous() &&
    type.getCallSignatures().length === 0 &&
    type.getTupleElements().length === 0
  );
}
