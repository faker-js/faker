import type { HackerDefinitions } from '../../../definitions';
import abbreviation from './abbreviation';
import adjective from './adjective';
import noun from './noun';
import verb from './verb';

const hacker: Partial<HackerDefinitions> = {
  abbreviation,
  adjective,
  noun,
  verb,
};

export default hacker;
