import type { Cvss } from '../modules/security';
import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to security.
 */
export type SecurityDefinitions = LocaleEntry<{
  /**
   * CVE definition.
   */
  cve: string[];

  /**
   * CWE definition.
   */
  cwe: string[];

  /**
   * CVSS object
   */
  cvss: Cvss;
}>;
