import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsModule } from './apiDocsWriter';
import { analyzeModule, processModuleMethods } from './moduleMethods';
import { analyzeSignature } from './signature';
import { selectApiSignature } from './typedoc';
import type { ModuleSummary } from './utils';

export async function processFakerClass(
  project: ProjectReflection
): Promise<ModuleSummary> {
  const fakerClass = project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((clazz) => clazz.name === 'Faker')[0];

  if (!fakerClass) {
    throw new Error('Faker class not found');
  }

  return processClass(fakerClass);
}

async function processClass(
  fakerClass: DeclarationReflection
): Promise<ModuleSummary> {
  console.log(`Processing Faker class`);
  const { comment, deprecated } = analyzeModule(fakerClass);
  const methods: Method[] = [];

  console.debug(`- constructor`);
  methods.push(await processConstructor(fakerClass));

  methods.push(...(await processModuleMethods(fakerClass, 'faker.')));

  return writeApiDocsModule('Faker', 'faker', comment, deprecated, methods);
}

async function processConstructor(
  fakerClass: DeclarationReflection
): Promise<Method> {
  const constructor = fakerClass.getChildrenByKind(
    ReflectionKind.Constructor
  )[0];

  const signature = selectApiSignature(constructor);

  const method = await analyzeSignature(signature, '', 'new Faker');

  return {
    ...method,
    name: 'constructor',
  };
}
