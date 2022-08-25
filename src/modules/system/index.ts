import type { Faker } from '../..';

const commonFileTypes = ['video', 'audio', 'image', 'text', 'application'];

const commonMimeTypes = [
  'application/pdf',
  'audio/mpeg',
  'audio/wav',
  'image/png',
  'image/jpeg',
  'image/gif',
  'video/mp4',
  'video/mpeg',
  'text/html',
];

const commonInterfaceTypes = ['en', 'wl', 'ww'] as const;
const commonInterfaceSchemas = {
  index: 'o',
  slot: 's',
  mac: 'x',
  pci: 'p',
} as const;

const CRON_DAY_OF_WEEK = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
] as const;

/**
 * Generates fake data for many computer systems properties.
 */
export class System {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(System.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random file name with extension.
   *
   * @param options An options object.
   * @param options.extensionCount Define how many extensions the file name should have. A negative number will be treated as `0`. Defaults to `1`.
   *
   * @example
   * faker.system.fileName() // 'self_enabling_accountability_toys.kpt'
   * faker.system.fileName({ extensionCount: 2 }) // 'bike_table.res.vcs'
   */
  fileName(
    options: {
      /**
       * Define how many extensions the file name should have. A negative number will be treated as `0`. Defaults to `1`.
       */
      extensionCount?: number;
    } = {}
  ): string {
    const { extensionCount = 1 } = options;

    const baseName = this.faker.random
      .words()
      .toLowerCase()
      .replace(/\W/g, '_');

    if (extensionCount <= 0) {
      return baseName;
    }

    const extensionsStr = Array.from({ length: extensionCount })
      .map(() => this.fileExt())
      .join('.');

    return `${baseName}.${extensionsStr}`;
  }

  /**
   * Returns a random file name with a given extension or a commonly used extension.
   *
   * @param ext Extension. Empty string is considered to be not set.
   * @example
   * faker.system.commonFileName() // 'dollar.jpg'
   * faker.system.commonFileName('txt') // 'global_borders_wyoming.txt'
   */
  commonFileName(ext?: string): string {
    const str = this.fileName({ extensionCount: 0 });

    return `${str}.${ext || this.commonFileExt()}`;
  }

  /**
   * Returns a mime-type.
   *
   * @example
   * faker.system.mimeType() // 'video/vnd.vivo'
   */
  mimeType(): string {
    const mimeTypeKeys = Object.keys(this.faker.definitions.system.mimeTypes);

    return this.faker.helpers.arrayElement(mimeTypeKeys);
  }

  /**
   * Returns a commonly used file type.
   *
   * @example
   * faker.system.commonFileType() // 'audio'
   */
  commonFileType(): string {
    return this.faker.helpers.arrayElement(commonFileTypes);
  }

  /**
   * Returns a commonly used file extension.
   *
   * @example
   * faker.system.commonFileExt() // 'gif'
   */
  commonFileExt(): string {
    return this.fileExt(this.faker.helpers.arrayElement(commonMimeTypes));
  }

  /**
   * Returns a file type.
   *
   * @example
   * faker.system.fileType() // 'message'
   */
  fileType(): string {
    const typeSet = new Set<string>();
    const mimeTypes = this.faker.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach((m) => {
      const type = m.split('/')[0];

      typeSet.add(type);
    });

    const types = Array.from(typeSet);
    return this.faker.helpers.arrayElement(types);
  }

  /**
   * Returns a file extension.
   *
   * @param mimeType Valid [mime-type](https://github.com/jshttp/mime-db/blob/master/db.json)
   *
   * @example
   * faker.system.fileExt() // 'emf'
   * faker.system.fileExt('application/json') // 'json'
   */
  fileExt(mimeType?: string): string {
    if (typeof mimeType === 'string') {
      const mimes = this.faker.definitions.system.mimeTypes;
      return this.faker.helpers.arrayElement(mimes[mimeType].extensions);
    }

    const mimeTypes = this.faker.definitions.system.mimeTypes;
    const extensionSet = new Set<string>();

    Object.keys(mimeTypes).forEach((m) => {
      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach((ext) => {
          extensionSet.add(ext);
        });
      }
    });

    const extensions = Array.from(extensionSet);
    return this.faker.helpers.arrayElement(extensions);
  }

  /**
   * Returns a directory path.
   *
   * @example
   * faker.system.directoryPath() // '/etc/mail'
   */
  directoryPath(): string {
    const paths = this.faker.definitions.system.directoryPaths;
    return this.faker.helpers.arrayElement(paths);
  }

  /**
   * Returns a file path.
   *
   * @example
   * faker.system.filePath() // '/usr/local/src/money.dotx'
   */
  // TODO @prisis 2022-01-25: add a parameter to have the possibility to have one or two ext on file.
  filePath(): string {
    return `${this.directoryPath()}/${this.fileName()}`;
  }

