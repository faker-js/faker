# Date

[[toc]]

## Past

Return date sometime in the past.

::: tip
| Param | Type | Default |
| -------- | ------- | :----------: |
| maxYears | number | `1` |
| refDate | string \| Date | `new Date()` |
:::

```js
faker.date.past();
// Sat Oct 20 2018 04:19:38 GMT-0700 (Pacific Daylight Time)

faker.date.past(100);
// Tue Jul 27 1971 21:08:49 GMT-0700 (Pacific Daylight Time)

faker.date.past(100, new Date(-3000));
// Wed Dec 07 1881 05:04:18 GMT-0752 (Pacific Standard Time)
```

## Future

Return date sometime in the future.

::: tip
| Param | Type | Default |
| ------- | ------- | :----------: |
| years | number | `1` |
| refDate | string \| Date | `new Date()` |
:::

```js
faker.date.future();
// Mon Sep 02 2019 21:08:33 GMT-0700 (Pacific Daylight Time)

faker.date.future(100);
// Fri Nov 23 2068 10:43:15 GMT-0800 (Pacific Standard Time)

faker.date.future(100, new Date(-3000));
// Mon Jun 26 2051 01:50:51 GMT-0700 (Pacific Daylight Time)
```

## Between

Return date sometime in the future.

::: tip
| Param | Type | Default |
| ----- | ---- | :------------------------------------------------: |
| from | string \| Date | <Badge text="N/A" type="error" vertical="middle"/> |
| to | string \| Date | <Badge text="N/A" type="error" vertical="middle"/> |
:::

```js
faker.date.between(new Date(0), new Date(365 * 24 * 3600 * 1000));
// Mon Oct 19 1970 14:12:01 GMT-0700 (Pacific Daylight Time)
```

## Recent <Badge text="5.0.0+" type="tip" vertical="middle"/>

Returns some date recent date

::: tip
| Param | Type | Default |
| ------- | ------- | :----------: |
| days | number | `1` |
| refDate | string \| Date | `new Date()` |
:::

```js
faker.date.recent();
```

## Soon <Badge text="5.0.0+" type="tip" vertical="middle"/>

Return date sometime soon.

::: tip
| Param | Type | Default |
| ------- | ------- | :----------: |
| days | number | `1` |
| refDate | string \| Date | `new Date()` |
:::

```js
faker.date.soon();
```

## Month

Return random month name

::: tip
| Param | Type | Default |
| ------ | ------ | :-----------------------------: |
| option | object | `{abbr: false, context: false}` |
:::

```js
faker.date.month();
// December

faker.date.month({ abbr: true });
// Dec
```

## Weekday

Return random weekday name

::: tip
| Param | Type | Default |
| ------ | ------ | :-----------------------------: |
| option | object | `{abbr: false, context: false}` |
:::

```js
faker.date.weekday();
// Sunday

faker.date.weekday({ abbr: true });
// Sun
```
