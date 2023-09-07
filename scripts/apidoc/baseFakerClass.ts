import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsModule } from './apiDocsWriter';
import { analyzeModule, processModuleMethods } from './moduleMethods';
import { analyzeSignature } from './signature';
import { selectApiSignature } from './typedoc';
import type { ModuleSummary } from './utils';

export async function processBaseFakerClass(
  project: ProjectReflection
): Promise<ModuleSummary> {
  const baseFakerClass = project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((clazz) => clazz.name === 'BaseFaker')[0];

  if (!baseFakerClass) {
    throw new Error('BaseFaker class not found');
  }

  return processClass(baseFakerClass);
}

async function processClass(
  baseFakerClass: DeclarationReflection
): Promise<ModuleSummary> {
  console.log(`Processing BaseFaker class`);
  const { comment, deprecated } = analyzeModule(baseFakerClass);
  const methods: Method[] = [];

  console.debug(`- constructor`);
  methods.push(await processConstructor(baseFakerClass));

  methods.push(...(await processModuleMethods(baseFakerClass, 'faker.')));

  return writeApiDocsModule(
    'BaseFaker',
    'baseFaker',
    comment,
    deprecated,
    methods
  );
}

async function processConstructor(
  baseFakerClass: DeclarationReflection
): Promise<Method> {
  const constructor = baseFakerClass.getChildrenByKind(
    ReflectionKind.Constructor
  )[0];

  const signature = selectApiSignature(constructor);

  const method = await analyzeSignature(signature, '', 'new BaseFaker');

  return {
    ...method,
    name: 'constructor',
  };
}
