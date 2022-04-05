import { allOf } from './utils';

/**
 * The possible definitions related to animals.
 */
export interface AnimalDefinitions {
  bear: string[];
  bird: string[];
  cat: string[];
  cetacean: string[];
  cow: string[];
  crocodilia: string[];
  dog: string[];
  fish: string[];
  horse: string[];
  insect: string[];
  lion: string[];
  rabbit: string[];
  snake: string[];
  type: string[];
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
