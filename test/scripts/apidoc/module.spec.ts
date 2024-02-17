import { beforeAll, describe, expect, it } from 'vitest';
import { processClass } from '../../../scripts/apidoc/processing/class';
import { initMarkdownRenderer } from '../../../scripts/apidoc/utils/markdown';
import * as ModuleTests from './module.example';
import { loadExampleModules } from './utils';

beforeAll(initMarkdownRenderer);
const modules = Object.fromEntries(
  loadExampleModules().map((m) => [m.getNameOrThrow(), m])
);

describe('module', () => {
  describe('analyzeModule()', () => {
    it('dummy dependency to rerun the test if the example changes', () => {
      expect(Object.keys(ModuleTests)).not.toEqual([]);
    });

    it('expected and actual modules are equal', () => {
      expect(Object.keys(modules).sort()).toMatchSnapshot();
    });

    it.each(Object.entries(modules))('%s', (_, module) => {
      const actual = processClass(module);

      expect(actual).toMatchSnapshot();
    });
  });
});
