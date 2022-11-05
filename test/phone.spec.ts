import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { luhnCheck } from '../src/modules/helpers/luhn-check';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 25;

describe('phone', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'phone', (t) => {
    t.itEach(
      'phoneBrand',
      'phoneModel',
      'phoneCamera',
      'phoneOs',
      'phoneConnectivityTechnologies',
      'phoneCellularTechnologies',
      'phoneColor',
      'phoneProductDimensions',
      'phoneMemoryStorageCapacity',
      'phoneScreenSize',
      'imei'
    );

    t.describe('phoneNumber', (t) => {
      t.it('noArgs').it('format', '###-###-####');
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('phoneNumber()', () => {
        it('should return a random phoneNumber with a random format', () => {
          const phoneNumber = faker.phone.phoneNumber();

          expect(phoneNumber).toMatch(/\d/);
        });
      });

      describe('phoneBrand()', () => {
        it('should return a random brand', () => {
          const phoneBrand = faker.phone.phoneBrand();

          expect(phoneBrand).toBeTruthy();
          expect(phoneBrand).toBeTypeOf('string');
          expect(faker.definitions.phone?.brand).toContain(phoneBrand);
        });
      });

      describe('phoneModel()', () => {
        it('should return a random model', () => {
          const phoneModel = faker.phone.phoneModel();

          expect(phoneModel).toBeTruthy();
          expect(phoneModel).toBeTypeOf('string');
          expect(faker.definitions.phone?.model).toContain(phoneModel);
        });
      });

      describe('phoneCamera()', () => {
        it('should return a random camera', () => {
          const phoneCamera = faker.phone.phoneCamera();

          expect(phoneCamera).toBeTruthy();
          expect(phoneCamera).toBeTypeOf('string');
          expect(faker.definitions.phone?.camera).toContain(phoneCamera);
        });
      });

      describe('phoneOs()', () => {
        it('should return a random os', () => {
          const phoneOs = faker.phone.phoneOs();

          expect(phoneOs).toBeTruthy();
          expect(phoneOs).toBeTypeOf('string');
          expect(faker.definitions.phone?.os).toContain(phoneOs);
        });
      });

      describe('phoneColor()', () => {
        it('should return a random color', () => {
          const phoneColor = faker.phone.phoneColor();

          expect(phoneColor).toBeTruthy();
          expect(phoneColor).toBeTypeOf('string');
        });
      });

      describe('phoneConnectivityTechnologies()', () => {
        it('should return a random connectivity technologies', () => {
          const phoneConnectivityTechnologies =
            faker.phone.phoneConnectivityTechnologies();

          expect(phoneConnectivityTechnologies).toBeTruthy();
          expect(phoneConnectivityTechnologies).toBeTypeOf('string');
          expect(faker.definitions.phone?.connectivityTechnologies).toContain(
            phoneConnectivityTechnologies
          );
        });
      });

      describe('phoneCellularTechnologies()', () => {
        it('should return a random cellular technologies', () => {
          const phoneCellularTechnologies =
            faker.phone.phoneCellularTechnologies();

          expect(phoneCellularTechnologies).toBeTruthy();
          expect(phoneCellularTechnologies).toBeTypeOf('string');
          expect(faker.definitions.phone?.cellularTechnologies).toContain(
            phoneCellularTechnologies
          );
        });
      });

      describe('phoneProductDimensions()', () => {
        it('should return a random product dimensions', () => {
          const phoneProductDimensions = faker.phone.phoneProductDimensions();

          expect(phoneProductDimensions).toBeTruthy();
          expect(phoneProductDimensions).toBeTypeOf('string');
          expect(faker.definitions.phone?.productDimensions).toContain(
            phoneProductDimensions
          );
        });
      });

      describe('phoneMemoryStorageCapacity()', () => {
        it('should return a random memory storage capacity', () => {
          const phoneMemoryStorageCapacity =
            faker.phone.phoneMemoryStorageCapacity();

          expect(phoneMemoryStorageCapacity).toBeTruthy();
          expect(phoneMemoryStorageCapacity).toBeTypeOf('string');
          expect(faker.definitions.phone?.memoryStorageCapacity).toContain(
            phoneMemoryStorageCapacity
          );
        });
      });

      describe('phoneScreenSize()', () => {
        it('should return a random screen size', () => {
          const phoneScreenSize = faker.phone.phoneScreenSize();

          expect(phoneScreenSize).toBeTruthy();
          expect(phoneScreenSize).toBeTypeOf('string');
          expect(faker.definitions.phone?.screenSize).toContain(
            phoneScreenSize
          );
        });
      });

      describe('imei()', () => {
        it('should return a string', () => {
          const imei = faker.phone.imei();
          expect(imei).toBeTypeOf('string');
        });

        it('should have a length of 18', () => {
          const imei = faker.phone.imei();
          expect(imei).toHaveLength(18);
        });

        it('should be Luhn-valid', () => {
          const imei = faker.phone.imei();
          expect(imei).toSatisfy(luhnCheck);
        });
      });
    }
  });
});
