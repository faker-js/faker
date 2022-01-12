// generates fake data for many computer systems properties

import type { Faker } from '.';

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

function setToArray<T>(set: Set<T>): T[] {
  // shortcut if Array.from is available
  if (Array.from) {
    return Array.from(set);
  }

  const array: T[] = [];
  set.forEach((item) => {
    array.push(item);
  });
  return array;
}

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
   * generates a file name
   *
   * @method faker.system.fileName
   */
  fileName() {
    let str = this.faker.random.words();
    str =
      str.toLowerCase().replace(/\W/g, '_') + '.' + this.faker.system.fileExt();
    return str;
  }

  /**
   * commonFileName
   *
   * @method faker.system.commonFileName
   * @param ext
   */
  commonFileName(ext): string {
    let str = this.faker.random.words();
    str = str.toLowerCase().replace(/\W/g, '_');
    str += '.' + (ext || this.faker.system.commonFileExt());
    return str;
  }

  /**
   * mimeType
   *
   * @method faker.system.mimeType
   */
  mimeType() {
    const typeSet = new Set<string>();
    const extensionSet = new Set();
    const mimeTypes = this.faker.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach((m) => {
      const type = m.split('/')[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach((ext) => {
          extensionSet.add(ext);
        });
      }
    });

    const types = setToArray(typeSet);
    const extensions = setToArray(extensionSet);
    const mimeTypeKeys = Object.keys(this.faker.definitions.system.mimeTypes);

    return this.faker.random.arrayElement(mimeTypeKeys);
  }

  /**
   * Returns a commonly used file type
   *
   * @method faker.system.commonFileType
   */
  commonFileType() {
    return this.faker.random.arrayElement(commonFileTypes);
  }

  /**
   * Returns a commonly used file extension
   *
   * @method faker.system.commonFileExt
   */
  commonFileExt() {
    return this.faker.system.fileExt(
      this.faker.random.arrayElement(commonMimeTypes)
    );
  }

  /**
   * Returns any file type available as mime-type
   *
   * @method faker.system.fileType
   */
  fileType() {
    const typeSet = new Set<string>();
    const extensionSet = new Set();
    const mimeTypes = this.faker.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach((m) => {
      const type = m.split('/')[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach((ext) => {
          extensionSet.add(ext);
        });
      }
    });

    const types = setToArray(typeSet);
    const extensions = setToArray(extensionSet);
    const mimeTypeKeys = Object.keys(this.faker.definitions.system.mimeTypes);
    return this.faker.random.arrayElement(types);
  }

  /**
   * fileExt
   *
   * @method faker.system.fileExt
   * @param mimeType
   */
  fileExt(mimeType?: string): string {
    const typeSet = new Set<string>();
    const extensionSet = new Set<string>();
    const mimeTypes = this.faker.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach((m) => {
      const type = m.split('/')[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach((ext) => {
          extensionSet.add(ext);
        });
      }
    });

    const types = setToArray(typeSet);
    const extensions = setToArray(extensionSet);
    const mimeTypeKeys = Object.keys(this.faker.definitions.system.mimeTypes);

    if (mimeType) {
      const mimes = this.faker.definitions.system.mimeTypes;
      return this.faker.random.arrayElement(mimes[mimeType].extensions);
    }

    return this.faker.random.arrayElement(extensions);
  }

  /**
   * Returns directory path
   *
   * @method faker.system.directoryPath
   */
  directoryPath(): string {
    const paths = this.faker.definitions.system.directoryPaths;
    return this.faker.random.arrayElement(paths);
  }

  /**
   * returns file path
   *
   * @method faker.system.filePath
   */
  filePath() {
    return this.faker.fake(
      '{{system.directoryPath}}/{{system.fileName}}.{{system.fileExt}}'
    );
  }

  /**
   * semver
   *
   * @method faker.system.semver
   */
  semver(): string {
    return [
      this.faker.datatype.number(9),
      this.faker.datatype.number(9),
      this.faker.datatype.number(9),
    ].join('.');
  }
}
