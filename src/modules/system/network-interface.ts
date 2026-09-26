import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { helpersMaybe } from '../helpers/maybe';
import { helpersObjectKey } from '../helpers/object-key';
import { internetMac } from '../internet/mac';
import { stringNumeric } from '../string/numeric';

const commonInterfaceTypes = ['en', 'wl', 'ww'] as const;
export type CommonInterfaceType = (typeof commonInterfaceTypes)[number];
const commonInterfaceSchemas = {
  index: 'o',
  slot: 's',
  mac: 'x',
  pci: 'p',
} as const;
export type CommonInterfaceSchema = keyof typeof commonInterfaceSchemas;

/**
 * Returns a random [network interface](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-understanding_the_predictable_network_interface_device_names).
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.interfaceType The interface type. Can be one of `en`, `wl`, `ww`.
 * @param options.interfaceSchema The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
 *
 * @example
 * systemNetworkInterface(fakerCore) // 'enp0s3'
 * systemNetworkInterface(fakerCore, { interfaceType: 'wl' }) // 'wlo1'
 * systemNetworkInterface(fakerCore, { interfaceSchema: 'mac' }) // 'enx000c29c00000'
 * systemNetworkInterface(fakerCore, { interfaceType: 'en', interfaceSchema: 'pci' }) // 'enp5s0f1d0'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function systemNetworkInterface(
  fakerCore: FakerCore,
  options: {
    /**
     * The interface type. Can be one of `en`, `wl`, `ww`.
     *
     * @default helpersArrayElement(fakerCore, ['en', 'wl', 'ww'])
     */
    interfaceType?: CommonInterfaceType;
    /**
     * The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
     *
     * @default helpersObjectKey(fakerCore, ['index' | 'slot' | 'mac' | 'pci'])
     */
    interfaceSchema?: CommonInterfaceSchema;
  } = {}
): string {
  const {
    interfaceType = helpersArrayElement(fakerCore, commonInterfaceTypes),
    interfaceSchema = helpersObjectKey(fakerCore, commonInterfaceSchemas),
  } = options;

  let suffix: string;
  let prefix = '';
  switch (interfaceSchema) {
    case 'index': {
      suffix = stringNumeric(fakerCore);
      break;
    }

    case 'slot': {
      suffix = `${stringNumeric(fakerCore)}${
        helpersMaybe(fakerCore, () => `f${stringNumeric(fakerCore)}`) ?? ''
      }${helpersMaybe(fakerCore, () => `d${stringNumeric(fakerCore)}`) ?? ''}`;
      break;
    }

    case 'mac': {
      suffix = internetMac(fakerCore, '');
      break;
    }

    case 'pci': {
      prefix =
        helpersMaybe(fakerCore, () => `P${stringNumeric(fakerCore)}`) ?? '';
      suffix = `${stringNumeric(fakerCore)}s${stringNumeric(fakerCore)}${
        helpersMaybe(fakerCore, () => `f${stringNumeric(fakerCore)}`) ?? ''
      }${helpersMaybe(fakerCore, () => `d${stringNumeric(fakerCore)}`) ?? ''}`;
      break;
    }
  }

  return `${prefix}${interfaceType}${commonInterfaceSchemas[interfaceSchema]}${suffix}`;
}
