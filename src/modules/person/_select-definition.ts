import type { FakerCore } from '../../core';
import type { PersonEntryDefinition } from '../../definitions';
import { helpersArrayElement } from '../helpers/array-element';
import { helpersWeightedArrayElement } from '../helpers/weighted-array-element';
import type { SexType } from './sex-type';
import { personSexType } from './sex-type';

/**
 * Select a definition based on given sex.
 *
 * @param fakerCore The FakerCore to use.
 * @param sex The sex to select the definition for.
 * @param personEntry The definitions to select from.
 *
 * @returns Definition based on given sex.
 */
export function selectDefinition<T>(
  fakerCore: FakerCore,
  sex: SexType = personSexType(fakerCore),
  personEntry: PersonEntryDefinition<T>
): T[] {
  const { generic, female, male } = personEntry;

  if (sex === 'generic') {
    return (
      generic ??
      helpersArrayElement(fakerCore, [female, male]) ??
      // The last statement should never happen at run time. At this point in time,
      // the entry will satisfy at least (generic || (female && male)).
      // TS is not able to infer the type correctly.
      []
    );
  }

  const binary = sex === 'female' ? female : male;

  if (binary != null) {
    if (generic != null) {
      return helpersWeightedArrayElement(fakerCore, [
        {
          weight: 3 * Math.sqrt(binary.length),
          value: binary,
        },
        {
          weight: Math.sqrt(generic.length),
          value: generic,
        },
      ]);
    }

    return binary;
  }

  return (
    generic ??
    // The last statement should never happen at run time. At this point in time,
    // the entry will satisfy at least (generic || (female && male)).
    // TS is not able to infer the type correctly.
    []
  );
}
