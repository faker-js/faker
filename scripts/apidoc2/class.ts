import type { ClassDeclaration, InterfaceDeclaration, Project } from 'ts-morph';
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
} from './method';
import { getAll } from './project';
import { getSourcePath } from './source';
import { required, valuesForKeys } from './utils';

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

export function processProjectClasses(
  project: Project,
  ...names: string[]
): RawApiDocsPage[] {
  return processClasses(valuesForKeys(getAllClasses(project), names));
}

function processClasses(classes: ClassDeclaration[]): RawApiDocsPage[] {
  return classes.map((c) => {
    try {
      return processClass(c);
    } catch (error) {
      throw new Error(
        `Error processing class ${c.getNameOrThrow()} at ${getSourcePath(c)}`,
        {
          cause: error,
        }
      );
    }
  });
}

function processClass(clazz: ClassDeclaration): RawApiDocsPage {
  const result = processModule(clazz, '');
  result.methods.unshift(...processClassConstructors(clazz));
  return result;
}

// Modules

export function processModuleClasses(project: Project): RawApiDocsPage[] {
  return processModules(
    Object.values(
      getAllClasses(
        project,
        (name) => name.endsWith('Module') && !name.startsWith('Simple')
      )
    ).sort((a, b) => a.getNameOrThrow().localeCompare(b.getNameOrThrow()))
  );
}

function processModules(modules: ClassDeclaration[]): RawApiDocsPage[] {
  return modules.map((v) => {
    try {
      return processModule(v, 'Modules');
    } catch (error: unknown) {
      throw new Error(
        `Error processing module ${v.getName()} at ${getSourcePath(v)}`,
        {
          cause: error,
        }
      );
    }
  });
}

function processModule(
  module: ClassDeclaration,
  category: string
): RawApiDocsPage {
  const title = required(module.getNameOrThrow(), 'module name').replace(
    /Module$/,
    ''
  );

  return {
    ...preparePage(module, category, title),
    methods: processClassMethods(module),
  };
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

export function processProjectInterfaces(
  project: Project,
  ...names: string[]
): RawApiDocsPage[] {
  return processInterfaces(valuesForKeys(getAllInterfaces(project), names));
}

function processInterfaces(
  interfaces: InterfaceDeclaration[]
): RawApiDocsPage[] {
  return interfaces.map((c) => {
    try {
      return processInterface(c);
    } catch (error) {
      throw new Error(
        `Error processing interface ${c.getName()} at ${getSourcePath(c)}`,
        {
          cause: error,
        }
      );
    }
  });
}

function processInterface(iface: InterfaceDeclaration): RawApiDocsPage {
  return {
    ...preparePage(iface, '', iface.getName()),
    methods: processInterfaceMethods(iface),
  };
}

// Helpers

function preparePage(
  module: JSDocableLikeNode,
  category: string,
  title: string
): RawApiDocsPage {
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
