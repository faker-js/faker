import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to medical and healthcare data.
 */
export type MedicalDefinition = LocaleEntry<{
  /**
   * Medical specialties, e.g. `'Cardiology'`.
   */
  specialty: string[];

  /**
   * Hospital departments, e.g. `'Emergency Department'`.
   */
  department: string[];

  /**
   * Plausible medical condition names (without diagnosis codes), e.g. `'Type 2 Diabetes'`.
   */
  condition: string[];

  /**
   * Symptoms, e.g. `'Shortness of Breath'`.
   */
  symptom: string[];

  /**
   * Medical procedures, e.g. `'Appendectomy'`.
   */
  procedure: string[];

  /**
   * Common allergens, e.g. `'Penicillin'`.
   */
  allergen: string[];

  /**
   * Blood types, e.g. `'O+'`.
   */
  blood_type: string[];

  /**
   * Invented morpheme prefixes used to build fictitious drug names.
   */
  drug_prefix: string[];

  /**
   * Invented morpheme infixes used to build fictitious drug names.
   */
  drug_infix: string[];

  /**
   * Invented morpheme suffixes used to build fictitious drug names.
   */
  drug_suffix: string[];

  /**
   * Real INN stems that a fictitious drug name must not end with, so generated
   * names cannot resemble real substances.
   */
  drug_forbidden_ending: string[];
}>;
