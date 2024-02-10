import { TypeFlags, type Type } from 'ts-morph';
import { atLeastOneAndAllRequired, required } from './utils';

export type RawApiDocsType =
  | RawApiDocsSimpleType
  | RawApiDocsGenericType
  | RawApiDocsUnionType;

export interface RawApiDocsSimpleType {
  type: 'simple';
  name: string;
  text: string;
}

export interface RawApiDocsGenericType {
  type: 'generic';
  name: string;
  typeParameters: RawApiDocsType[];
  text: string;
}

export interface RawApiDocsUnionType {
  type: 'union';
  types: RawApiDocsType[];
  text: string;
}

export function getNameSuffix(type: Type): string {
  return type.isNullable() ? '?' : '';
}

export function getTypeText(
  type: Type,
  options: {
    abbreviate?: boolean;
    stripUndefined?: boolean;
    resolveTypeParameters?: boolean;
    resolveAliases?: boolean;
  } = {}
): RawApiDocsType {
  const {
    abbreviate = false,
    stripUndefined = false,
    resolveTypeParameters = false,
    resolveAliases = false,
  } = options;

  if (
    type.isAny() ||
    type.isUnknown() ||
    type.isBoolean() ||
    type.isBooleanLiteral() ||
    type.isNumber() ||
    type.isNumberLiteral() ||
    type.getFlags() & TypeFlags.BigInt ||
    type.getFlags() & TypeFlags.ESSymbol ||
    type.isString() ||
    type.isUndefined() ||
    type.isNull() ||
    type.isVoid() ||
    type.isNever()
  ) {
    return newSimpleType(type.getText());
  } else if (type.isStringLiteral()) {
    return newSimpleType(type.getText().replace(/^"(.*)"$/, "'$1'"));
  } else if (type.isArray()) {
    return newArrayType(
      getTypeText(type.getArrayElementTypeOrThrow(), options)
    );
  }

  const symbol = type.getSymbol() ?? type.getAliasSymbol();
  if (!resolveAliases && symbol) {
    const name = symbol.getName();
    if (name !== '__type') {
      const typeArguments = [
        ...type.getTypeArguments(),
        ...type.getAliasTypeArguments(),
      ];

      if (name === 'LiteralUnion') {
        const typeParameters = typeArguments.map((t) =>
          getTypeText(t, options)
        );

        if (typeParameters.length === 1) {
          typeParameters.push(newSimpleType('string'));
        }

        return newUnionType(typeParameters);
      }

      const typeParameters = typeArguments.map((t) =>
        getTypeText(t, { ...options, resolveAliases: true })
      );

      if (typeParameters.length === 0) {
        return newSimpleType(name);
      }

      return newGenericType(name, typeParameters);
    }
  }

  if (type.isUnion()) {
    let unionTypes = type
      .getUnionTypes()
      .map((t) => getTypeText(t, options))
      .filter((t) => !stripUndefined || t.text !== 'undefined');

    if (
      unionTypes.some((t) => t.text === 'true') &&
      unionTypes.some((t) => t.text === 'false')
    ) {
      unionTypes = unionTypes.filter(
        (t) => t.text !== 'true' && t.text !== 'false'
      );
      unionTypes.push(newSimpleType('boolean'));
    }

    if (unionTypes.length === 1) {
      return unionTypes[0];
    }

    return newUnionType(unionTypes);
  }

  if (abbreviate && isOptionsLikeType(type)) {
    return newSimpleType('{ ... }');
  }

  if (resolveTypeParameters && type.isTypeParameter()) {
    const text = getTypeText(type.getApparentType());

    if (text.text === 'unknown') {
      return newSimpleType('any');
    }

    return text;
  }

  return newSimpleType(type.getText().replaceAll(/import\([^)]*\)\./g, ''));
}

export function isOptionsLikeType(type: Type): boolean {
  return (
    type.isObject() &&
    type.isAnonymous() &&
    type.getCallSignatures().length === 0 &&
    type.getTupleElements().length === 0
  );
}

function newSimpleType(name: string): RawApiDocsSimpleType {
  required(name, 'name');
  return { type: 'simple', name, text: name };
}

function newArrayType(typeParameter: RawApiDocsType): RawApiDocsGenericType {
  const { text } = required(typeParameter, 'array type');
  const useGeneric = text.includes('|') || text.includes('{');
  return {
    type: 'generic',
    name: 'Array',
    typeParameters: [typeParameter],
    text: useGeneric ? `Array<${text}>` : `${text}[]`,
  };
}

function newGenericType(
  name: string,
  typeParameters: RawApiDocsType[]
): RawApiDocsType {
  required(name, 'name');
  atLeastOneAndAllRequired(typeParameters, 'type parameters');
  return {
    type: 'generic',
    name: name,
    typeParameters,
    text: `${name}<${typeParameters.map((t) => t.text).join(', ')}>`,
  };
}

function newUnionType(types: RawApiDocsType[]): RawApiDocsUnionType {
  atLeastOneAndAllRequired(types, 'unions');
  return {
    type: 'union',
    types,
    text: types
      .map((t) => t.text)
      .map((t) =>
        // T | U -> (T | U)
        // But NOT Array<T | U> -> (Array<T | U>)
        // () => T -> (() => T)
        (t.includes('|') && !/^[A-Z]+<[^>]+>$/i.test(t)) || t.includes('(')
          ? `(${t})`
          : t
      )
      .join(' | '),
  };
}
