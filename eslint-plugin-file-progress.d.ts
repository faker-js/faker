declare module 'eslint-plugin-file-progress' {
  import type { Rule } from 'eslint';

  export const rules: {
    activate: Rule.RuleModule;
  };
}
