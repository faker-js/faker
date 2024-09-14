import { FakerError } from '../../../src/errors/faker-error';
import { CI_PREFLIGHT } from '../../env';
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

    const mainText = `Failed to process ${type} '${name}'`;
    const causeText = cause instanceof Error ? cause.message : '';
    const { filePath, line, column } = getSourcePath(source);
    const sourceText = `${filePath}:${line}:${column}`;

    if (CI_PREFLIGHT) {
      const sourceArgs = `file=${filePath},line=${line},col=${column}`;
      console.log(`::error ${sourceArgs}::${mainText}: ${causeText}`);
    }

    super(`${mainText} at ${sourceText} : ${causeText}`, {
      cause,
    });
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
