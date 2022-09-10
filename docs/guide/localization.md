# Localization

## Switching locales

Faker has support for multiple locales.

The default locale is set to English.

Setting a new locale is simple:

```js
// sets locale to de
faker.setLocale('de');
// or
faker.locale = 'de';
```

## Individual localized packages

Faker supports incremental loading of locales.

By default, requiring `faker` will include _all_ locale data.

In a production environment, you may only want to include the locale data for a specific set of locales.

```js
// loads only de locale
const { faker } = require('@faker-js/faker/locale/de');
```

---

Did you know Faker supports many different locales?  
By default when using `import { faker } from '@faker-js/faker'` you actually use every available locale that is supported by Faker and you can switch the locale at runtime with `faker.setLocale('de')`.

::: tip
Alternatively you can also just use `faker.locale = 'de'` instead to switch the locale.
:::

There is one downside of using the default faker instance because it will load all locales into memory resulting in a slower startup time. So if you encounter performance issues e.g. while running tests you should consider using customized faker instances.  
And we got your back! You can import specific pre-configured faker instances for each locale by just using e.g. `import { faker } from '@faker-js/faker/locale/de'`.  
This will then just load the German locales with additional English locales as fallback. The fallback is required due to not all locales supporting all features. If you encounter a missing locale feature in your required language, feel free to open a Pull Request fixing that issue.

::: info
The English locales are around 600 KB in size.  
All locales together are around 5 MB in size.
:::

---

## Available locales

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
