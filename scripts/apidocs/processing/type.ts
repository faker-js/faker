import { TypeFlags, type Type } from 'ts-morph';
import { atLeastOneAndAllRequired, required } from '../utils/value-checks';

export type RawApiDocsType =
  | RawApiDocsSimpleType
  | RawApiDocsGenericType
  | RawApiDocsUnionType
  | RawApiDocsShadowType;

interface RawApiDocsBaseType {
  type: string;
  text: string;
}

export interface RawApiDocsSimpleType extends RawApiDocsBaseType {
  type: 'simple';
}

export interface RawApiDocsGenericType extends RawApiDocsBaseType {
  type: 'generic';
  typeParameters: RawApiDocsType[];
}

export interface RawApiDocsUnionType extends RawApiDocsBaseType {
  type: 'union';
  types: RawApiDocsType[];
}

export interface RawApiDocsShadowType extends RawApiDocsBaseType {
  type: 'shadow';
  resolvedType: RawApiDocsType;
}

export function getNameSuffix(type: Type): string {
  return type.isNullable() ? '?' : '';
}

export function getTypeText(
  type: Type,
  options: {
    abbreviate?: boolean;
    stripUndefined?: boolean;
    resolveAliases?: boolean;
  } = {}
): RawApiDocsType {
  const {
    abbreviate = false,
    stripUndefined = false,
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
  } else if (stripUndefined && type.isNullable()) {
    return getTypeText(type.getNonNullableType(), options);
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
        const displayType = getTypeText(typeArguments[0], options);
        const baseType = typeArguments[1]
          ? getTypeText(typeArguments[1], options)
          : newSimpleType('string');

        return newUnionType([displayType, baseType]);
      }

      const typeParameters = typeArguments.map((t) => getTypeText(t, options));

      if (typeParameters.length === 0) {
        const resolvedType = getTypeText(type, {
          ...options,
          resolveAliases: true,
        });

        if (name === resolvedType.text) {
          return newSimpleType(name);
        }

        return newShadowType(name, resolvedType);
      }

      return newGenericType(name, typeParameters);
    }
  }

  if (type.isUnion()) {
    let unionTypes = type
      .getUnionTypes()
      .map((unionType) => getTypeText(unionType, options))
      .filter((unionType) => !stripUndefined || unionType.text !== 'undefined');

    const trueIndex = unionTypes.findIndex(
      (unionType) => unionType.text === 'true'
    );
    if (
      trueIndex !== -1 &&
      unionTypes.some((unionType) => unionType.text === 'false')
    ) {
      unionTypes[trueIndex] = newSimpleType('boolean');
      unionTypes = unionTypes.filter(
        (unionType) => unionType.text !== 'true' && unionType.text !== 'false'
      );
    }

    if (unionTypes.length === 1) {
      return unionTypes[0];
    }

    return newUnionType(unionTypes);
  }

  if (abbreviate && isOptionsLikeType(type)) {
    return newSimpleType('{ ... }');
  }

  if (resolveAliases && type.isTypeParameter()) {
    const text = getTypeText(type.getApparentType(), {
      ...options,
      resolveAliases: true,
    });

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
  return { type: 'simple', text: name };
}

function newArrayType(typeParameter: RawApiDocsType): RawApiDocsGenericType {
  const { text } = required(typeParameter, 'array type');
  const useGeneric = text.includes('|') || text.includes('{');
  return {
    type: 'generic',
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
      .map((type) => type.text)
      .map((text) =>
        // Remove LiteralUnion shadow types
        text.endsWith(' & { zz_IGNORE_ME?: undefined; }')
          ? text.slice(0, -32)
          : text
      )
      .map((text) => {
        // () => T -> (() => T)
        const isFunctionSignature = text.startsWith('(');
        return isFunctionSignature ? `(${text})` : text;
      })
      .join(' | '),
  };
}

function newShadowType(
  displayText: string,
  resolvedType: RawApiDocsType
): RawApiDocsShadowType {
  required(displayText, 'display text');
  required(resolvedType, 'resolved type');
  return {
    type: 'shadow',
    resolvedType,
    text: displayText,
  };
}
