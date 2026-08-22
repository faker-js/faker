import { ModuleBase } from '../../internal/module-base';

/**
 * Module to generate plausible medical and healthcare related entries.
 *
 * ### Overview
 *
 * Generate plausible, non-clinical healthcare data for tests, demos and fixtures. The usual building blocks of a patient record are [`condition()`](https://fakerjs.dev/api/medical.html#condition), [`symptom()`](https://fakerjs.dev/api/medical.html#symptom) and [`procedure()`](https://fakerjs.dev/api/medical.html#procedure); the module also covers specialties, departments, blood types, allergens and drug names.
 *
 * All values are intentionally generic or invented, and real diagnosis codes (e.g. ICD-10) and correlated patient records are deliberately out of scope — this data must never be used for clinical purposes.
 *
 * The names returned by [`drugName()`](https://fakerjs.dev/api/medical.html#drugname) are invented and were screened so that they do not name a real product. That guarantee is specific to `drugName()`: an allergen is defined by the substance a person reacts to, so [`allergen()`](https://fakerjs.dev/api/medical.html#allergen) names real ones, medicines such as `Penicillin` among them.
 */
export class MedicalModule extends ModuleBase {
  /**
   * Returns a random medical specialty.
   *
   * @example
   * faker.medical.specialty() // 'Cardiology'
   *
   * @since 11.0.0
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
   * @since 11.0.0
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
   * @since 11.0.0
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
   * @since 11.0.0
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
   * @since 11.0.0
   */
  procedure(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.procedure
    );
  }

  /**
   * Returns a random allergen.
   *
   * These are real substances, unlike the invented values of [`drugName()`](https://fakerjs.dev/api/medical.html#drugname): an allergy field records what a person reacts to, so real names are what belongs in it. Medicines such as `Penicillin` are included for that reason, as are contact allergens such as `Nickel`.
   *
   * Membership follows what an allergy field in a real record carries rather than a strict immunological rule, so reactions that are pharmacological rather than immune — `Aspirin`, `Codeine`, `Sulfites` — sit alongside true IgE and contact allergies. What a record would file as an intolerance is left out: lactose, fructose and MSG, and gluten, whose IgE counterpart is listed here as `Wheat`.
   *
   * @example
   * faker.medical.allergen() // 'Penicillin'
   *
   * @since 11.0.0
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
   * @since 11.0.0
   */
  bloodType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.blood_type
    );
  }

  /**
   * Returns a fictitious, brand-style drug name.
   *
   * All values are invented: they were generated from neutral morphemes, then screened by hand against real medicinal products — human brands, including ones marketed only outside the US and EU, veterinary products, and WHO INN generic names and class stems (e.g. `-statin`, `-pril`).
   *
   * That screen is a manual step rather than something the test suite re-runs. The tests lock in the collisions it has already caught and reject any name that ends in an INN stem, so a name added later has to be screened by hand.
   *
   * @example
   * faker.medical.drugName() // 'Zolpraxen'
   *
   * @since 11.0.0
   */
  drugName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medical.drug_name
    );
  }
}
