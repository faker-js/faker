# Locales

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
