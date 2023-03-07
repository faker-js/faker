# Localization

## Switching locales

Did you know Faker supports many different locales?  
When using our default instance `import { faker } from '@faker-js/faker'` you get English data.
However, we also provide pre-built instances for more than 50 other locales.

`import { fakerDE as faker } from '@faker-js/faker'`

See below for a list of available locales.

:::tip Note
You can also build your own Faker instances, with custom locales/overwrites.
:::

## Individual localized packages

Currently, the imports from the main package have a [bug](https://github.com/faker-js/faker/issues/1791) and always cause the entire Faker lib to be imported.
This might result in loading around 5 MB of data into memory and slow down startup times.

_But we got your back!_  
When encountering such a problem in a test or production environment, you can use the individual localized packages.

```ts
import { faker } from '@faker-js/faker/locale/de';
```

This will then just load the German locales with additional English locales as fallback. The fallback is required due to not all locales containing data for all features. If you encounter a missing locale entry in your selected language, feel free to open a Pull Request fixing that issue.

::: info
The English locales are around 600 KB in size.  
All locales together are around 5 MB in size.
:::

:::tip Note
Some locales have limited coverage and rely more heavily on the English locale as the source for features they currently do not have.
However, in most cases, using a specific locale will be beneficial in the long term as specifying a locale reduces the time necessary for startup, which has a compounding effect on testing frameworks that reload the imports every execution.
:::

## Custom locales and fallbacks

If our built-in faker instances don't satisfy your needs, you can build your own:

```ts
import type { LocaleDefinition } from '@faker-js/faker';
import { Faker, de_CH, de, en } from '@faker-js/faker';

const customLocale: LocaleDefinition = {
  title: 'My custom locale',
  internet: {
    domainSuffix: ['test'],
  },
};

export const customFaker = new Faker({
  locale: [customLocale, de_CH, de, en, global],
});
```

## Available locales

<!-- LOCALES-AUTO-GENERATED-START -->

<!-- Run 'pnpm run generate:locales' to update. -->

| Locale        | Name                      | Faker              |
| :------------ | :------------------------ | :----------------- |
| `af_ZA`       | Afrikaans                 | `fakerAF_ZA`       |
| `ar`          | Arabic                    | `fakerAR`          |
| `az`          | Azerbaijani               | `fakerAZ`          |
| `cz`          | Czech                     | `fakerCZ`          |
| `de`          | German                    | `fakerDE`          |
| `de_AT`       | German (Austria)          | `fakerDE_AT`       |
| `de_CH`       | German (Switzerland)      | `fakerDE_CH`       |
| `dv`          | Dhivehi                   | `fakerDV`          |
| `el`          | Greek                     | `fakerEL`          |
| `en`          | English                   | `fakerEN`          |
| `en_AU`       | English (Australia)       | `fakerEN_AU`       |
| `en_AU_ocker` | English (Australia Ocker) | `fakerEN_AU_ocker` |
| `en_BORK`     | English (Bork)            | `fakerEN_BORK`     |
| `en_CA`       | English (Canada)          | `fakerEN_CA`       |
| `en_GB`       | English (Great Britain)   | `fakerEN_GB`       |
| `en_GH`       | English (Ghana)           | `fakerEN_GH`       |
| `en_IE`       | English (Ireland)         | `fakerEN_IE`       |
| `en_IN`       | English (India)           | `fakerEN_IN`       |
| `en_NG`       | English (Nigeria)         | `fakerEN_NG`       |
| `en_US`       | English (United States)   | `fakerEN_US`       |
| `en_ZA`       | English (South Africa)    | `fakerEN_ZA`       |
| `es`          | Spanish                   | `fakerES`          |
| `es_MX`       | Spanish (Mexico)          | `fakerES_MX`       |
| `fa`          | Farsi                     | `fakerFA`          |
| `fi`          | Finnish                   | `fakerFI`          |
| `fr`          | French                    | `fakerFR`          |
| `fr_BE`       | French (Belgium)          | `fakerFR_BE`       |
| `fr_CA`       | French (Canada)           | `fakerFR_CA`       |
| `fr_CH`       | French (Switzerland)      | `fakerFR_CH`       |
| `fr_LU`       | French (Luxembourg)       | `fakerFR_LU`       |
| `ge`          | Georgian                  | `fakerGE`          |
| `he`          | Hebrew                    | `fakerHE`          |
| `hr`          | Hrvatski                  | `fakerHR`          |
| `hu`          | Hungarian                 | `fakerHU`          |
| `hy`          | Armenian                  | `fakerHY`          |
| `id_ID`       | Indonesian                | `fakerID_ID`       |
| `it`          | Italian                   | `fakerIT`          |
| `ja`          | Japanese                  | `fakerJA`          |
| `ko`          | Korean                    | `fakerKO`          |
| `lv`          | Latvian                   | `fakerLV`          |
| `mk`          | Macedonian                | `fakerMK`          |
| `nb_NO`       | Norwegian                 | `fakerNB_NO`       |
| `ne`          | Nepalese                  | `fakerNE`          |
| `nl`          | Dutch                     | `fakerNL`          |
| `nl_BE`       | Dutch (Belgium)           | `fakerNL_BE`       |
| `pl`          | Polish                    | `fakerPL`          |
| `pt_BR`       | Portuguese (Brazil)       | `fakerPT_BR`       |
| `pt_PT`       | Portuguese (Portugal)     | `fakerPT_PT`       |
| `ro`          | Romanian                  | `fakerRO`          |
| `ru`          | Russian                   | `fakerRU`          |
| `sk`          | Slovakian                 | `fakerSK`          |
| `sv`          | Swedish                   | `fakerSV`          |
| `tr`          | Turkish                   | `fakerTR`          |
| `uk`          | Ukrainian                 | `fakerUK`          |
| `ur`          | Urdu                      | `fakerUR`          |
| `vi`          | Vietnamese                | `fakerVI`          |
| `zh_CN`       | Chinese                   | `fakerZH_CN`       |
| `zh_TW`       | Chinese (Taiwan)          | `fakerZH_TW`       |
| `zu_ZA`       | Zulu (South Africa)       | `fakerZU_ZA`       |

<!-- LOCALES-AUTO-GENERATED-END -->

The `Locale` (data) and `Faker` columns refer to the respective `import` names:

```ts
import { de, fakerDE } from '@faker-js/faker';
```
