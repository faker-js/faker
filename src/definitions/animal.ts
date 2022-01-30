import type { Texts } from './utils';
import { allOf } from './utils';

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

export const animals = allOf<keyof AnimalDefinitions>()(
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
