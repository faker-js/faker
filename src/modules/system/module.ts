import { ModuleBase } from '../../internal/module-base';
import type { NumberOrRange } from '../../utils/types';
import { commonFileExt as systemCommonFileExt } from './common-file-ext';
import { commonFileName as systemCommonFileName } from './common-file-name';
import { commonFileType as systemCommonFileType } from './common-file-type';
import { cron as systemCron } from './cron';
import { directoryPath as systemDirectoryPath } from './directory-path';
import { fileExt as systemFileExt } from './file-ext';
import { fileName as systemFileName } from './file-name';
import { filePath as systemFilePath } from './file-path';
import { fileType as systemFileType } from './file-type';
import { mimeType as systemMimeType } from './mime-type';
import type {
  CommonInterfaceSchema,
  CommonInterfaceType,
} from './network-interface';
import { networkInterface as systemNetworkInterface } from './network-interface';
import { semver as systemSemver } from './semver';

/**
 * Generates fake data for many computer systems properties.
 */
export class SystemModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree system' to update the methods from their respective files.
   */

  /**
   * Returns a random file name with extension.
   *
   * @param options An options object.
   * @param options.extensionCount Define how many extensions the file name should have. Defaults to `1`.
   *
   * @example
   * faker.system.fileName() // 'faithfully_calculating.u8mdn'
   * faker.system.fileName({ extensionCount: 2 }) // 'times_after.swf.ntf'
   * faker.system.fileName({ extensionCount: { min: 1, max: 2 } }) // 'jaywalk_like_ill.osfpvg'
   *
   * @since 3.1.0
   */
  fileName(
    options: {
      /**
       * Define how many extensions the file name should have.
       *
       * @default 1
       */
      extensionCount?: NumberOrRange;
    } = {}
  ): string {
    return systemFileName(this.faker.fakerCore, options);
  }

  /**
   * Returns a random file name with a given extension or a commonly used extension.
   *
   * @param extension The file extension to use. Empty string is considered to be not set.
   *
   * @example
   * faker.system.commonFileName() // 'dollar.jpg'
   * faker.system.commonFileName('txt') // 'global_borders_wyoming.txt'
   *
   * @since 3.1.0
   */
  commonFileName(extension?: string): string {
    return systemCommonFileName(this.faker.fakerCore, extension);
  }

  /**
   * Returns a mime-type.
   *
   * @example
   * faker.system.mimeType() // 'video/vnd.vivo'
   *
   * @since 3.1.0
   */
  mimeType(): string {
    return systemMimeType(this.faker.fakerCore);
  }

  /**
   * Returns a commonly used file type.
   *
   * @example
   * faker.system.commonFileType() // 'audio'
   *
   * @since 3.1.0
   */
  commonFileType(): string {
    return systemCommonFileType(this.faker.fakerCore);
  }

  /**
   * Returns a commonly used file extension.
   *
   * @example
   * faker.system.commonFileExt() // 'gif'
   *
   * @since 3.1.0
   */
  commonFileExt(): string {
    return systemCommonFileExt(this.faker.fakerCore);
  }

  /**
   * Returns a file type.
   *
   * @example
   * faker.system.fileType() // 'message'
   *
   * @since 3.1.0
   */
  fileType(): string {
    return systemFileType(this.faker.fakerCore);
  }

  /**
   * Returns a file extension.
   *
   * @param mimeType Valid [mime-type](https://github.com/jshttp/mime-db/blob/master/db.json)
   *
   * @example
   * faker.system.fileExt() // 'emf'
   * faker.system.fileExt('application/json') // 'json'
   *
   * @since 3.1.0
   */
  fileExt(mimeType?: string): string {
    return systemFileExt(this.faker.fakerCore, mimeType);
  }

  /**
   * Returns a directory path.
   *
   * @example
   * faker.system.directoryPath() // '/etc/mail'
   *
   * @since 3.1.0
   */
  directoryPath(): string {
    return systemDirectoryPath(this.faker.fakerCore);
  }

  /**
   * Returns a file path.
   *
   * @example
   * faker.system.filePath() // '/usr/local/src/money.dotx'
   *
   * @since 3.1.0
   */
  filePath(): string {
    return systemFilePath(this.faker.fakerCore);
  }

  /**
   * Returns a [semantic version](https://semver.org).
   *
   * @example
   * faker.system.semver() // '1.15.2'
   *
   * @since 3.1.0
   */
  semver(): string {
    return systemSemver(this.faker.fakerCore);
  }

  /**
   * Returns a random [network interface](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-understanding_the_predictable_network_interface_device_names).
   *
   * @param options The options to use.
   * @param options.interfaceType The interface type. Can be one of `en`, `wl`, `ww`.
   * @param options.interfaceSchema The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
   *
   * @example
   * faker.system.networkInterface() // 'enp0s3'
   * faker.system.networkInterface({ interfaceType: 'wl' }) // 'wlo1'
   * faker.system.networkInterface({ interfaceSchema: 'mac' }) // 'enx000c29c00000'
   * faker.system.networkInterface({ interfaceType: 'en', interfaceSchema: 'pci' }) // 'enp5s0f1d0'
   *
   * @since 7.4.0
   */
  networkInterface(
    options: {
      /**
       * The interface type. Can be one of `en`, `wl`, `ww`.
       *
       * @default faker.helpers.arrayElement(['en', 'wl', 'ww'])
       */
      interfaceType?: CommonInterfaceType;
      /**
       * The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
       *
       * @default faker.helpers.objectKey(['index' | 'slot' | 'mac' | 'pci'])
       */
      interfaceSchema?: CommonInterfaceSchema;
    } = {}
  ): string {
    return systemNetworkInterface(this.faker.fakerCore, options);
  }

  /**
   * Returns a random cron expression.
   *
   * @param options The optional options to use.
   * @param options.includeYear Whether to include a year in the generated expression. Defaults to `false`.
   * @param options.includeNonStandard Whether to include a `@yearly`, `@monthly`, `@daily`, etc text labels in the generated expression. Defaults to `false`.
   *
   * @example
   * faker.system.cron() // '45 23 * * 6'
   * faker.system.cron({ includeYear: true }) // '45 23 * * 6 2067'
   * faker.system.cron({ includeYear: false }) // '45 23 * * 6'
   * faker.system.cron({ includeNonStandard: false }) // '45 23 * * 6'
   * faker.system.cron({ includeNonStandard: true }) // '@yearly'
   *
   * @since 7.5.0
   */
  cron(
    options: {
      /**
       * Whether to include a year in the generated expression.
       *
       * @default false
       */
      includeYear?: boolean;
      /**
       * Whether to include a `@yearly`, `@monthly`, `@daily`, etc text labels in the generated expression.
       *
       * @default false
       */
      includeNonStandard?: boolean;
    } = {}
  ): string {
    return systemCron(this.faker.fakerCore, options);
  }
}
