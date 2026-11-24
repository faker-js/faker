import type { Distributor } from '../../src';
import { MERSENNE_MAX_VALUE } from './mersenne-values';

/**
 * A distributor that always returns the minimum possible value (0).
 */
export const DISTRIBUTOR_MIN_VALUE: Distributor = () => 0;
/**
 * A distributor that always returns the maximum possible value (`MERSENNE_MAX_VALUE` aka `1 - Number.EPSILON / 2`).
 */
export const DISTRIBUTOR_MAX_VALUE: Distributor = () => MERSENNE_MAX_VALUE;
