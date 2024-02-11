import { FakerError } from '../../../src/errors/faker-error';
import type { SourceableNode } from './source';
import { getSourcePath } from './source';

export class FakerApiDocProcessingError extends FakerError {
  constructor(options: {
    type: string;
    name: string;
    source: string | SourceableNode;
    cause: unknown;
  }) {
    const { type, name, source, cause } = options;
    const sourceText =
      typeof source === 'string' ? source : getSourcePath(source);
    const causeText = cause instanceof Error ? cause.message : '';
    super(`Failed to process ${type} ${name} at ${sourceText} : ${causeText}`, {
      cause,
    });
  }
}

export function newProcessingError(options: {
  type: string;
  name: string;
  source: string | SourceableNode;
  cause: unknown;
}): FakerApiDocProcessingError {
  const { cause } = options;

  if (cause instanceof FakerApiDocProcessingError) {
    return cause;
  }

  return new FakerApiDocProcessingError(options);
}
