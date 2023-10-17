import type { Faker } from '../faker';
import { bindThisToMemberFunctions } from '../internal/bind-this-to-member-functions';
import type { SimpleFaker } from '../simple-faker';

/**
 * Base class for all modules that use a `SimpleFaker` instance.
 */
export abstract class SimpleModuleBase {
  constructor(protected readonly faker: SimpleFaker) {
    bindThisToMemberFunctions(this);
  }
}

/**
 * Base class for all modules that use a `Faker` instance.
 */
export abstract class ModuleBase extends SimpleModuleBase {
  constructor(protected readonly faker: Faker) {
    super(faker);
  }
}
