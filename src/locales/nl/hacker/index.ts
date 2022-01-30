import type { HackerDefinitions } from '../../../definitions';
import adjective from './adjective';
import noun from './noun';
import phrase from './phrase';
import verb from './verb';

const hacker: Partial<HackerDefinitions> = {
  adjective,
  noun,
  phrase,
  verb,
};

export default hacker;
