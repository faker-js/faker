import { writeFileSync } from 'node:fs';
import type { Project } from 'ts-morph';
import { processProjectClasses } from './class';
import { getProject } from './project';
import type { ApiDocPage } from './types';

export function generate(): void {
  const project = getProject();
  const apiDocPages = processComponents(project);
  writeFileSync('api-doc.json', JSON.stringify(apiDocPages, null, 2));
}

function processComponents(project: Project): ApiDocPage[] {
  try {
    return [...processProjectClasses(project, 'Faker', 'SimpleFaker')];
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
