import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ClassDeclaration, MethodDeclaration, Project } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import { newProcessingError } from './apidocs/processing/error';
import type { SignatureLikeDeclaration } from './apidocs/processing/signature';
import { getProject } from './apidocs/project';
import { required } from './apidocs/utils/value-checks';
import { ImportHelper } from './module-tree/import-helper';
import {
  toCamelCase,
  toKebabCase,
  toPascalCase,
} from './shared/character-case';
import { formatTypescript } from './shared/format';
import { FILE_PATH_SRC } from './shared/paths';
import { ALLOWED_MODULES } from './temp-module-filter';

const coreName = 'fakerCore';

const moduleArg = process.argv[2];
const moduleCondition =
  moduleArg == null
    ? () => true
    : (module: string) => module === toPascalCase(`${moduleArg}Module`);

// Run the script

await generate();

async function generate(): Promise<void> {
  console.log('Reading project');
  const project = getProject();
  console.log('Processing modules');
  await processModuleClasses(project);
}

// Modules

export async function processModuleClasses(project: Project): Promise<void> {
  await processModules(
    Object.values(
      getAllClasses(
        project,
        (module: string): boolean =>
          module.endsWith('Module') &&
          !module.startsWith('Simple') &&
          !ALLOWED_MODULES.has(module) &&
          moduleCondition(module)
      )
    ).toSorted((a, b) => a.getNameOrThrow().localeCompare(b.getNameOrThrow()))
  );
}

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

async function processModules(modules: ClassDeclaration[]): Promise<void> {
  for (const module of modules) {
    try {
      await processModule(module);
    } catch (error: unknown) {
      throw newProcessingError({
        type: 'module',
        name: getModuleName(module),
        source: module,
        cause: error,
      });
    }
  }
}

async function processModule(module: ClassDeclaration): Promise<void> {
  const moduleName = getModuleName(module);
  console.log(`Processing module: ${moduleName}`);
  await processClassMethods(module, moduleName, getImports(module));
}

function getModuleName(module: ClassDeclaration): string {
  return required(module.getName(), 'module name').replace(/Module$/, '');
}

function getImports(module: ClassDeclaration): string {
  return module
    .getSourceFile()
    .getImportDeclarations()
    .map((importDecl) => importDecl.getText())
    .join('\n');
}

export async function processClassMethods(
  clazz: ClassDeclaration,
  moduleName: string,
  imports: string
): Promise<void> {
  await processMethods(getAllMethods(clazz), moduleName, imports);
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

  return Object.values(methods).toSorted((a, b) =>
    a.getName().localeCompare(b.getName())
  );
}

async function processMethods(
  methods: MethodDeclaration[],
  moduleName: string,
  imports: string
): Promise<void> {
  for (const method of methods) {
    if (method.hasModifier(SyntaxKind.PrivateKeyword)) {
      continue;
    }

    const name = method.getName();
    try {
      await processMethod(moduleName, name, method, imports);
    } catch (error) {
      throw newProcessingError({
        type: 'method',
        name,
        source: method,
        cause: error,
      });
    }
  }
}

