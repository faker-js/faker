import { Datatype } from './datatype';
import { Mersenne } from './mersenne';
import { Random } from './random';

export interface FakerOptions {
  locales?: string[];
  locale?: string;
  localeFallback?: string;
}

export class Faker {
  locales: string[] | {};
  locale: string;
  localeFallback: string;

  seedValue?: any[] | any;

  readonly mersenne: Mersenne = new Mersenne();
  random = new Random(this);
  datatype: Datatype = new Datatype(this);

  constructor(opts: FakerOptions = {}) {
    this.locales = this.locales || opts.locales || {};
    this.locale = this.locale || opts.locale || 'en';
    this.localeFallback = this.localeFallback || opts.localeFallback || 'en';
  }

  seed(value?: any[] | any) {
    this.seedValue = value;
    this.random = new Random(this, this.seedValue);
    this.datatype = new Datatype(this, this.seedValue);
  }
}

export default Faker;
module.exports = Faker;
