import type { Texts } from './utils';
import { allOf } from './utils';

/**
 * The possible definitions related to animals.
 */
export interface AnimalDefinitions {
  bear: Texts;
  bird: Texts;
  cat: Texts;
  cetacean: Texts;
  cow: Texts;
  crocodilia: Texts;
  dog: Texts;
  fish: Texts;
  horse: Texts;
  insect: Texts;
  lion: Texts;
  rabbit: Texts;
  snake: Texts;
  type: Texts;
}

/**
 * Internal: A list of all keys for the AnimalDefinitions.
 */
export const ANIMAL = allOf<keyof AnimalDefinitions>()(
  'dog',
  'cat',
  'snake',
  'bear',
  'lion',
  'cetacean',
  'insect',
  'crocodilia',
  'cow',
  'bird',
  'fish',
  'rabbit',
  'horse',
  'type'
);
