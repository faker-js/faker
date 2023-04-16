export interface Method {
  readonly name: string;
  readonly description: string; // HTML
  readonly parameters: MethodParameter[];
  readonly returns: string;
  readonly examples: string; // HTML
  readonly deprecated?: string; // HTML
  readonly since: string;
  readonly sourcePath: string; // URL-Suffix
  readonly seeAlsos: string[];
  readonly throws?: string; // HTML
}

export interface MethodParameter {
  readonly name: string;
  readonly type?: string;
  readonly default?: string;
  readonly description: string; // HTML
}
