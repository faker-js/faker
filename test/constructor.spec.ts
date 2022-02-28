import { describe, expect, it } from 'vitest';
import { Faker } from '../src';

describe('new Faker()', () => {
  it.fails('name.firstName()', () => {
    expect.assertions(2);
    const faker = new Faker();
    const name = faker.name.firstName();
    expect(name).toBeTypeOf('string');
    expect(name.length).toBeGreaterThan(0);
  });

  it.fails('name.firstName() with locale', () => {
    expect.assertions(2);
    const faker = new Faker();
    faker.locale = 'sv';
    const name = faker.name.firstName();
    expect(name).toBeTypeOf('string');
    expect(name.length).toBeGreaterThan(0);
  });
});
