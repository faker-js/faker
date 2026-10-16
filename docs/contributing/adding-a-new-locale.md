# Adding a New Locale

Faker already contains [over 70 different locales](/guide/localization#available-locales).
Adding a new one (or expanding an existing one) is welcome, but each locale carries ongoing maintenance cost.
This page summarizes what we look for when accepting new locales.

If you only need locale data for your own project, you can also [build a custom Faker instance](/guide/localization#custom-locales-and-fallbacks) without contributing it upstream.

## Before You Start

Preferably, open a [feature request](/contributing/propose-a-feature) before investing a large amount of work.
Use the [locale code naming standards](/guide/localization#locale-codes) in the issue title and description (for example `sw_KE` for Swahili in Kenya).

In that issue or in your pull request, please include:

- **Why you want this locale** — for example, you ship a product used in that region, or you need realistic test data for a language you speak.
- **Background on the language** — where it is spoken, approximate number of speakers, and any script or regional variants that matter. Links to Wikipedia are useful here.
- **Comparable support elsewhere** — whether the same (or a closely related) locale already exists in similar software, such as [Python Faker](https://faker.readthedocs.io/en/master/locales.html) or [Firefox’s curated language list](https://mozilla-l10n.github.io/firefox-languages/). 

Proposals are more likely to be accepted when **more than one human contributor** who knows the language is willing to author or cross-check the data.

## One Module at a Time

Please only change files related to **one module** (for example `person` or `animal`) whenever possible.
This simplifies and speeds up review, and it lets maintainers label pull requests meaningfully.

For a brand-new locale, start with the required `metadata` and one useful core module (often `person` or `location`).

You can open follow-up PRs for additional modules once the first PR is approved.

Before opening a pull request, run `pnpm run preflight` as described in [Submit a Pull Request](/contributing/submit-a-pull-request).

## Sourcing Data

When compiling definitions, explain where you sourced your data from. For example: is it a direct translation of English data, or compiled from your own knowledge, or from official sources?

See also [Sourcing data for definitions](https://github.com/faker-js/faker/blob/next/CONTRIBUTING.md#sourcing-data-for-definitions) in `CONTRIBUTING.md`.
