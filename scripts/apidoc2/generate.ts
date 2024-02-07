import { writeFileSync } from 'node:fs';
import type { Project } from 'ts-morph';
import type { RawApiDocsPage } from './class';
import {
  processModuleClasses,
  processProjectClasses,
  processProjectInterfaces,
  processProjectUtilities,
} from './class';
import { writeDiffIndex } from './diff-index';
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
  await writeFiles(apiDocPages);
}

function processComponents(project: Project): RawApiDocsPage[] {
  try {
    return [
      ...processProjectClasses(project),
      ...processProjectInterfaces(project),
      processProjectUtilities(project),
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

async function writeFiles(apiDocPages: RawApiDocsPage[]): Promise<void> {
  console.log('- diff index');
  writeDiffIndex(apiDocPages);
  console.log('- page index');
  await writePageIndex(apiDocPages);
  console.log('- pages');
  await writePages(apiDocPages);
  console.log('- search index');
  writeSearchIndex(apiDocPages);
  // TODO @ST-DDT 2024-02-04: Remove this part prior to merge
  console.log('- api-doc debug output');
  writeFileSync('api-doc.json', JSON.stringify(apiDocPages, null, 2));
}
