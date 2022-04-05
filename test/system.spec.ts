import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      fileName: 'mobile_fish.gif',
      commonFileName: 'mobile_fish.mpe',
      mimeType: 'application/vnd.marlin.drm.license+xml',
      commonFileType: 'audio',
      commonFileExt: 'png',
      fileType: 'image',
      fileExt: 'chm',
      directoryPath: '/opt/bin',
      filePath: '/opt/bin/directives_application_home.paw',
      semver: '3.7.9',
    },
  },
  {
    seed: 1337,
    expectations: {
      fileName: 'delaware.uvvt',
      commonFileName: 'delaware.mp2',
      mimeType: 'application/vnd.dxr',
      commonFileType: 'audio',
      commonFileExt: 'wav',
      fileType: 'font',
      fileExt: 'gxt',
      directoryPath: '/Library',
      filePath: '/Library/bike_interactive.qwt',
      semver: '2.5.1',
    },
  },
  {
    seed: 1211,
    expectations: {
      fileName: 'turnpike_frozen_handcrafted.mka',
      commonFileName: 'turnpike_frozen_handcrafted.mp4v',
      mimeType: 'text/vnd.fmi.flexstor',
      commonFileType: 'application',
      commonFileExt: 'htm',
      fileType: 'x-shader',
      fileExt: 'opml',
      directoryPath: '/var/log',
      filePath: '/var/log/forward_supervisor.swf',
      semver: '9.4.8',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'commonFileExt',
  'commonFileName',
  'commonFileType',
  'directoryPath',
  'fileExt',
  'fileName',
  'filePath',
  'fileType',
  'mimeType',
  'semver',
];

describe('system', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.system[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('commonFileExt()', () => {
        it('should return common file types', () => {
          const fileExt = faker.system.commonFileExt();
          const extList = [
            'gif',
            'htm',
            'html',
            'jpeg',
            'm2a',
            'm2v',
            'mp2',
            'mp3',
            'm2v',
            'mp4',
            'mp4v',
            'mpeg',
            'mpg',
            'pdf',
            'png',
            'shtml',
            'wav',
          ];

          expect(
            extList,
            `generated common file ext should be one of [${extList.join(
              ', '
            )}]. Got "${fileExt}".`
          ).include(fileExt);
        });
      });

      describe('commonFileName()', () => {
        it('should return common file name without system path separators', () => {
          const commonFileName = faker.system.commonFileName();

          expect(
            commonFileName,
            'generated common file name should not have path separators'
          ).not.toContain('/');
        });

        it('should return common file name with ext on the end', () => {
          const fileName = faker.system.commonFileName();

          expect(
            fileName,
            'generated common file name should have a extension'
          ).toContain('.');
        });

        it('should return common file name with given ext', () => {
          const fileName = faker.system.commonFileName('txt');

          expect(
            fileName,
            'generated common file name should not have path separators'
          ).not.toContain('/');
          expect(
            fileName,
            'generated common file name should have given ext'
          ).toContain('txt');
        });
      });

      describe('commonFileType()', () => {
        it('should return common file types', () => {
          const fileType = faker.system.commonFileType();
          const fileTypes = ['application', 'audio', 'image', 'text', 'video'];

          expect(
            fileTypes,
            `generated common file type should contain one of [${fileTypes.join(
              ','
            )}]. Got "${fileType}".`
          ).toContain(fileType);
        });
      });

      describe('directoryPath()', () => {
        it('should return unix fs directory full path', () => {
          const directoryPath = faker.system.directoryPath();

          expect(
            directoryPath.startsWith('/'),
            'generated directoryPath should start with /'
          ).toBeTruthy();
        });
      });

      describe('fileExt()', () => {
        it('should return file ext', () => {
          const fileExt = faker.system.fileExt();

          expect(
            fileExt.length,
            'generated fileExt should start with ."'
          ).toBeGreaterThan(1);
        });

        it('should return file ext based on mimeType', () => {
          const fileExt = faker.system.fileExt('text/plain');
          const extList = [
            'txt',
            'text',
            'conf',
            'def',
            'list',
            'log',
            'in',
            'ini',
          ];

          expect(
            extList,
            `generated common file ext should be one of [${extList.join(
              ','
            )}]. Got "${fileExt}".`
          ).include(fileExt);
        });
      });

      describe('fileName()', () => {
        it('should return filenames without system path separators', () => {
          const fileName = faker.system.fileName();

          expect(
            fileName.startsWith('/'),
            'generated fileNames should not have path separators'
          ).toBeFalsy();
        });

        it('should return filenames with ext on the end', () => {
          const fileName = faker.system.fileName();

          expect(
            fileName,
            'generated fileNames should have an extension'
          ).toContain('.');
        });
      });

      describe('filePath()', () => {
        it('should return unix fs file full path', () => {
          const filePath = faker.system.filePath();
          const parts = filePath.split('/');

          expect(
            filePath.startsWith('/'),
            'generated filePath should start with /'
          ).toBeTruthy();
          expect(
            parts[parts.length - 1],
            'generated filePath should have a file extension'
          ).toMatch(/^\w+\.\w+$/);
        });
      });

      describe('mimeType()', () => {
        it('should return mime types', () => {
          const mimeType = faker.system.mimeType();

          expect(
            mimeType,
            `generated mime types should be valid mime types.`
          ).satisfy(validator.isMimeType);
        });
      });

      describe('semver()', () => {
        it('should return semver', () => {
          expect(
            faker.system.semver(),
            `generated semver, first number should be between 0 and 9.`
          ).satisfy(validator.isSemVer);
        });
      });
    }
  });

  describe('extra tests', () => {
    describe('commonFileName()', () => {
      afterEach(() => {
        faker.locale = 'en';
      });

      it('#770', () => {
        faker.seed(5423027051750305);
        faker.setLocale('sk');
        faker.system.commonFileName('xml');
        faker.system.commonFileName('xml');
      });
    });
  });
});
