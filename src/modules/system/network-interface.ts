import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeHelpersMaybe } from '../helpers/maybe';
import { fakeHelpersObjectKey } from '../helpers/object-key';
import { fakeInternetMac } from '../internet/mac';
import { fakeStringNumeric } from '../string/numeric';

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
 * fakeSystemNetworkInterface(fakerCore) // 'enp0s3'
 * fakeSystemNetworkInterface(fakerCore, { interfaceType: 'wl' }) // 'wlo1'
 * fakeSystemNetworkInterface(fakerCore, { interfaceSchema: 'mac' }) // 'enx000c29c00000'
 * fakeSystemNetworkInterface(fakerCore, { interfaceType: 'en', interfaceSchema: 'pci' }) // 'enp5s0f1d0'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeSystemNetworkInterface(
  fakerCore: FakerCore,
  options: {
    /**
     * The interface type. Can be one of `en`, `wl`, `ww`.
     *
     * @default fakeHelpersArrayElement(fakerCore, ['en', 'wl', 'ww'])
     */
    interfaceType?: CommonInterfaceType;
    /**
     * The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
     *
     * @default fakeHelpersObjectKey(fakerCore, ['index' | 'slot' | 'mac' | 'pci'])
     */
    interfaceSchema?: CommonInterfaceSchema;
  } = {}
): string {
  const {
    interfaceType = fakeHelpersArrayElement(fakerCore, commonInterfaceTypes),
    interfaceSchema = fakeHelpersObjectKey(fakerCore, commonInterfaceSchemas),
  } = options;

  let suffix: string;
  let prefix = '';
  switch (interfaceSchema) {
    case 'index': {
      suffix = fakeStringNumeric(fakerCore);
      break;
    }

    case 'slot': {
      suffix = `${fakeStringNumeric(fakerCore)}${
        fakeHelpersMaybe(fakerCore, () => `f${fakeStringNumeric(fakerCore)}`) ??
        ''
      }${fakeHelpersMaybe(fakerCore, () => `d${fakeStringNumeric(fakerCore)}`) ?? ''}`;
      break;
    }

    case 'mac': {
      suffix = fakeInternetMac(fakerCore, '');
      break;
    }

    case 'pci': {
      prefix =
        fakeHelpersMaybe(fakerCore, () => `P${fakeStringNumeric(fakerCore)}`) ??
        '';
      suffix = `${fakeStringNumeric(fakerCore)}s${fakeStringNumeric(fakerCore)}${
        fakeHelpersMaybe(fakerCore, () => `f${fakeStringNumeric(fakerCore)}`) ??
        ''
      }${fakeHelpersMaybe(fakerCore, () => `d${fakeStringNumeric(fakerCore)}`) ?? ''}`;
      break;
    }
  }

  return `${prefix}${interfaceType}${commonInterfaceSchemas[interfaceSchema]}${suffix}`;
}