async function processMethod(
  moduleName: string,
  name: string,
  method: MethodDeclaration,
  imports: string
): Promise<void> {
  if (name === 'fake') {
    return;
  }

  console.log(`  - ${name}`);

  // Get all signatures (overloads) and implementation
  const overloads = method.getOverloads();
  const signatureDeclarations: SignatureLikeDeclaration[] =
    overloads.length > 0 ? [...overloads, method] : [method];

  const importHelper = new ImportHelper();
  importHelper.addTypeImports('../../core', 'FakerCore');
  importHelper.addImports('../../faker', 'Faker');
  importHelper.addImports(
    '../../utils/get-default-ref-date',
    'getDefaultRefDate'
  );

  importHelper.addImportFromLines(imports);

  let fileBody = '';

  const moduleDocsReplacer: (substring: string, ...args: string[]) => string = (
    _: string,
    module: string,
    method: string,
    closer: string = ', '
  ) => {
    if (module === toCamelCase(moduleName)) {
      return `${method}(${coreName}${closer}`;
    }

    return `${toCamelCase(module, method)}(${coreName}${closer}`;
  };

  for (const signature of signatureDeclarations) {
    let jsdocs = signature.getJsDocs()[0]?.getText().trim() ?? '';
    let code = signature.getText().trim();

    jsdocs = jsdocs
      .replace(
        /(\* @(?!template)|\*\/)/,
        `* @param ${coreName} The FakerCore to use.\n   $1`
      )
      .replace(/(@param .*)\n *\* (@see|@example)/, `$1\n *\n * $2`)
      .replace(/@since (.+)/, '@since 11.0.0\n *\n * @experimental')
      // Replace calls to faker.defaultRefDate() in jsdocs (mostly defaults)
      .replaceAll(
        /\bfaker\.defaultRefDate\(\)/g,
        'getDefaultRefDate(fakerCore)'
      )
      // Calls to modules in jsdocs (mostly examples)
      .replaceAll(/\bfaker\.(\w+)\.(\w+)\((\))?/g, moduleDocsReplacer)
      // Rename sample() to moduleSample()
      .replaceAll(/\bsample\(/g, `${toCamelCase(moduleName)}Sample(`);

    const moduleCallReplacer: (
      substring: string,
      ...args: string[]
    ) => string = (
      _: string,
      module: string,
      method: string,
      closer: string = ', '
    ) => {
      if (module === 'this') {
        module = moduleName;
      }

      if (module === moduleName && method === name) {
        return `${name}(${coreName}${closer}`;
      }

      if (method === 'fake') {
        importHelper.flagAsValueImports('Faker');
        return `new Faker(${coreName}).helpers.fake(`;
      }

      const asName = code.includes(`${method} =`)
        ? toCamelCase(module, method)
        : method;

      importHelper.addImports(
        `../${toCamelCase(module)}/${toKebabCase(method)}`,
        asName === method ? asName : `${method} as ${asName}`
      );
      return `${asName}(${coreName}${closer}`;
    };

    // Option Parameter Defaults
    code = code.replaceAll(
      /(?<= +\* .*?)\bfaker\.(\w+)\.(\w+)\((\))?/g,
      moduleDocsReplacer
    );

    // Add core parameter and export keyword
    code = code
      .replaceAll(
        new RegExp(`^${name}(<.*>)?\\(`, 'gm'),
        `export function ${name}$1(${coreName}: FakerCore, `
      )
      .replaceAll(', ):', '):');

    // Rename sample() to moduleSample()
    code = code.replaceAll(/\bsample\(/g, `${toCamelCase(moduleName)}Sample(`);

    // Calls to other modules
    code = code.replaceAll(
      /\b(?:this\.)?faker\.(\w+)\s*\.(\w+)\((\))?/g,
      moduleCallReplacer
    );

    // Calls to own module
    code = code.replaceAll(/\b(this)\.(\w+)\((\))?/g, moduleCallReplacer);

    // Replace locale data access
    code = code.replaceAll(/\bthis\.faker\.definitions\b/g, 'fakerCore.locale');

    // Replace default reference date access
    code = code.replaceAll(
      /\bthis\.faker\.defaultRefDate\(\)/g,
      'getDefaultRefDate(fakerCore)'
    );

    // Replace any remaining this.faker with parameter
    code = code.replaceAll(/\bthis\.faker\b/g, coreName);
    code = code.replaceAll('fakerCore.fakerCore', 'fakerCore');

    fileBody += `${jsdocs}\n${code}\n`;
  }

  importHelper.removeUnusedImports(fileBody);

  const fileImports = importHelper.generateImportStatements((file) =>
    file
      .replace(`../${moduleName.toLowerCase()}/`, './')
      // moduleSample() resides in sample.ts
      .replace(`./${moduleName.toLowerCase()}-sample`, './sample')
  );

  let fileContent = `${fileImports}\n\n${fileBody}`;

  fileContent = fileContent.replaceAll(
    '@default faker.defaultRefDate()',
    '@default getDefaultRefDate(fakerCore)'
  );

  // Format the file content
  try {
    fileContent = await formatTypescript(fileContent);
  } catch {
    // ignore
  }

  const outputPath = resolve(
    FILE_PATH_SRC,
    'modules',
    moduleName,
    `${toKebabCase(name)}.ts`
  );

  writeFileSync(outputPath, fileContent, 'utf8');
}
