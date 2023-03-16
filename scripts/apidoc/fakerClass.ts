import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsModule } from './apiDocsWriter';
import { processMethods } from './moduleMethods';
import { analyzeSignature, toBlock } from './signature';
import { selectApiSignature } from './typedoc';
import type { PageAndDiff } from './utils';

export function processFakerClass(project: ProjectReflection): PageAndDiff {
  const fakerClass = project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((clazz) => clazz.name === 'Faker')[0];

  if (!fakerClass) {
    throw new Error('Faker class not found');
  }

  return processFakerMethod(fakerClass);
}

function processFakerMethod(fakerClass: DeclarationReflection): PageAndDiff {
  console.log(`Processing Faker class`);
  const comment = toBlock(fakerClass.comment);

  const methods: Method[] = [];

  console.debug(`- constructor`);
  methods.push(processConstructor(fakerClass));

  methods.push(...processMethods(fakerClass, 'faker.'));

  return writeApiDocsModule('Faker', 'faker', comment, methods);
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
