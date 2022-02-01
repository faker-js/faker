import type { HackerDefinitions } from '../../../definitions';
import abbreviation from './abbreviation';
import adjective from './adjective';
import ingverb from './ingverb';
import noun from './noun';
import phrase from './phrase';
import verb from './verb';

const hacker: Partial<HackerDefinitions> = {
  abbreviation,
  adjective,
  ingverb,
  noun,
  phrase,
  verb,
};

export default hacker;
