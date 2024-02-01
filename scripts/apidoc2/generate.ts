import { writeFileSync } from 'node:fs';
import type { Project } from 'ts-morph';
import type { RawApiDocsPage } from './class';
import {
  processModuleClasses,
  processProjectClasses,
  processProjectInterfaces,
} from './class';
import { writeDiffIndex } from './diff-index';
import { processProjectFunctions } from './method';
import { writePages } from './page';
import { writePageIndex } from './page-index';
import { getProject } from './project';
import { writeSearchIndex } from './search-index';

export async function generate(): Promise<void> {
  console.log('Reading project');
  const project = getProject();
  console.log('Processing components');
  const apiDocPages = processComponents(project);
  console.log('Writing files');
  writeDiffIndex(apiDocPages);
  await writePageIndex(apiDocPages);
  await writePages(apiDocPages);
  writeSearchIndex(apiDocPages);
  writeFileSync('api-doc.json', JSON.stringify(apiDocPages, null, 2));
}

function processComponents(project: Project): RawApiDocsPage[] {
  try {
    return [
      ...processProjectClasses(project, 'Faker', 'SimpleFaker'),
      ...processProjectInterfaces(project, 'Randomizer'),
      {
        title: 'Utilities',
        camelTitle: 'utils',
        category: '',
        deprecated: undefined,
        description: 'A list of all the utilities available in Faker.js.',
        examples: [],
        methods: processProjectFunctions(project, 'mergeLocales'),
      },
      ...processModuleClasses(project),
    ];
  } catch (error) {
    let e = error;
    let message = '';
    let lastError = e;
    while (e instanceof Error) {
      message += `\n${e.message}`;
      lastError = e;
      e = e.cause;
    }

    throw new Error(`Failed to generate API docs: ${message}`, {
      cause: lastError,
    });
  }
}
