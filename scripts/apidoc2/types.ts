export interface ApiDocPage {
  title: string;
  deprecated?: string;
  description: string;
  methods: ApiDocMethod[];
}

export interface ApiDocMethod {
  name: string;
  signatures: ApiDocSignature[];
  sourceLink: string;
}

export interface ApiDocSignature {
  deprecated?: string;
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
  defaultValue?: string;
  description: string;
}
