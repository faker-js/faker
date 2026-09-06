import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { maybe } from '../helpers/maybe';
import { objectKey } from '../helpers/object-key';
import { mac } from '../internet/mac';
import { numeric } from '../string/numeric';

/**
 * Returns a random [network interface](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-understanding_the_predictable_network_interface_device_names).
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.interfaceType The interface type. Can be one of `en`, `wl`, `ww`.
 * @param options.interfaceSchema The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
 *
 * @example
 * networkInterface(fakerCore) // 'enp0s3'
 * networkInterface(fakerCore, { interfaceType: 'wl' }) // 'wlo1'
 * networkInterface(fakerCore, { interfaceSchema: 'mac' }) // 'enx000c29c00000'
 * networkInterface(fakerCore, { interfaceType: 'en', interfaceSchema: 'pci' }) // 'enp5s0f1d0'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function networkInterface(
  fakerCore: FakerCore,
  options: {
    /**
     * The interface type. Can be one of `en`, `wl`, `ww`.
     *
     * @default helpersArrayElement(fakerCore, ['en', 'wl', 'ww'])
     */
    interfaceType?: (typeof commonInterfaceTypes)[number];
    /**
     * The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
     *
     * @default helpersObjectKey(fakerCore, ['index' | 'slot' | 'mac' | 'pci'])
     */
    interfaceSchema?: keyof typeof commonInterfaceSchemas;
  } = {}
): string {
  const {
    interfaceType = arrayElement(fakerCore, commonInterfaceTypes),
    interfaceSchema = objectKey(fakerCore, commonInterfaceSchemas),
  } = options;

  let suffix: string;
  let prefix = '';
  switch (interfaceSchema) {
    case 'index': {
      suffix = numeric(fakerCore);
      break;
    }

    case 'slot': {
      suffix = `${numeric(fakerCore)}${
        maybe(fakerCore, () => `f${numeric(fakerCore)}`) ?? ''
      }${maybe(fakerCore, () => `d${numeric(fakerCore)}`) ?? ''}`;
      break;
    }

    case 'mac': {
      suffix = mac(fakerCore, '');
      break;
    }

    case 'pci': {
      prefix = maybe(fakerCore, () => `P${numeric(fakerCore)}`) ?? '';
      suffix = `${numeric(fakerCore)}s${numeric(fakerCore)}${
        maybe(fakerCore, () => `f${numeric(fakerCore)}`) ?? ''
      }${maybe(fakerCore, () => `d${numeric(fakerCore)}`) ?? ''}`;
      break;
    }
  }

  return `${prefix}${interfaceType}${commonInterfaceSchemas[interfaceSchema]}${suffix}`;
}
