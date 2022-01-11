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
    var str = this.faker.random.words();
    str =
      str.toLowerCase().replace(/\W/g, '_') + '.' + this.faker.system.fileExt();
    return str;
  }

  /**
   * commonFileName
   *
   * @method faker.system.commonFileName
   * @param {string} ext
   */
  commonFileName(ext) {
    var str = this.faker.random.words();
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
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = this.faker.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach(function (m) {
      var type = m.split('/')[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach(function (ext) {
          extensionSet.add(ext);
        });
      }
    });

    var types = setToArray(typeSet);
    var extensions = setToArray(extensionSet);
    var mimeTypeKeys = Object.keys(this.faker.definitions.system.mimeTypes);

    return this.faker.random.arrayElement(mimeTypeKeys);
  }

  /**
   * returns a commonly used file type
   *
   * @method faker.system.commonFileType
   */
  commonFileType() {
    return this.faker.random.arrayElement(commonFileTypes);
  }

  /**
   * returns a commonly used file extension
   *
   * @method faker.system.commonFileExt
   */
  commonFileExt() {
    return this.faker.system.fileExt(
      this.faker.random.arrayElement(commonMimeTypes)
    );
  }

  /**
   * returns any file type available as mime-type
   *
   * @method faker.system.fileType
   */
  fileType() {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = this.faker.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach(function (m) {
      var type = m.split('/')[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach(function (ext) {
          extensionSet.add(ext);
        });
      }
    });

    var types = setToArray(typeSet);
    var extensions = setToArray(extensionSet);
    var mimeTypeKeys = Object.keys(this.faker.definitions.system.mimeTypes);
    return this.faker.random.arrayElement(types);
  }

  /**
   * fileExt
   *
   * @method faker.system.fileExt
   * @param {string} mimeType
   */
  fileExt(mimeType) {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = this.faker.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach(function (m) {
      var type = m.split('/')[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach(function (ext) {
          extensionSet.add(ext);
        });
      }
    });

    var types = setToArray(typeSet);
    var extensions = setToArray(extensionSet);
    var mimeTypeKeys = Object.keys(this.faker.definitions.system.mimeTypes);

    if (mimeType) {
      var mimes = this.faker.definitions.system.mimeTypes;
      return this.faker.random.arrayElement(mimes[mimeType].extensions);
    }

    return this.faker.random.arrayElement(extensions);
  }

  /**
   * returns directory path
   *
   * @method faker.system.directoryPath
   */
  directoryPath() {
    var paths = this.faker.definitions.system.directoryPaths;
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
  semver() {
    return [
      this.faker.datatype.number(9),
      this.faker.datatype.number(9),
      this.faker.datatype.number(9),
    ].join('.');
  }
}
