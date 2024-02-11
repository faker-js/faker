import type { Project } from 'ts-morph';
import { writeDiffIndex } from './output/diff-index';
import { writePages } from './output/page';
import { writePageIndex } from './output/page-index';
import { writeSearchIndex } from './output/search-index';
import { writeSourceBaseUrl } from './output/source-base-url';
import type { RawApiDocsPage } from './processing/class';
import {
  processModuleClasses,
  processProjectClasses,
  processProjectInterfaces,
  processProjectUtilities,
} from './processing/class';
import { getProject } from './project';

export async function generate(): Promise<void> {
  console.log('Reading project');
  const project = getProject();
  console.log('Processing components');
  const apiDocPages = processComponents(project);
  console.log('Writing files');
  await writeFiles(apiDocPages);
}

export function processComponents(project: Project): RawApiDocsPage[] {
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
  console.log('- source base url');
  await writeSourceBaseUrl();
}
