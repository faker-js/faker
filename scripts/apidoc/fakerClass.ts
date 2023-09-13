import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsModule } from './apiDocsWriter';
import { analyzeModule, processModuleMethods } from './moduleMethods';
import { analyzeSignature } from './signature';
import { extractModuleFieldName, selectApiSignature } from './typedoc';
import type { ModuleSummary } from './utils';

export async function processFakerClasses(
  project: ProjectReflection
): Promise<ModuleSummary[]> {
  const fakerClasses = project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((clazz) => clazz.name === 'Faker' || clazz.name === 'SimpleFaker');

  if (fakerClasses.length !== 2) {
    throw new Error('Faker classes not found');
  }

  return Promise.all(fakerClasses.map(processClass));
}

async function processClass(
  fakerClass: DeclarationReflection
): Promise<ModuleSummary> {
  const { name } = fakerClass;
  const moduleFieldName = extractModuleFieldName(fakerClass);

  console.log(`Processing ${name} class`);

  const { comment, deprecated } = analyzeModule(fakerClass);
  const methods: Method[] = [];

  console.debug(`- constructor`);
  methods.push(await processConstructor(fakerClass));

  methods.push(
    ...(await processModuleMethods(fakerClass, `${moduleFieldName}.`))
  );

  return writeApiDocsModule(
    name,
    moduleFieldName,
    comment,
    deprecated,
    methods
  );
}

async function processConstructor(
  fakerClass: DeclarationReflection
): Promise<Method> {
  const constructor = fakerClass.getChildrenByKind(
    ReflectionKind.Constructor
  )[0];

  const signature = selectApiSignature(constructor);

  const method = await analyzeSignature(
    signature,
    '',
    `new ${fakerClass.name}`
  );

  return {
    ...method,
    name: 'constructor',
  };
}
