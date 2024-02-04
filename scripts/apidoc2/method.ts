import type {
  ClassDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  MethodSignature,
  Project,
} from 'ts-morph';
import {
  SyntaxKind,
  type ConstructorDeclaration,
  type MethodDeclaration,
} from 'ts-morph';
import { groupBy } from '../../src/internal/group-by';
import { getAll } from './project';
import type {
  RawApiDocsSignature,
  SignatureLikeDeclaration,
} from './signature';
import { processSignature } from './signature';
import { getSourcePath } from './source';
import { valuesForKeys } from './utils';

/**
 * Represents a  method in the raw API docs.
 */
export interface RawApiDocsMethod {
  /**
   * The name of the method.
   */
  name: string;
  /**
   * The signatures of the method.
   */
  signatures: RawApiDocsSignature[];
  /**
   * The relative path to the source file followed by the line number and column.
   *
   * @example
   * `src/faker.ts:123:45`
   */
  sourcePath: string;
}

// Constructors

export function processClassConstructors(
  clazz: ClassDeclaration
): RawApiDocsMethod[] {
  return processConstructors(clazz.getConstructors());
}

function processConstructors(
  constructors: ConstructorDeclaration[]
): RawApiDocsMethod[] {
  return processMethodLikes(constructors, () => 'constructor');
}

// Class Methods

export function processClassMethods(
  clazz: ClassDeclaration
): RawApiDocsMethod[] {
  return processMethods(getAllMethods(clazz));
}

function getAllMethods(clazz: ClassDeclaration): MethodDeclaration[] {
  const parents: ClassDeclaration[] = [clazz];
  let parent: ClassDeclaration | undefined = clazz;
  while ((parent = parent.getBaseClass()) != null) {
    parents.unshift(parent);
  }

  const methods: Record<string, MethodDeclaration> = {};

  for (const parent of parents) {
    for (const method of parent.getMethods()) {
      methods[method.getName()] = method;
    }
  }

  return Object.values(methods).sort((a, b) =>
    a.getName().localeCompare(b.getName())
  );
}

type NamedMethodLikeDeclaration = MethodLikeDeclaration &
  Pick<MethodDeclaration, 'getName'>;

function processMethods(
  methods: NamedMethodLikeDeclaration[]
): RawApiDocsMethod[] {
  return processMethodLikes(methods, (v) => v.getName());
}

// Interface Methods

export function processInterfaceMethods(
  iface: InterfaceDeclaration
): RawApiDocsMethod[] {
  return processMethodSignatures(iface.getMethods());
}

function processMethodSignatures(
  methods: MethodSignature[]
): RawApiDocsMethod[] {
  const groupedSignatures = groupBy(methods, (v) => v.getName());

  const methodLikes: NamedMethodLikeDeclaration[] = Object.values(
    groupedSignatures
  ).map((signatures) => {
    const signature = signatures[0];

    return {
      getName: () => signature.getName(),
      hasModifier: () => false,
      getOverloads: () => signatures,
      getTypeParameters: () => signature.getTypeParameters(),
      getParameters: () => signature.getParameters(),
      getReturnType: () => signature.getReturnType(),
      getJsDocs: () => signature.getJsDocs(),
      getSourceFile: () => signature.getSourceFile(),
      getStart: () => signature.getStart(),
      getText: () => signature.getText(),
    };
  });

  return processMethods(methodLikes);
}

// Functions

function getAllFunctions(
  project: Project
): Record<string, FunctionDeclaration> {
  return getAll(
    project,
    (sourceFile) => sourceFile.getFunctions(),
    (v) => v.getNameOrThrow()
  );
}

export function processProjectFunctions(
  project: Project,
  ...names: string[]
): RawApiDocsMethod[] {
  return processMethodLikes(
    valuesForKeys(getAllFunctions(project), names),
    (f) => f.getNameOrThrow()
  );
}

// Method-likes

type MethodLikeDeclaration = SignatureLikeDeclaration &
  Pick<MethodDeclaration, 'hasModifier'> & {
    getOverloads(): SignatureLikeDeclaration[];
  };

function processMethodLikes<T extends MethodLikeDeclaration>(
  signatures: T[],
  nameResolver: (v: T) => string
): RawApiDocsMethod[] {
  const apiSignatures = signatures.filter(
    (m) => !m.hasModifier(SyntaxKind.PrivateKeyword)
  );
  return apiSignatures
    .map((v) => {
      const name = nameResolver(v);
      try {
        return processMethodLike(name, v);
      } catch (error) {
        throw new Error(
          `Error processing method ${name} at ${getSourcePath(v)}`,
          {
            cause: error,
          }
        );
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function processMethodLike(
  name: string,
  method: MethodLikeDeclaration
): RawApiDocsMethod {
  console.log(`  - ${name}`);
  const signatures = method.getOverloads();
  const apiSignatures: SignatureLikeDeclaration[] =
    signatures.length > 0 ? signatures : [method];

  const apiDocsSignatures = apiSignatures.map((v, i) => {
    try {
      return processSignature(v);
    } catch (error) {
      throw new Error(
        `Error processing signature ${name}/${i} at ${getSourcePath(v)}}`,
        { cause: error }
      );
    }
  });
  const sourcePath = getSourcePath(method);

  return {
    name,
    signatures: apiDocsSignatures,
    sourcePath,
  };
}
