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
import { groupBy } from '../../../src/internal/group-by';
import type { Task } from '../../logger';
import { valuesForKeys } from '../utils/value-checks';
import { newProcessingError } from './error';
import type {
  RawApiDocsSignature,
  SignatureLikeDeclaration,
} from './signature';
import { processSignatures } from './signature';
import type { RawApiDocsSource } from './source';
import { getSourcePath as getSource } from './source';

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
   * The source of the method.
   */
  source: RawApiDocsSource;
}

// Constructors

export function processClassConstructors(
  task: Task,
  clazz: ClassDeclaration
): RawApiDocsMethod[] {
  return processConstructors(task, clazz.getConstructors());
}

function processConstructors(
  task: Task,
  constructors: ConstructorDeclaration[]
): RawApiDocsMethod[] {
  return processMethodLikes(task, constructors, () => 'constructor');
}

// Class Methods

export function processClassMethods(
  task: Task,
  clazz: ClassDeclaration
): RawApiDocsMethod[] {
  return processMethods(task, getAllMethods(clazz));
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
  task: Task,
  methods: NamedMethodLikeDeclaration[]
): RawApiDocsMethod[] {
  return processMethodLikes(task, methods, (v) => v.getName());
}

// Interface Methods

export function processInterfaceMethods(
  task: Task,
  iface: InterfaceDeclaration
): RawApiDocsMethod[] {
  return processMethodSignatures(task, iface.getMethods());
}

function processMethodSignatures(
  task: Task,
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

  return processMethods(task, methodLikes);
}

// Functions

function getAllFunctions(
  project: Project
): Record<string, FunctionDeclaration> {
  return Object.fromEntries(
    project
      .getSourceFiles()
      .flatMap((file) => file.getFunctions())
      .map((fn) => [fn.getNameOrThrow(), fn] as const)
  );
}

export function processProjectFunctions(
  task: Task,
  project: Project,
  ...names: string[]
): RawApiDocsMethod[] {
  return processMethodLikes(
    task,
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
  task: Task,
  methods: T[],
  nameResolver: (value: T) => string
): RawApiDocsMethod[] {
  return methods
    .filter((method) => !method.hasModifier(SyntaxKind.PrivateKeyword))
    .map((method) => {
      const name = nameResolver(method);
      try {
        return processMethodLike(task, name, method);
      } catch (error) {
        throw newProcessingError({
          type: 'method',
          name,
          source: method,
          cause: error,
        });
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function processMethodLike(
  task: Task,
  name: string,
  method: MethodLikeDeclaration
): RawApiDocsMethod {
  task.update(`  - ${name}`);
  const overloads = method.getOverloads();
  const signatureData: SignatureLikeDeclaration[] =
    overloads.length > 0 ? overloads : [method];

  const signatures = processSignatures(name, signatureData, method);
  const source = getSource(method);

  return {
    name,
    signatures,
    source,
  };
}
