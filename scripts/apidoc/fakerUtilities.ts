import type { DeclarationReflection, ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';
import { writeApiDocsModule } from './apiDocsWriter';
import { processMethods } from './moduleMethods';
import { selectApiSignature } from './typedoc';
import type { ModuleSummary } from './utils';

export function processFakerUtilities(
  project: ProjectReflection
): ModuleSummary {
  const fakerUtilities = project
    .getChildrenByKind(ReflectionKind.Function)
    .filter((method) => !method.flags.isPrivate);

  return processUtilities(fakerUtilities);
}

function processUtilities(
  fakerUtilities: DeclarationReflection[]
): ModuleSummary {
  console.log(`Processing Faker Utilities`);
  const comment = 'A list of all the utilities available in Faker.js.';

  const methods: Method[] = processMethods(
    Object.fromEntries(
      fakerUtilities.map((method) => [method.name, selectApiSignature(method)])
    )
  );

  return writeApiDocsModule('Utilities', 'utils', comment, undefined, methods);
}
