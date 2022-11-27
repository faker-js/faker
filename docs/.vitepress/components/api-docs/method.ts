export interface Method {
  readonly name: string;
  readonly title: string;
  readonly description: string; // HTML
  readonly parameters: MethodParameter[];
  readonly returns: string;
  readonly examples: string; // HTML
  readonly deprecated?: string;
  readonly since: string;
  readonly seeAlsos: string[];
}

export interface MethodParameter {
  readonly name: string;
  readonly type?: string;
  readonly default?: string;
  readonly description: string; // HTML
}