  /**
   * Returns a [semantic version](https://semver.org).
   *
   * @example
   * faker.system.semver() // '1.1.2'
   */
  semver(): string {
    return [
      this.faker.datatype.number(9),
      this.faker.datatype.number(9),
      this.faker.datatype.number(9),
    ].join('.');
  }

  /**
   * Returns a random [network interface](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-understanding_the_predictable_network_interface_device_names).
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.interfaceType The interface type. Can be one of `en`, `wl`, `ww`.
   * @param options.interfaceSchema The interface schema. Can be one of `index`, `slot`, `mac`, `pci`.
   *
   * @example
   * faker.system.networkInterface() // 'enp0s3'
   * faker.system.networkInterface({ interfaceType: 'wl' }) // 'wlo1'
   * faker.system.networkInterface({ interfaceSchema: 'mac' }) // 'enx000c29c00000'
   * faker.system.networkInterface({ interfaceType: 'en', interfaceSchema: 'pci' }) // 'enp5s0f1d0'
   */
  networkInterface(
    options: {
      interfaceType?: typeof commonInterfaceTypes[number];
      interfaceSchema?: keyof typeof commonInterfaceSchemas;
    } = {}
  ): string {
    const {
      interfaceType = this.faker.helpers.arrayElement(commonInterfaceTypes),
      interfaceSchema = this.faker.helpers.objectKey(commonInterfaceSchemas),
    } = options;

    let suffix: string;
    let prefix = '';
    switch (interfaceSchema) {
      case 'index':
        suffix = this.faker.datatype.number(9).toString();
        break;
      case 'slot':
        suffix = `${this.faker.datatype.number(9)}${
          this.faker.helpers.maybe(() => `f${this.faker.datatype.number(9)}`) ??
          ''
        }${
          this.faker.helpers.maybe(() => `d${this.faker.datatype.number(9)}`) ??
          ''
        }`;
        break;
      case 'mac':
        suffix = this.faker.internet.mac('');
        break;
      case 'pci':
        prefix =
          this.faker.helpers.maybe(() => `P${this.faker.datatype.number(9)}`) ??
          '';
        suffix = `${this.faker.datatype.number(9)}s${this.faker.datatype.number(
          9
        )}${
          this.faker.helpers.maybe(() => `f${this.faker.datatype.number(9)}`) ??
          ''
        }${
          this.faker.helpers.maybe(() => `d${this.faker.datatype.number(9)}`) ??
          ''
        }`;
        break;
    }

    return `${prefix}${interfaceType}${commonInterfaceSchemas[interfaceSchema]}${suffix}`;
  }

  /**
   * Returns a cron expression
   *
   * @param options The optional options to use.
   * @param options.includeYear Whether to include a year in the generated expression. Defaults to `false`.
   * @param options.includeNonStandard Whether to include a @yearly, @monthly, @daily, etc text labels in the generated expression.  Default to `false`
   *
   * @example
   * faker.system.cron() // '45 23 * * 6'
   * faker.system.cron({ includeYear: true }) // '45 23 * * 6 2067'
   * faker.system.cron({ includeYear: false }) // '45 23 * * 6'
   * faker.system.cron({ includeNonStandard: false }) // '45 23 * * 6'
   * faker.system.cron({ includeNonStandard: true }) // '@yearly'
   */
  cron(
    options: {
      includeYear?: boolean;
      includeNonStandard?: boolean;
    } = {}
  ): string {
    const { includeYear = false, includeNonStandard = false } = options;

    // create the arrays to hold the available values for each component of the expression
    const minutes = [this.faker.datatype.number({ min: 0, max: 59 }), '*'];
    const hours = [this.faker.datatype.number({ min: 0, max: 23 }), '*'];
    const days = [this.faker.datatype.number({ min: 1, max: 31 }), '*', '?'];
    const months = [this.faker.datatype.number({ min: 1, max: 12 }), '*'];
    const daysOfWeek = [
      this.faker.datatype.number({ min: 0, max: 6 }),
      this.faker.helpers.arrayElement(CRON_DAY_OF_WEEK),
      '*',
      '?',
    ];
    const years = [this.faker.datatype.number({ min: 1970, max: 2099 }), '*'];

    const minute = this.faker.helpers.arrayElement(minutes);
    const hour = this.faker.helpers.arrayElement(hours);
    const day = this.faker.helpers.arrayElement(days);
    const month = this.faker.helpers.arrayElement(months);
    const dayOfWeek = this.faker.helpers.arrayElement(daysOfWeek);
    const year = this.faker.helpers.arrayElement(years);

    // create and return the cron expression string
    let standardExpression = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;
    if (includeYear) {
      standardExpression += ` ${year}`;
    }

    const nonStandardExpressions = [
      '@annually',
      '@daily',
      '@hourly',
      '@monthly',
      '@reboot',
      '@weekly',
      '@yearly',
    ];

    return !includeNonStandard || this.faker.datatype.boolean()
      ? standardExpression
      : this.faker.helpers.arrayElement(nonStandardExpressions);
  }
}
