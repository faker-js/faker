import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { int } from '../number/int';
import { alphanumeric } from '../string/alphanumeric';
import { fromCharacters } from '../string/from-characters';
import { arrayElement } from './array-element';
import { multiple } from './multiple';

/**
 * Generates a string matching the given regex like expressions.
 *
 * This function doesn't provide full support of actual `RegExp`.
 * Features such as grouping, anchors and character classes are not supported.
 * If you are looking for a library that randomly generates strings based on
 * `RegExp`s, see [randexp.js](https://github.com/fent/randexp.js)
 *
 * Supported patterns:
 * - `x{times}` => Repeat the `x` exactly `times` times.
 * - `x{min,max}` => Repeat the `x` `min` to `max` times.
 * - `[x-y]` => Randomly get a character between `x` and `y` (inclusive).
 * - `[x-y]{times}` => Randomly get a character between `x` and `y` (inclusive) and repeat it `times` times.
 * - `[x-y]{min,max}` => Randomly get a character between `x` and `y` (inclusive) and repeat it `min` to `max` times.
 * - `[^...]` => Randomly get an ASCII number or letter character that is not in the given range. (e.g. `[^0-9]` will get a random non-numeric character).
 * - `[-...]` => Include dashes in the range. Must be placed after the negate character `^` and before any character sets if used (e.g. `[^-0-9]` will not get any numeric characters or dashes).
 * - `/[x-y]/i` => Randomly gets an uppercase or lowercase character between `x` and `y` (inclusive).
 * - `x?` => Randomly decide to include or not include `x`.
 * - `[x-y]?` => Randomly decide to include or not include characters between `x` and `y` (inclusive).
 * - `x*` => Repeat `x` 0 or more times.
 * - `[x-y]*` => Repeat characters between `x` and `y` (inclusive) 0 or more times.
 * - `x+` => Repeat `x` 1 or more times.
 * - `[x-y]+` => Repeat characters between `x` and `y` (inclusive) 1 or more times.
 * - `.` => returns a wildcard ASCII character that can be any number, character or symbol. Can be combined with quantifiers as well.
 *
 * @param fakerCore The FakerCore to use.
 * @param pattern The template string/RegExp to generate a matching string for.
 *
 * @throws {FakerError} If min value is more than max value in quantifier, e.g. `#{10,5}`.
 * @throws {FakerError} If an invalid quantifier symbol is passed in.
 *
 * @example
 * fromRegExp(fakerCore, '#{5}') // '#####'
 * fromRegExp(fakerCore, '#{2,9}') // '#######'
 * fromRegExp(fakerCore, '[1-7]') // '5'
 * fromRegExp(fakerCore, '#{3}test[1-5]') // '###test3'
 * fromRegExp(fakerCore, '[0-9a-dmno]') // '5'
 * fromRegExp(fakerCore, '[^a-zA-Z0-8]') // '9'
 * fromRegExp(fakerCore, '[a-d0-6]{2,8}') // 'a0dc45b0'
 * fromRegExp(fakerCore, '[-a-z]{5}') // 'a-zab'
 * fromRegExp(fakerCore, /[A-Z0-9]{4}-[A-Z0-9]{4}/) // 'BS4G-485H'
 * fromRegExp(fakerCore, /[A-Z]{5}/i) // 'pDKfh'
 * fromRegExp(fakerCore, /.{5}/) // '14(#B'
 * fromRegExp(fakerCore, /Joh?n/) // 'Jon'
 * fromRegExp(fakerCore, /ABC*DE/) // 'ABDE'
 * fromRegExp(fakerCore, /bee+p/) // 'beeeeeeeep'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fromRegExp(
  fakerCore: FakerCore,
  pattern: string | RegExp
): string {
  let isCaseInsensitive = false;

  if (pattern instanceof RegExp) {
    isCaseInsensitive = pattern.flags.includes('i');
    pattern = pattern.source.replace(/^\^+/, '').replace(/\$+$/, '');
  }

  if (pattern === '.') {
    return alphanumeric(fakerCore);
  }

  if (isCaseInsensitive && /^[a-z]$/i.test(pattern)) {
    return fromCharacters(fakerCore, [
      pattern.toLowerCase(),
      pattern.toUpperCase(),
    ]);
  }

  pattern = replaceUnquantifiedRegExpTokens(
    fakerCore,
    pattern,
    isCaseInsensitive
  );

  let min: number;
  let max: number;
  let repetitions: number;

  // Deal with single wildcards
  const SINGLE_CHAR_REG =
    /([.A-Za-z0-9])(?:\{(\d+)(?:,(\d+)|)\}|(\?|\*|\+))(?![^[]*]|[^{]*})/;
  let token = SINGLE_CHAR_REG.exec(pattern);
  while (token != null) {
    const quantifierMin: string = token[2];
    const quantifierMax: string = token[3];
    const quantifierSymbol: string = token[4];

    repetitions = getRepetitionsBasedOnQuantifierParameters(
      fakerCore,
      quantifierSymbol,
      quantifierMin,
      quantifierMax
    );

    let replacement: string;
    if (token[1] === '.') {
      replacement = alphanumeric(fakerCore, repetitions);
    } else if (isCaseInsensitive) {
      replacement = fromCharacters(
        fakerCore,
        [token[1].toLowerCase(), token[1].toUpperCase()],
        repetitions
      );
    } else {
      replacement = token[1].repeat(repetitions);
    }

    pattern =
      pattern.slice(0, token.index) +
      replacement +
      pattern.slice(token.index + token[0].length);
    token = SINGLE_CHAR_REG.exec(pattern);
  }

  const SINGLE_RANGE_REG = /(\d-\d|\w-\w|\d|\w|[-!@#$&()`.+,/"])/;
  const RANGE_ALPHANUMERIC_REG =
    /\[(\^|)(-|)(.+?)\](?:\{(\d+)(?:,(\d+)|)\}|(\?|\*|\+)|)/;
  // Deal with character classes with quantifiers `[a-z0-9]{min[, max]}`
  token = RANGE_ALPHANUMERIC_REG.exec(pattern);
  while (token != null) {
    const isNegated = token[1] === '^';
    const includesDash: boolean = token[2] === '-';
    const quantifierMin: string = token[4];
    const quantifierMax: string = token[5];
    const quantifierSymbol: string = token[6];

    const rangeCodes: number[] = [];

    let ranges = token[3];
    let range = SINGLE_RANGE_REG.exec(ranges);

    if (includesDash) {
      // 45 is the ascii code for '-'
      rangeCodes.push(45);
    }

    while (range != null) {
      if (range[0].includes('-')) {
        // handle ranges
        const rangeMinMax = range[0]
          .split('-')
          .map((x) => x.codePointAt(0) ?? Number.NaN);
        min = rangeMinMax[0];
        max = rangeMinMax[1];
        // throw error if min larger than max
        if (min > max) {
          throw new FakerError('Character range provided is out of order.');
        }

        for (let i = min; i <= max; i++) {
          if (
            isCaseInsensitive &&
            Number.isNaN(Number(String.fromCodePoint(i)))
          ) {
            const ch = String.fromCodePoint(i);
            rangeCodes.push(
              ch.toUpperCase().codePointAt(0) ?? Number.NaN,
              ch.toLowerCase().codePointAt(0) ?? Number.NaN
            );
          } else {
            rangeCodes.push(i);
          }
        }
      } else {
        // handle non-ranges
        if (isCaseInsensitive && Number.isNaN(Number(range[0]))) {
          rangeCodes.push(
            range[0].toUpperCase().codePointAt(0) ?? Number.NaN,
            range[0].toLowerCase().codePointAt(0) ?? Number.NaN
          );
        } else {
          rangeCodes.push(range[0].codePointAt(0) ?? Number.NaN);
        }
      }

      ranges = ranges.substring(range[0].length);
      range = SINGLE_RANGE_REG.exec(ranges);
    }

    repetitions = getRepetitionsBasedOnQuantifierParameters(
      fakerCore,
      quantifierSymbol,
      quantifierMin,
      quantifierMax
    );

    if (isNegated) {
      let index;
      // 0-9
      for (let i = 48; i <= 57; i++) {
        index = rangeCodes.indexOf(i);
        if (index > -1) {
          rangeCodes.splice(index, 1);
          continue;
        }

        rangeCodes.push(i);
      }

      // A-Z
      for (let i = 65; i <= 90; i++) {
        index = rangeCodes.indexOf(i);
        if (index > -1) {
          rangeCodes.splice(index, 1);
          continue;
        }

        rangeCodes.push(i);
      }

      // a-z
      for (let i = 97; i <= 122; i++) {
        index = rangeCodes.indexOf(i);
        if (index > -1) {
          rangeCodes.splice(index, 1);
          continue;
        }

        rangeCodes.push(i);
      }
    }

    const generatedString = multiple(
      fakerCore,
      () => String.fromCodePoint(arrayElement(fakerCore, rangeCodes)),
      { count: repetitions }
    ).join('');

    pattern =
      pattern.slice(0, token.index) +
      generatedString +
      pattern.slice(token.index + token[0].length);
    token = RANGE_ALPHANUMERIC_REG.exec(pattern);
  }

  const RANGE_REP_REG = /(.)\{(\d+),(\d+)\}/;
  // Deal with quantifier ranges `{min,max}`
  token = RANGE_REP_REG.exec(pattern);
  while (token != null) {
    min = Number.parseInt(token[2]);
    max = Number.parseInt(token[3]);
    // throw error if min larger than max
    if (min > max) {
      throw new FakerError('Numbers out of order in {} quantifier.');
    }

    repetitions = int(fakerCore, { min, max });
    pattern =
      pattern.slice(0, token.index) +
      token[1].repeat(repetitions) +
      pattern.slice(token.index + token[0].length);
    token = RANGE_REP_REG.exec(pattern);
  }

  const REP_REG = /(.)\{(\d+)\}/;
  // Deal with repeat `{num}`
  token = REP_REG.exec(pattern);
  while (token != null) {
    repetitions = Number.parseInt(token[2]);
    pattern =
      pattern.slice(0, token.index) +
      token[1].repeat(repetitions) +
      pattern.slice(token.index + token[0].length);
    token = REP_REG.exec(pattern);
  }

  return pattern;
}
