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
   * @example
   * faker.system.fileName() // 'self_enabling_accountability_toys.kpt'
   */
  fileName(): string {
    const str = this.faker.random.words().toLowerCase().replace(/\W/g, '_');

    return `${str}.${this.fileExt()}`;
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
    const str = this.faker.random.words().toLowerCase().replace(/\W/g, '_');

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
}
