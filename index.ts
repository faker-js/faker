// since we are requiring the top level of faker, load all locales by default
import { Faker } from './lib';
const faker: Faker = new Faker({ locales: require('./lib/locales') });
export = faker;
