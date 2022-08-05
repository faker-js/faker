# Localization

As of version `v2.0.0` Faker has support for multiple localities.

The default language locale is set to English.

Setting a new locale is simple:

```js
// sets locale to de
faker.setLocale('de');
// or
faker.locale = 'de';
```

<!-- LOCALES-AUTO-GENERATED-START -->

<!-- Run 'pnpm run generate:locales' to update. -->

| Locale      | Name                      |
| :---------- | :------------------------ |
| af_ZA       | Afrikaans                 |
| ar          | Arabic                    |
| az          | Azerbaijani               |
| cz          | Czech                     |
| de          | German                    |
| de_AT       | German (Austria)          |
| de_CH       | German (Switzerland)      |
| el          | Greek                     |
| en          | English                   |
| en_AU       | English (Australia)       |
| en_AU_ocker | English (Australia Ocker) |
| en_BORK     | English (Bork)            |
| en_CA       | English (Canada)          |
| en_GB       | English (Great Britain)   |
| en_GH       | English (Ghana)           |
| en_IE       | English (Ireland)         |
| en_IND      | English (India)           |
| en_NG       | Nigeria (English)         |
| en_US       | English (United States)   |
| en_ZA       | English (South Africa)    |
| es          | Spanish                   |
| es_MX       | Spanish (Mexico)          |
| fa          | Farsi                     |
| fi          | Finnish                   |
| fr          | French                    |
| fr_BE       | Français (Belgique)       |
| fr_CA       | French (Canada)           |
| fr_CH       | French (Switzerland)      |
| ge          | Georgian                  |
| he          | Hebrew                    |
| hr          | Hrvatski                  |
| hu          | Hungarian                 |
| hy          | Armenian                  |
| id_ID       | Indonesia                 |
| it          | Italian                   |
| ja          | Japanese                  |
| ko          | Korean                    |
| lv          | Latvian                   |
| mk          | Macedonian                |
| nb_NO       | Norwegian                 |
| ne          | Nepalese                  |
| nl          | Dutch                     |
| nl_BE       | Dutch (Belgium)           |
| pl          | Polish                    |
| pt_BR       | Portuguese (Brazil)       |
| pt_PT       | Portuguese (Portugal)     |
| ro          | Romanian                  |
| ru          | Russian                   |
| sk          | Slovakian                 |
| sv          | Swedish                   |
| tr          | Turkish                   |
| uk          | Ukrainian                 |
| ur          | Urdu                      |
| vi          | Vietnamese                |
| zh_CN       | Chinese                   |
| zh_TW       | Chinese (Taiwan)          |
| zu_ZA       | Zulu (South Africa)       |

<!-- LOCALES-AUTO-GENERATED-END -->

## Individual Localization Packages

As of version `v3.0.0` Faker supports incremental loading of locales.

By default, requiring `faker` will include _all_ locale data.

In a production environment, you may only want to include the locale data for a specific set of locales.

```js
// loads only de locale
const { faker } = require('@faker-js/faker/locale/de');
```
