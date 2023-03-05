import type { LocaleDefinition, LocaleEntry } from '../';
import { Faker } from '../';
import type { Airline, Airplane, Airport } from '../modules/airline';

export type AirlineDefinitions = LocaleEntry<{
  /**
   * Some airline information
   */
  airline: Airline[];

  /**
   * Some airplane information
   */
  airplane: Airplane[];

  /**
   * Some airport information
   */
  airport: Airport[];
}>;

new Faker();

const customLocale: LocaleDefinition = {
  title: 'My custom locale',
  internet: {
    domainSuffix: ['test'],
  },
};
