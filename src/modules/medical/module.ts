import { ModuleBase } from '../../internal/module-base';

/**
 * Module to generate plausible medical and healthcare related entries.
 *
 * ### Overview
 *
 * Generate plausible, non-clinical healthcare data for tests, demos, and
 * fixtures: specialties, hospital departments, conditions, symptoms,
 * procedures, allergens, blood types, and fictitious drug names.
 *
 * All values are intentionally generic or invented. Real diagnosis codes (e.g.
 * ICD-10), real medicine names, and correlated patient records are deliberately
 * out of scope — this data must never be used for clinical purposes.
 */
export class MedicalModule extends ModuleBase {
  /**
   * Returns a random medical specialty.
   *
   * @example
   * faker.medical.specialty() // 'Cardiology'
   *
   * @since 10.6.0
   */
  specialty(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.specialty
    );
  }

  /**
   * Returns a random hospital department.
   *
   * @example
   * faker.medical.department() // 'Emergency Department'
   *
   * @since 10.6.0
   */
  department(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.department
    );
  }

  /**
   * Returns a random, plausible medical condition name (without any diagnosis code).
   *
   * @example
   * faker.medical.condition() // 'Type 2 Diabetes'
   *
   * @since 10.6.0
   */
  condition(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.condition
    );
  }

  /**
   * Returns a random symptom.
   *
   * @example
   * faker.medical.symptom() // 'Shortness of Breath'
   *
   * @since 10.6.0
   */
  symptom(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.symptom
    );
  }

  /**
   * Returns a random medical procedure.
   *
   * @example
   * faker.medical.procedure() // 'Appendectomy'
   *
   * @since 10.6.0
   */
  procedure(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.procedure
    );
  }

  /**
   * Returns a random allergen.
   *
   * @example
   * faker.medical.allergen() // 'Penicillin'
   *
   * @since 10.6.0
   */
  allergen(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.allergen
    );
  }

  /**
   * Returns a random blood type.
   *
   * @example
   * faker.medical.bloodType() // 'O+'
   *
   * @since 10.6.0
   */
  bloodType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.blood_type
    );
  }

  /**
   * Returns a fictitious, brand-style drug name.
   *
   * All values are invented: they were generated from neutral morphemes and
   * screened against real brand names, WHO INN generic names, and INN class
   * stems (e.g. `-statin`, `-pril`), so they do not resolve to real medicines.
   *
   * @example
   * faker.medical.drugName() // 'Zolpraxen'
   *
   * @since 10.6.0
   */
  drugName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.drug_name
    );
  }
}
