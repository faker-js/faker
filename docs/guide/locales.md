# Locales

Did you know Faker supports many different locales?  
By default when using `import { faker } from '@faker-js/faker'` you actually use every available locale that is supported by Faker and you can switch the locale at runtime with `faker.setLocale('de')`.

::: info
Since [v7.3.0](https://github.com/faker-js/faker/releases/tag/v7.3.0) you can also just use `faker.locale = 'de'` instead to switch the locale.
:::

There is one downside of using the default faker instance because it will load all locales into memory resulting in a slower startup time. So if you encounter performance issues e.g. while running tests you should consider using customized faker instances.  
And we got you back! You can import specific pre-configured faker instances for each locale by just using e.g. `import { faker } from '@faker-js/faker/locale/de'`.  
This will then just load the german locales with additional english locales as fallback.

:::info
In v7 and earlier versions faker always use english as fallback. The english locales are around 600 KB in size. In v8 we plan to change the behavior and allow to create custom faker instances with e.g. only german but no english locales.  
You will then safe these 600 KB of memory overhead but might run into issues when there is no value provided in the german locales.
:::
