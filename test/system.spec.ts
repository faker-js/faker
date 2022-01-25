import { afterEach, describe, expect, it } from 'vitest';
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

  for (let { seed, expectations } of seededRuns) {
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
      for (const functionName of functionNames) {
        describe(`${functionName}()`, () => {
          it(`should return random value from ${functionName} array`, () => {
            const actual = faker.system[functionName]();

            expect(actual !== '').toBeTruthy();
          });
        });
      }
    }
  });
});
