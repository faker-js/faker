export interface DocsMethod {
  readonly name: string;
  readonly deprecated: string | undefined; // HTML
  readonly description: string; // HTML
  readonly since: string;
  readonly parameters: DocsMethodParameter[];
  readonly returns: string;
  readonly throws: string | undefined; // HTML
  readonly examples: string; // HTML
  readonly seeAlsos: string[];
  readonly sourcePath: string; // URL-Suffix
}

export interface DocsMethodParameter {
  readonly name: string;
  readonly type: string | undefined;
  readonly default: string | undefined;
  readonly description: string; // HTML
}
