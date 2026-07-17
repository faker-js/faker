import { Node, SyntaxKind, TypeFlags, type Type } from 'ts-morph';
import { atLeastOneAndAllRequired, required } from '../utils/value-checks';

export type RawApiDocsType =
  | RawApiDocsSimpleType
  | RawApiDocsGenericType
  | RawApiDocsUnionType
  | RawApiDocsObjectType
  | RawApiDocsShadowType;

interface RawApiDocsBaseType {
  type: string;
  text: string;
  /**
   * The description of this type, e.g. the JSDoc of the enum member backing a
   * shadow type value. Rendered as hoverable/clickable popover text in the docs.
   */
  description?: string;
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

export interface RawApiDocsObjectType extends RawApiDocsBaseType {
  type: 'object';
  members: RawApiDocsObjectMember[];
}

export interface RawApiDocsObjectMember {
  name: string;
  type: RawApiDocsType;
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

      switch (name) {
        case 'LiteralUnion': {
          const displayType = getTypeText(typeArguments[0], options);
          const baseType = typeArguments[1]
            ? getTypeText(typeArguments[1], options)
            : newSimpleType('string');

          return newUnionType([displayType, baseType]);
        }

        case 'NumberRange': {
          return newObjectType([
            { name: 'min', type: newSimpleType('number') },
            { name: 'max', type: newSimpleType('number') },
          ]);
        }

        case 'NumberOrRange': {
          return newUnionType([
            newSimpleType('number'),
            newObjectType([
              { name: 'min', type: newSimpleType('number') },
              { name: 'max', type: newSimpleType('number') },
            ]),
          ]);
        }

        default: {
          break;
        }
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

/**
 * Checks whether the given type is a named range type (e.g. `NumberRange`)
 * whose members should be expanded into individual parameter rows in the docs.
 *
 * @param type The type to check.
 */
export function isRangeType(type: Type): boolean {
  const symbol = type.getSymbol() ?? type.getAliasSymbol();
  return symbol?.getName() === 'NumberRange';
}

/**
 * Resolves the per-value descriptions backing a shadow type.
 *
 * A shadow type is a string-literal alias (e.g. `LengthStrategyType`) whose
 * values come from an enum (e.g. `` LengthStrategyType = `${LengthStrategy}` ``).
 * TypeScript resolves the template literal eagerly, so the enum member JSDoc is
 * no longer reachable via the resolved `Type`. It is however still reachable via
 * the syntactic type node, which is what this function walks:
 *
 * ```txt
 * TypeReference "LengthStrategyType"
 *   -> TypeAliasDeclaration (following the import)
 *   -> `${LengthStrategy}` -> EnumDeclaration
 *   -> member value + JSDoc
 * ```
 *
 * @param typeNode The syntactic type node of the parameter/property, if any.
 *
 * @returns A map from enum member value (e.g. `'fail'`) to its JSDoc description.
 */
export function getShadowTypeDescriptions(
  typeNode: Node | undefined
): Map<string, string> {
  const descriptions = new Map<string, string>();
  if (!Node.isTypeReference(typeNode)) {
    return descriptions;
  }

  const aliasSymbol = resolveSymbol(typeNode.getTypeName().getSymbol());
  const aliasDeclaration = aliasSymbol?.getDeclarations()?.[0];
  if (!aliasDeclaration || !Node.isTypeAliasDeclaration(aliasDeclaration)) {
    return descriptions;
  }

  const aliasTypeNode = aliasDeclaration.getTypeNodeOrThrow();
  const enumReferences = [
    ...(Node.isTypeReference(aliasTypeNode) ? [aliasTypeNode] : []),
    ...aliasTypeNode.getDescendantsOfKind(SyntaxKind.TypeReference),
  ];

  for (const enumReference of enumReferences) {
    const enumSymbol = resolveSymbol(enumReference.getTypeName().getSymbol());
    const enumDeclaration = enumSymbol?.getDeclarations()?.[0];
    if (!enumDeclaration || !Node.isEnumDeclaration(enumDeclaration)) {
      continue;
    }

    for (const member of enumDeclaration.getMembers()) {
      const value = member.getValue();
      const description = member.getJsDocs().at(-1)?.getDescription().trim();
      if (typeof value === 'string' && description) {
        descriptions.set(value, description);
      }
    }
  }

  return descriptions;
}

/**
 * Attaches the given per-value descriptions to the matching members of a type.
 *
 * @param type The type to enrich (mutated in place).
 * @param descriptions The per-value descriptions, see {@link getShadowTypeDescriptions}.
 *
 * @returns The enriched type, for convenience.
 */
export function attachShadowTypeDescriptions(
  type: RawApiDocsType,
  descriptions: Map<string, string>
): RawApiDocsType {
  if (descriptions.size === 0) {
    return type;
  }

  const members = type.type === 'union' ? type.types : [type];
  for (const member of members) {
    const value = member.text.replace(/^'(.*)'$/, '$1');
    const description = descriptions.get(value);
    if (description) {
      member.description = description;
    }
  }

  return type;
}

/**
 * Follows import specifiers to the symbol of the actual declaration.
 *
 * @param symbol The symbol to resolve.
 */
function resolveSymbol<T extends { getAliasedSymbol(): T | undefined }>(
  symbol: T | undefined
): T | undefined {
  return symbol?.getAliasedSymbol() ?? symbol;
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

function newObjectType(
  members: RawApiDocsObjectMember[]
): RawApiDocsObjectType {
  atLeastOneAndAllRequired(members, 'members');
  return {
    type: 'object',
    members,
    text: `{ ${members.map(({ name, type }) => `${name}: ${type.text}`).join('; ')} }`,
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
