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

  if (type.isStringLiteral()) {
    return type.getText().replace(/^"(.*)"$/, "'$1'");
  }

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
    let unionTypes = type
      .getUnionTypes()
      .map((t) => getTypeText(t, options))
      .filter((t) => !stripUndefined || t !== 'undefined');

    if (unionTypes.includes('true') && unionTypes.includes('false')) {
      unionTypes = unionTypes.filter((t) => t !== 'true' && t !== 'false');
      unionTypes.push('boolean');
    }

    if (unionTypes.length === 1) {
      return unionTypes[0];
    }

    return unionTypes
      .map((t) =>
        // T | U -> (T | U)
        // But NOT Array<T | U> -> (Array<T | U>)
        // () => T -> (() => T)
        (t.includes('|') && !/^[A-Z]+<[^>]+>$/i.test(t)) || t.includes('(')
          ? `(${t})`
          : t
      )
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
