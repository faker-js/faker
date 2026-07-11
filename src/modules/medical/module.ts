import { ModuleBase } from '../../internal/module-base';

/**
 * Module to generate plausible medical and healthcare related entries.
 *
 * ### Overview
 *
 * Generate plausible, non-clinical healthcare data for tests, demos, and
 * fixtures: a medical [`specialty()`](https://fakerjs.dev/api/medical.html#specialty),
 * a hospital [`department()`](https://fakerjs.dev/api/medical.html#department),
 * a [`condition()`](https://fakerjs.dev/api/medical.html#condition),
 * a [`symptom()`](https://fakerjs.dev/api/medical.html#symptom),
 * a [`procedure()`](https://fakerjs.dev/api/medical.html#procedure),
 * an [`allergen()`](https://fakerjs.dev/api/medical.html#allergen),
 * a [`bloodType()`](https://fakerjs.dev/api/medical.html#bloodtype),
 * and a fictitious [`drugName()`](https://fakerjs.dev/api/medical.html#drugname).
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
   * The name is assembled from invented morphemes and deliberately avoids real
   * WHO INN stems (e.g. `-statin`, `-pril`), so it never resolves to a real
   * medicine or brand and cannot be mistaken for one.
   *
   * @example
   * faker.medical.drugName() // 'Zolpraxen'
   *
   * @since 10.6.0
   */
  drugName(): string {
    const {
      drug_prefix: prefixes,
      drug_infix: infixes,
      drug_suffix: suffixes,
      drug_forbidden_ending: forbiddenEndings,
    } = this.faker.definitions.medical;

    let name = '';
    // Retry a few times so a name that happens to end in a real INN stem is
    // rerolled rather than returned.
    for (let attempt = 0; attempt < 12; attempt++) {
      const parts = [this.faker.helpers.arrayElement(prefixes)];
      if (this.faker.datatype.boolean(0.4)) {
        parts.push(this.faker.helpers.arrayElement(infixes));
      }

      parts.push(this.faker.helpers.arrayElement(suffixes));
      name = parts.join('');

      const lower = name.toLowerCase();
      if (forbiddenEndings.every((ending) => !lower.endsWith(ending))) {
        break;
      }
    }

    return name;
  }
}
