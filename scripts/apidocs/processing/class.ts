import type { ClassDeclaration, InterfaceDeclaration, Project } from 'ts-morph';
import type { Task } from '../../logger';
import { required, valuesForKeys } from '../utils/value-checks';
import { newProcessingError } from './error';
import type { JSDocableLikeNode } from './jsdocs';
import {
  getDeprecated,
  getDescription,
  getExamples,
  getJsDocs,
} from './jsdocs';
import type { RawApiDocsMethod } from './method';
import {
  processClassConstructors,
  processClassMethods,
  processInterfaceMethods,
  processProjectFunctions,
} from './method';

/**
 * Represents a raw page in the API docs.
 */
export interface RawApiDocsPage {
  /**
   * The title of the page as shown to users.
   */
  title: string;
  /**
   * The title of the page in camel case as used in paths.
   */
  camelTitle: string;
  /**
   * The category of the page, if it has one.
   */
  category: string | undefined;
  /**
   * The deprecation notice of the page, if it has one.
   */
  deprecated: string | undefined;
  /**
   * The description of the page.
   */
  description: string;
  /**
   * The usage examples of the elements on the page.
   */
  examples: string[];
  /**
   * The api methods on the page.
   */
  methods: RawApiDocsMethod[];
}

// Classes

function getAllClasses(
  project: Project,
  filter: (name: string) => boolean = () => true
): Record<string, ClassDeclaration> {
  return Object.fromEntries(
    project
      .getSourceFiles()
      .flatMap((file) => file.getClasses())
      .map((clazz) => [clazz.getNameOrThrow(), clazz] as const)
      .filter(([name]) => filter(name))
  );
}

export function processProjectClasses(
  task: Task,
  project: Project
): RawApiDocsPage[] {
  return processClasses(
    task,
    valuesForKeys(getAllClasses(project), ['Faker', 'SimpleFaker'])
  );
}

function processClasses(
  task: Task,
  classes: ClassDeclaration[]
): RawApiDocsPage[] {
  return classes.map((clazz) => {
    try {
      return processClass(task, clazz);
    } catch (error) {
      throw newProcessingError({
        type: 'class',
        name: clazz.getNameOrThrow(),
        source: clazz,
        cause: error,
      });
    }
  });
}

export function processClass(
  task: Task,
  clazz: ClassDeclaration
): RawApiDocsPage {
  const result = processModule(task, clazz);
  result.methods.unshift(...processClassConstructors(task, clazz));
  return result;
}

// Modules

export function processModuleClasses(
  task: Task,
  project: Project
): RawApiDocsPage[] {
  return processModules(
    task,
    Object.values(
      getAllClasses(
        project,
        (module: string): boolean =>
          module.endsWith('Module') && !module.startsWith('Simple')
      )
    ).sort((a, b) => a.getNameOrThrow().localeCompare(b.getNameOrThrow()))
  );
}

function processModules(
  task: Task,
  modules: ClassDeclaration[]
): RawApiDocsPage[] {
  return modules.map((module) => {
    try {
      return processModule(task, module, 'Modules');
    } catch (error: unknown) {
      throw newProcessingError({
        type: 'module',
        name: getModuleName(module),
        source: module,
        cause: error,
      });
    }
  });
}

function processModule(
  task: Task,
  module: ClassDeclaration,
  category: string | undefined = undefined
): RawApiDocsPage {
  const title = getModuleName(module);

  return {
    ...preparePage(task, module, title, category),
    methods: processClassMethods(task, module),
  };
}

function getModuleName(module: ClassDeclaration): string {
  return required(module.getName(), 'module name').replace(/Module$/, '');
}

// Interfaces

function getAllInterfaces(
  project: Project
): Record<string, InterfaceDeclaration> {
  return Object.fromEntries(
    project
      .getSourceFiles()
      .flatMap((file) => file.getInterfaces())
      .map((iface) => [iface.getName(), iface] as const)
  );
}

export function processProjectInterfaces(
  task: Task,
  project: Project
): RawApiDocsPage[] {
  return processInterfaces(
    task,
    valuesForKeys(getAllInterfaces(project), ['Randomizer'])
  );
}

function processInterfaces(
  task: Task,
  interfaces: InterfaceDeclaration[]
): RawApiDocsPage[] {
  return interfaces.map((iface) => {
    try {
      return processInterface(task, iface);
    } catch (error) {
      throw newProcessingError({
        type: 'interface',
        name: iface.getName(),
        source: iface,
        cause: error,
      });
    }
  });
}

function processInterface(
  task: Task,
  iface: InterfaceDeclaration
): RawApiDocsPage {
  return {
    ...preparePage(task, iface, iface.getName()),
    methods: processInterfaceMethods(task, iface),
  };
}

// Utilities

export function processProjectUtilities(
  task: Task,
  project: Project
): RawApiDocsPage {
  task.update(`- Utilities`);

  return {
    title: 'Utilities',
    camelTitle: 'utils',
    category: undefined,
    deprecated: undefined,
    description: 'A list of all the utilities available in Faker.js.',
    examples: [],
    methods: processProjectFunctions(task, project, 'mergeLocales'),
  };
}

// Helpers

function preparePage(
  task: Task,
  module: JSDocableLikeNode,
  title: string,
  category: string | undefined = undefined
): RawApiDocsPage {
  task.update(`- ${title}`);

  const jsdocs = getJsDocs(module);

  return {
    title,
    camelTitle: toCamelCase(title),
    category,
    deprecated: getDeprecated(jsdocs),
    description: getDescription(jsdocs),
    examples: getExamples(jsdocs),
    methods: [],
  };
}

function toCamelCase(value: string): string {
  return value.substring(0, 1).toLowerCase() + value.substring(1);
}
