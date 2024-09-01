import { env } from 'node:process';
import { FakerError } from '../../../src/errors/faker-error';
import type { SourceableNode } from './source';
import { getSourcePath } from './source';

export class FakerApiDocsProcessingError extends FakerError {
  constructor(options: {
    type: string;
    name: string;
    source: SourceableNode;
    cause: unknown;
  }) {
    const { type, name, source, cause } = options;
    const sourceText = getSourcePathText(source);
    const causeText = cause instanceof Error ? cause.message : '';
    if (env.CI_PREFLIGHT === 'true') {
      const { filePath, line, column } = getSourcePath(source);
      console.log(
        `::error file=${filePath},line=${line},col=${column}::Failed to process ${type} '${name}': ${causeText}`
      );
    }

    super(
      `Failed to process ${type} '${name}' at ${sourceText} : ${causeText}`,
      {
        cause,
      }
    );
  }
}

export function newProcessingError(options: {
  type: string;
  name: string;
  source: SourceableNode;
  cause: unknown;
}): FakerApiDocsProcessingError {
  const { cause } = options;

  if (cause instanceof FakerApiDocsProcessingError) {
    return cause;
  }

  return new FakerApiDocsProcessingError(options);
}

function getSourcePathText(source: SourceableNode): string {
  const { filePath, line, column } = getSourcePath(source);
  return `${filePath}:${line}:${column}`;
}
