# 日期

[[toc]]

## 过去

返回一个随机的在过去的时间。

::: tip
| 参数 | 类型 | 默认值 |
| -------- | ------- | :----------: |
| maxYears | number | `1` |
| refDate | Date | `new Date()` |
:::

```js
faker.date.past();
// Sat Oct 20 2018 04:19:38 GMT-0700 (Pacific Daylight Time)

faker.date.past(100);
// Tue Jul 27 1971 21:08:49 GMT-0700 (Pacific Daylight Time)

faker.date.past(100, new Date(-3000));
// Wed Dec 07 1881 05:04:18 GMT-0752 (Pacific Standard Time)
```

## 未来

返回一个随机的在未来的时间。

::: tip
| 参数 | 类型 | 默认值 |
| ------- | ------- | :----------: |
| years | number | `1` |
| refDate | Date | `new Date()` |
:::

```js
faker.date.future();
// Mon Sep 02 2019 21:08:33 GMT-0700 (Pacific Daylight Time)

faker.date.future(100);
// Fri Nov 23 2068 10:43:15 GMT-0800 (Pacific Standard Time)

faker.date.future(100, new Date(-3000));
// Mon Jun 26 2051 01:50:51 GMT-0700 (Pacific Daylight Time)
```

## 区间

返回一个随机的在某个区间内的时间。

::: tip
| 参数 | 类型 | 默认值 |
| ----- | ---- | :------------------------------------------------: |
| from | Date | <Badge text="N/A" type="error" vertical="middle"/> |
| to | Date | <Badge text="N/A" type="error" vertical="middle"/> |
:::

```js
faker.date.between(new Date(0), new Date(365 * 24 * 3600 * 1000));
// Mon Oct 19 1970 14:12:01 GMT-0700 (Pacific Daylight Time)
```

## 最近的 <Badge text="5.0.0+" type="tip" vertical="middle"/>

返回一个随机的最近的时间。

::: tip
| 参数 | 类型 | 默认值 |
| ------- | ------- | :----------: |
| days | number | `1` |
| refDate | Date | `new Date()` |
:::

```js
faker.date.recent();
```

## 即将的 <Badge text="5.0.0+" type="tip" vertical="middle"/>

返回一个随机的即将到来的时间。

::: tip
| 参数 | 类型 | 默认值 |
| ------- | ------- | :----------: |
| days | number | `1` |
| refDate | Date | `new Date()` |
:::

```js
faker.date.soon();
```

## 月份

返回一个随机的月份名称。

::: tip
| 参数 | 类型 | 默认值 |
| ------ | ------ | :-----------------------------: |
| option | object | `{abbr: false, context: false}` |
:::

```js
faker.date.month();
// December

faker.date.month({ abbr: true });
// Dec
```

## 星期

返回一个随机的星期内的天数名称。

::: tip
| 参数 | 类型 | 默认值 |
| ------ | ------ | :-----------------------------: |
| option | object | `{abbr: false, context: false}` |
:::

```js
faker.date.weekday();
// Sunday

faker.date.weekday({ abbr: true });
// Sun
```
