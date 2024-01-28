import type { Node } from 'ts-morph';

export type SourceableNode = Pick<Node, 'getSourceFile' | 'getStart'>;

export function getSourceLink(node: SourceableNode): string {
  const sourceFile = node.getSourceFile();
  const startPosition = node.getStart();
  const { line, column } = sourceFile.getLineAndColumnAtPos(startPosition);

  return `${sourceFile.getFilePath()}:${line}:${column}`;
}
