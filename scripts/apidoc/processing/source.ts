import type { Node } from 'ts-morph';
import { pathProjectDir } from '../utils/paths';

export type SourceableNode = Pick<Node, 'getSourceFile' | 'getStart'>;

export function getSourcePath(node: SourceableNode): string {
  const sourceFile = node.getSourceFile();
  const filePath = sourceFile
    .getFilePath()
    .substring(pathProjectDir.length + 1);
  const startPosition = node.getStart();
  const { line, column } = sourceFile.getLineAndColumnAtPos(startPosition);

  return `${filePath}:${line}:${column}`;
}
