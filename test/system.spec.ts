import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns, seededTests } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'commonFileExt',
  'commonFileName',
  'commonFileType',
  'cron',
  'directoryPath',
  'fileExt',
  'fileName',
  'filePath',
  'fileType',
  'mimeType',
  'networkInterface',
  'semver',
];

describe('system', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'system', (t) => {
    t.itEach(
      'commonFileExt',
      'commonFileType',
      'directoryPath',
      'filePath',
      'fileType',
      'mimeType',
      'semver'
    );

    t.describe('fileName', (t) => {
      t.it('noArgs').it('with extensionCount', { extensionCount: 2 });
    });

    t.describe('commonFileName', (t) => {
      t.it('noArgs').it('with extension', 'ext');
    });

    t.describe('fileExt', (t) => {
      t.it('noArgs').it('with mimeType', 'application/json');
    });

    t.describe('networkInterface', (t) => {
      t.it('noArgs');
      for (const interfaceSchema of [
        undefined,
        'index',
        'slot',
        'mac',
        'pci',
      ] as const) {
        for (const interfaceType of [undefined, 'en', 'wl', 'ww'] as const) {
          t.it(`with ${JSON.stringify({ interfaceType, interfaceSchema })}`, {
            interfaceType,
            interfaceSchema,
          });
        }
      }
    });
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.system[functionName]();

          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('commonFileExt()', () => {
        it('should return common file types', () => {
          const fileExt = faker.system.commonFileExt();
          const extList = [
            'gif',
            'htm',
            'html',
            'jpe',
            'jpeg',
            'jpg',
            'm1v',
            'm2a',
            'm1v',
            'm2v',
            'm3a',
            'mp2',
            'mp2a',
            'mp3',
            'mp4',
            'mp4v',
            'mpe',
            'mpeg',
            'mpg',
            'mpg4',
            'mpga',
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

        it('should return filenames with 1 ext per default', () => {
          const fileName = faker.system.fileName();
          const parts = fileName.split('.');

          expect(parts).length(2);
        });

        it('should return filenames without an extension when extensionCount is 0', () => {
          const fileName = faker.system.fileName({
            extensionCount: 0,
          });

          expect(fileName).not.toContain('.');
        });

        it('should return filenames without an extension when extensionCount is negative', () => {
          const fileName = faker.system.fileName({
            extensionCount: -1,
          });

          expect(fileName).not.toContain('.');
        });

        it.each(times(10))(
          'should return filenames with %s extensions',
          (extensionCount) => {
            const fileName = faker.system.fileName({
              extensionCount,
            });
            const parts = fileName.split('.');

            expect(parts).length(extensionCount + 1);
          }
        );
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
          ).toSatisfy(validator.isMimeType);
        });
      });

      describe('semver()', () => {
        it('should return semver', () => {
          expect(
            faker.system.semver(),
            `generated semver, first number should be between 0 and 9.`
          ).toSatisfy(validator.isSemVer);
        });
      });

      describe('networkInterface()', () => {
        it('should return network interface', () => {
          const networkInterface = faker.system.networkInterface();

          expect(
            networkInterface,
            `generated network interface should be valid network interface.`
          ).toMatch(
            /^(?:P\d)?(?:en|wl|ww)(?:o\d|s\d(?:f\d)?(?:d\d)?|x[a-f\d]{12}|p\ds\d(?:f\d)?(?:d\d)?)$/
          );
        });

        it('should return a network interface with a given type', () => {
          const networkInterface = faker.system.networkInterface({
            interfaceType: 'wl',
          });

          expect(
            networkInterface,
            `generated network interface should be valid network interface.`
          ).toMatch(
            /^(?:P\d)?wl(?:o\d|s\d(?:f\d)?(?:d\d)?|x[a-f\d]{12}|p\ds\d(?:f\d)?(?:d\d)?)$/
          );
        });

        it('should return a network interface with an index schema', () => {
          const networkInterface = faker.system.networkInterface({
            interfaceSchema: 'index',
          });

          expect(
            networkInterface,
            `generated network interface should be valid network interface.`
          ).toMatch(/^(?:en|wl|ww)o\d$/);
        });

        it('should return a network interface with a slot schema', () => {
          const networkInterface = faker.system.networkInterface({
            interfaceSchema: 'slot',
          });

          expect(
            networkInterface,
            `generated network interface should be valid network interface.`
          ).toMatch(/^(?:en|wl|ww)s\d(?:f\d)?(?:d\d)?$/);
        });

        it('should return a network interface with a mac schema', () => {
          const networkInterface = faker.system.networkInterface({
            interfaceSchema: 'mac',
          });

          expect(
            networkInterface,
            `generated network interface should be valid network interface.`
          ).toMatch(/^(?:en|wl|ww)x[a-f\d]{12}$/);
        });

        it('should return a network interface with a pci schema', () => {
          const networkInterface = faker.system.networkInterface({
            interfaceSchema: 'pci',
          });

          expect(
            networkInterface,
            `generated network interface should be valid network interface.`
          ).toMatch(/^(?:P\d)?(?:en|wl|ww)p\ds\d(?:f\d)?(?:d\d)?$/);
        });

        it('should return a network interface with a given type and schema', () => {
          const networkInterface = faker.system.networkInterface({
            interfaceType: 'en',
            interfaceSchema: 'mac',
          });

          expect(
            networkInterface,
            `generated network interface should be valid network interface.`
          ).toMatch(/^enx[a-f\d]{12}$/);
        });
      });

      describe('cron()', () => {
        const regex = new RegExp(
          /^([1-9]|[1-5]\d|\*) ([1-9]|1\d|2[0-3]|\*) ([1-9]|[12]\d|3[01]|\*|\?) ([1-9]|1[0-2]|\*) ([0-6]|\*|\?|[A-Z]{3})/
        );
        it('should return cron expression with 5 elements', () => {
          expect(
            faker.system.cron(),
            `generated cron, string should contain 5 space-separated values`
          ).toMatch(regex);
        });

        it('should return expression with 5 elements with includeYear false', () => {
          expect(
            faker.system.cron({ includeYear: false }),
            `generated cron, string should contain 5 space-separated values`
          ).toMatch(regex);
        });

        it('should return cron expression with 6 elements with includeYear true', () => {
          expect(
            faker.system.cron({ includeYear: true }),
            `generated cron, string should contain 6 space-separated values`
          ).toMatch(new RegExp(`${regex.source} ?((19[7-9]\d)|20\\d{2}|\\*)?`));
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
