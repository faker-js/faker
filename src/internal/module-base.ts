import type { FakerCore } from '../core';
import { bindThisToMemberFunctions } from './bind-this-to-member-functions';

/**
 * Base class for all modules.
 */
export abstract class ModuleBase {
  constructor(protected readonly fakerCore: FakerCore) {
    bindThisToMemberFunctions(this);
  }
}
