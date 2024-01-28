export interface ApiDocPage {
  title: string;
  camelTitle: string;
  category: string;
  deprecated: string | undefined;
  description: string;
  example: string | undefined;
  methods: ApiDocMethod[];
}

export interface ApiDocMethod {
  name: string;
  signatures: ApiDocSignature[];
  /**
   * The relative path to the source file followed by the line number and column.
   *
   * @example
   * `src/faker.ts:123:45`
   */
  sourceLink: string;
}

export interface ApiDocSignature {
  deprecated: string | undefined;
  description: string;
  since: string;
  parameters: ApiDocParameter[];
  returns: string;
  example: string;
  seeAlso: string[];
}

export interface ApiDocParameter {
  name: string;
  type: string;
  defaultValue: string | undefined;
  description: string;
}
