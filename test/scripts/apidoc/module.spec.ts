import { beforeAll, describe, expect, it } from 'vitest';
import { initMarkdownRenderer } from '../../../scripts/apidoc/markdown';
import { analyzeModule } from '../../../scripts/apidoc/moduleMethods';
import * as ModuleTests from './module.example';
import { loadExampleModules } from './utils';

describe('module', () => {
  describe('analyzeModule()', () => {
    const modules = loadExampleModules();

    beforeAll(initMarkdownRenderer);

    it('dummy dependency to rerun the test if the example changes', () => {
      expect(Object.keys(ModuleTests)).not.toEqual([]);
    });

    it('expected and actual modules are equal', () => {
      expect(Object.keys(modules).sort()).toMatchSnapshot();
    });

    it.each(Object.entries(modules))('%s', (_, module) => {
      const actual = analyzeModule(module);

      expect(actual).toMatchSnapshot();
    });
  });
});
