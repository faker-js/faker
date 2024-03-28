import type { Node } from 'ts-morph';
import { FILE_PATH_PROJECT } from '../utils/paths';

/**
 * Represents a source element in the raw API docs.
 */
export interface RawApiDocsSource {
  /**
   * The file path of the target element.
   */
  filePath: string;
  /**
   * The line number of the target element.
   */
  line: number;
  /**
   * The column number of the target element.
   */
  column: number;
}

export type SourceableNode = Pick<Node, 'getSourceFile' | 'getStart'>;

export function getSourcePath(node: SourceableNode): RawApiDocsSource {
  const sourceFile = node.getSourceFile();
  const filePath = sourceFile
    .getFilePath()
    .substring(FILE_PATH_PROJECT.length + 1);
  const startPosition = node.getStart();
  const { line, column } = sourceFile.getLineAndColumnAtPos(startPosition);

  return {
    filePath,
    line,
    column,
  };
}
