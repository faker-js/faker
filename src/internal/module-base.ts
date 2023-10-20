import type { Faker } from '../faker';
import type { SimpleFaker } from '../simple-faker';
import { bindThisToMemberFunctions } from './bind-this-to-member-functions';

/**
 * Base class for all modules that use a `SimpleFaker` instance.
 *
 * @internal
 */
export abstract class SimpleModuleBase {
  constructor(protected readonly faker: SimpleFaker) {
    bindThisToMemberFunctions(this);
  }
}

/**
 * Base class for all modules that use a `Faker` instance.
 *
 * @internal
 */
export abstract class ModuleBase extends SimpleModuleBase {
  constructor(protected readonly faker: Faker) {
    super(faker);
  }
}
