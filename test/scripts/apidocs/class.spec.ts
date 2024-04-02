import { describe, expect, it } from 'vitest';
import { processClass } from '../../../scripts/apidocs/processing/class';
import * as ModuleTests from './class.example';
import { loadExampleClasses } from './utils';

const modules = loadExampleClasses();

describe('class', () => {
  it('dummy dependency to rerun the test if the example changes', () => {
    expect(Object.keys(ModuleTests)).not.toEqual([]);
  });

  it('expected and actual modules are equal', () => {
    expect(Object.keys(modules).sort()).toMatchSnapshot();
  });

  it.each(Object.entries(modules))('processClass(%s)', (_, module) => {
    const actual = processClass(module);

    expect(actual).toMatchSnapshot();
  });
});
