import type { FakerCore } from '../../core';
import { float } from '../number/float';
import { toColorFormat } from './_to-color-format';
import type {
  ColorFormat,
  NumberColorFormat,
  StringColorFormat,
} from './_types';

/**
 * Returns a LAB (CIELAB) color.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * lab(fakerCore) // [0.832133, -80.3245, 100.1234]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lab(fakerCore: FakerCore): number[];
/**
 * Returns a LAB (CIELAB) color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * lab(fakerCore) // [0.832133, -80.3245, 100.1234]
 * lab(fakerCore, { format: 'css' }) // 'lab(29.2345% 39.3825 20.0664)'
 * lab(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lab(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: StringColorFormat;
  }
): string;
/**
 * Returns a LAB (CIELAB) color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * lab(fakerCore) // [0.832133, -80.3245, 100.1234]
 * lab(fakerCore, { format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lab(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: NumberColorFormat;
  }
): number[];
/**
 * Returns a LAB (CIELAB) color.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
 *
 * @example
 * lab(fakerCore) // [0.832133, -80.3245, 100.1234]
 * lab(fakerCore, { format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
 * lab(fakerCore, { format: 'css' }) // 'lab(29.2345% 39.3825 20.0664)'
 * lab(fakerCore, { format: 'binary' }) // (8-32 bits x 3)
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lab(
  fakerCore: FakerCore,
  options?: {
    /**
     * Format of generated RGB color.
     *
     * @default 'decimal'
     */
    format?: ColorFormat;
  }
): string | number[];

export function lab(
  fakerCore: FakerCore,
  options: { format?: ColorFormat } = {}
): string | number[] {
  const { format = 'decimal' } = options;
  const lab = [float(fakerCore, { multipleOf: 0.000001 })];
  for (let i = 0; i < 2; i++) {
    lab.push(float(fakerCore, { min: -100, max: 100, multipleOf: 0.0001 }));
  }

  return toColorFormat(lab, format, 'lab');
}
