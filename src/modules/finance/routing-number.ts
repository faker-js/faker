import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeStringNumeric } from '../string/numeric';

/**
 * Generates a random [ABA routing number](https://en.wikipedia.org/wiki/ABA_routing_transit_number).
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceRoutingNumber(fakerCore) // '062197511'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceRoutingNumber(fakerCore: FakerCore): string {
  const federalReserveRoutingSymbol = fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.finance.federal_reserve_routing_symbol
  );

  const institutionIdentifier = fakeStringNumeric(fakerCore, {
    length: 4,
    allowLeadingZeros: true,
  });

  const routingNumber = federalReserveRoutingSymbol + institutionIdentifier;

  // Modules 10 straight summation.
  let sum = 0;

  for (let i = 0; i < routingNumber.length; i += 3) {
    sum += Number(routingNumber[i]) * 3;
    sum += Number(routingNumber[i + 1]) * 7;
    sum += Number(routingNumber[i + 2]) || 0;
  }

  return `${routingNumber}${Math.ceil(sum / 10) * 10 - sum}`;
}
