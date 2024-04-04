import type { Project } from 'ts-morph';
import type { Task } from '../logger';
import { ui } from '../logger';
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
  let project: Project;
  let apiDocsPages: RawApiDocsPage[];
  await ui
    .tasks()
    .add('Reading project', () => {
      project = getProject();
      return 'Project read successfully';
    })
    .add('Processing components', (task) => {
      apiDocsPages = processComponents(task, project);
      return 'Components processed successfully';
    })
    .add('Writing files', async (task) => {
      await writeFiles(task, apiDocsPages);
      return 'Files written successfully';
    })
    .run();
}

export function processComponents(
  task: Task,
  project: Project
): RawApiDocsPage[] {
  return [
    ...processProjectClasses(task, project),
    ...processProjectInterfaces(task, project),
    processProjectUtilities(task, project),
    ...processModuleClasses(task, project),
  ];
}

async function writeFiles(
  task: Task,
  apiDocsPages: RawApiDocsPage[]
): Promise<void> {
  task.update('diff index');
  writeDiffIndex(apiDocsPages);
  task.update('page index');
  await writePageIndex(apiDocsPages);
  task.update('pages');
  await writePages(apiDocsPages);
  task.update('search index');
  writeSearchIndex(apiDocsPages);
  task.update('source base url');
  await writeSourceBaseUrl();
}
