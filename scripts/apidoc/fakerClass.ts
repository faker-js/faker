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

export async function processFakerRandomizer(
  project: ProjectReflection
): Promise<ModuleSummary> {
  const randomizerClass = project
    .getChildrenByKind(ReflectionKind.Interface)
    .filter((clazz) => clazz.name === 'Randomizer')[0];

  return processClass(randomizerClass);
}

async function processClass(
  clazz: DeclarationReflection
): Promise<ModuleSummary> {
  const { name } = clazz;
  const moduleFieldName = extractModuleFieldName(clazz);

  console.log(`Processing ${name} class`);

  const { comment, deprecated, examples } = analyzeModule(clazz);
  const methods: Method[] = [];

  if (hasConstructor(clazz)) {
    console.debug(`- constructor`);
    methods.push(await processConstructor(clazz));
  }

  methods.push(...(await processModuleMethods(clazz, `${moduleFieldName}.`)));

  return writeApiDocsModule(
    name,
    moduleFieldName,
    comment,
    examples,
    deprecated,
    methods
  );
}

function hasConstructor(fakerClass: DeclarationReflection): boolean {
  return fakerClass
    .getChildrenByKind(ReflectionKind.Constructor)
    .some((constructor) => constructor.signatures.length > 0);
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
