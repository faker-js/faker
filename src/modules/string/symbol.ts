import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { stringFromCharacters } from './from-characters';

const SYMBOL_CHARS = [
  '!',
  '"',
  '#',
  '$',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  '[',
  '\\',
  ']',
  '^',
  '_',
  '`',
  '{',
  '|',
  '}',
  '~',
];

/**
 * Returns a string containing only special characters from the following list:
 *
 * ```txt
 * ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~
 * ```
 *
 * @param fakerCore The FakerCore to use.
 * @param length The length of the string to generate either as a fixed length or as a length range. Defaults to `1`.
 * @param length.min The minimum length of the string to generate.
 * @param length.max The maximum length of the string to generate.
 *
 * @example
 * stringSymbol(fakerCore) // '$'
 * stringSymbol(fakerCore, 5) // '#*!.~'
 * stringSymbol(fakerCore, { min: 5, max: 10 }) // ')|@*>^+'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function stringSymbol(
  fakerCore: FakerCore,
  length: NumberOrRange = 1
): string {
  return stringFromCharacters(fakerCore, SYMBOL_CHARS, length);
}
