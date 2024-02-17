import type { ClassDeclaration, InterfaceDeclaration, Project } from 'ts-morph';
import { getAll } from '../project';
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
import {
  DOC_CLASS_NAMES,
  DOC_INTERFACE_NAMES,
  DOC_MODULE_FILTER,
  DOC_UTILITY_NAMES,
  shouldProcessType,
} from './select';

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
   * The category of the page.
   */
  category: string;
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
  return getAll(
    project,
    (s) => s.getClasses(),
    (c) => c.getNameOrThrow(),
    filter
  );
}

export function processProjectClasses(project: Project): RawApiDocsPage[] {
  return processClasses(valuesForKeys(getAllClasses(project), DOC_CLASS_NAMES));
}

function processClasses(classes: ClassDeclaration[]): RawApiDocsPage[] {
  return classes
    .filter((m) => shouldProcessType(m.getNameOrThrow()))
    .map((c) => {
      try {
        return processClass(c);
      } catch (error) {
        throw newProcessingError({
          type: 'class',
          name: c.getNameOrThrow(),
          source: c,
          cause: error,
        });
      }
    });
}

export function processClass(clazz: ClassDeclaration): RawApiDocsPage {
  const result = processModule(clazz, '');
  result.methods.unshift(...processClassConstructors(clazz));
  return result;
}

// Modules

export function processModuleClasses(project: Project): RawApiDocsPage[] {
  return processModules(
    Object.values(getAllClasses(project, (v) => DOC_MODULE_FILTER(v))).sort(
      (a, b) => a.getNameOrThrow().localeCompare(b.getNameOrThrow())
    )
  );
}

function processModules(modules: ClassDeclaration[]): RawApiDocsPage[] {
  return modules
    .filter((m) => shouldProcessType(getModuleName(m)))
    .map((m) => {
      try {
        return processModule(m, 'Modules');
      } catch (error: unknown) {
        throw newProcessingError({
          type: 'module',
          name: getModuleName(m),
          source: m,
          cause: error,
        });
      }
    });
}

function processModule(
  module: ClassDeclaration,
  category: string
): RawApiDocsPage {
  const title = getModuleName(module);

  return {
    ...preparePage(module, category, title),
    methods: processClassMethods(module),
  };
}

function getModuleName(module: ClassDeclaration): string {
  return required(module.getName(), 'module name').replace(/Module$/, '');
}

// Interfaces

function getAllInterfaces(
  project: Project
): Record<string, InterfaceDeclaration> {
  return getAll(
    project,
    (s) => s.getInterfaces(),
    (c) => c.getName()
  );
}

export function processProjectInterfaces(project: Project): RawApiDocsPage[] {
  return processInterfaces(
    valuesForKeys(getAllInterfaces(project), DOC_INTERFACE_NAMES)
  );
}

function processInterfaces(
  interfaces: InterfaceDeclaration[]
): RawApiDocsPage[] {
  return interfaces
    .filter((c) => shouldProcessType(c.getName()))
    .map((c) => {
      try {
        return processInterface(c);
      } catch (error) {
        throw newProcessingError({
          type: 'interface',
          name: c.getName(),
          source: c,
          cause: error,
        });
      }
    });
}

function processInterface(iface: InterfaceDeclaration): RawApiDocsPage {
  return {
    ...preparePage(iface, '', iface.getName()),
    methods: processInterfaceMethods(iface),
  };
}

// Utilities

export function processProjectUtilities(project: Project): RawApiDocsPage {
  console.log(`- Utilities`);

  return {
    title: 'Utilities',
    camelTitle: 'utils',
    category: '',
    deprecated: undefined,
    description: 'A list of all the utilities available in Faker.js.',
    examples: [],
    methods: shouldProcessType('Utilities')
      ? processProjectFunctions(project, ...DOC_UTILITY_NAMES)
      : [],
  };
}

// Helpers

function preparePage(
  module: JSDocableLikeNode,
  category: string,
  title: string
): RawApiDocsPage {
  console.log(`- ${title}`);

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
