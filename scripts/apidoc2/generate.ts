import { writeFileSync } from 'node:fs';
import type { Project } from 'ts-morph';
import { processProjectClasses } from './class';
import { writeDiffIndex } from './diff-index';
import { processModuleClasses } from './module';
import { writePages } from './page';
import { writePageIndex } from './page-index';
import { getProject } from './project';
import { writeSearchIndex } from './search-index';
import type { ApiDocPage } from './types';

export async function generate(): Promise<void> {
  const project = getProject();
  const apiDocPages = processComponents(project);
  writeDiffIndex(apiDocPages);
  await writePageIndex(apiDocPages);
  await writePages(apiDocPages);
  writeSearchIndex(apiDocPages);
  writeFileSync('api-doc.json', JSON.stringify(apiDocPages, null, 2));
}

function processComponents(project: Project): ApiDocPage[] {
  try {
    return [
      ...processProjectClasses(project, 'Faker', 'SimpleFaker'),
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
