import { afterEach, describe, expect, it } from 'vitest';
import validator from 'validator';
import { faker } from '../dist/cjs';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      fileName: 'mobile_application.wad',
      commonFileName: 'mobile_application.gif',
      mimeType: 'application/vnd.marlin.drm.license+xml',
      commonFileType: 'audio',
      commonFileExt: 'png',
      fileType: 'image',
      fileExt: 'chm',
      directoryPath: '/opt/bin',
      // TODO @prisis 2022-01-25: add a parameter to have the possibility to have one or two ext on file.
      filePath: '/opt/bin/directives_multi_byte_table.p10.m21',
      semver: '3.7.9',
    },
  },
  {
    seed: 1337,
    expectations: {
      fileName: 'delaware.vcg',
      commonFileName: 'delaware.wav',
      mimeType: 'application/vnd.dxr',
      commonFileType: 'audio',
      commonFileExt: 'wav',
      fileType: 'font',
      fileExt: 'gxt',
      directoryPath: '/Library',
      // TODO @prisis 2022-01-25: add a parameter to have the possibility to have one or two ext on file.
      filePath: '/Library/bike_kiribati.kpr.ez3',
      semver: '2.5.1',
    },
  },
  {
    seed: 1211,
    expectations: {
      fileName: 'turnpike_cross_platform_handcrafted.mka',
      commonFileName: 'turnpike_cross_platform_handcrafted.mp4v',
      mimeType: 'text/vnd.fmi.flexstor',
      commonFileType: 'application',
      commonFileExt: 'htm',
      fileType: 'x-shader',
      fileExt: 'opml',
      directoryPath: '/var/log',
      // TODO @prisis 2022-01-25: add a parameter to have the possibility to have one or two ext on file.
      filePath: '/var/log/forward_frozen.swf.fcdt',
      semver: '9.4.8',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'fileName',
  'commonFileName',
  'mimeType',
  'commonFileType',
  'commonFileExt',
  'fileType',
  'fileExt',
  'directoryPath',
  'filePath',
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

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('directoryPath()', () => {
        it('should return unix fs directory full path', () => {
          const directoryPath = faker.system.directoryPath();

          expect(
            directoryPath.startsWith('/'),
            'generated directoryPath should start with /'
          ).toBeTruthy();
        });
      });

      describe('filePath()', () => {
        it('should return unix fs file full path', () => {
          const filePath = faker.system.filePath();

          expect(
            filePath.startsWith('/'),
            'generated filePath should start with /'
          ).toBeTruthy();
          // TODO @prisis 2022-01-26: Add test to validate if the path has ext on the end.
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

      describe('commonFileName()', () => {
        it('should return common file name without system path separators', () => {
          const fileName = faker.system.commonFileName();

          expect(
            fileName,
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

      describe('commonFileExt()', () => {
        it('should return common file types', () => {
          const fileExt = faker.system.commonFileExt();
          const extList = [
            'pdf',
            'mpeg',
            'wav',
            'png',
            'jpeg',
            'gif',
            'mp4v',
            'mpeg',
            'htm',
            'm2a',
          ];

          expect(
            extList,
            `generated common file ext should be one of [${extList.join(
              ','
            )}]. Got "${fileExt}".`
          ).include(fileExt);
        });
      });

      describe('mimeType()', () => {
        it('should return mime types', () => {
          const mimeType = faker.system.mimeType();

          expect(
            mimeType,
            `generated mime types should be valid mime types.`
          ).match(/.+\/*./gm);
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
});
