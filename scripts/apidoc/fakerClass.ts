import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsModule } from './apiDocsWriter';
import { processModuleMethods } from './moduleMethods';
import { analyzeSignature } from './signature';
import { extractDescription, selectApiSignature } from './typedoc';
import type { ModuleSummary } from './utils';

export function processFakerClass(project: ProjectReflection): ModuleSummary {
  const fakerClass = project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((clazz) => clazz.name === 'Faker')[0];

  if (!fakerClass) {
    throw new Error('Faker class not found');
  }

  return processClass(fakerClass);
}

function processClass(fakerClass: DeclarationReflection): ModuleSummary {
  console.log(`Processing Faker class`);
  const comment = extractDescription(fakerClass);
  const methods: Method[] = [];

  console.debug(`- constructor`);
  methods.push(processConstructor(fakerClass));

  methods.push(...processModuleMethods(fakerClass, 'faker.'));

  return writeApiDocsModule('Faker', 'faker', comment, undefined, methods);
}

function processConstructor(fakerClass: DeclarationReflection): Method {
  const constructor = fakerClass.getChildrenByKind(
    ReflectionKind.Constructor
  )[0];

  const signature = selectApiSignature(constructor);

  const method = analyzeSignature(signature, '', 'new Faker');

  return {
    ...method,
    name: 'constructor',
  };
}
