import type { Faker } from '.';

export class _Date {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(_Date.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * past
   *
   * @method faker.date.past
   * @param years
   * @param refDate
   */
  past(years?: number, refDate?: string | Date): Date {
    const date = this.toDate(refDate);
    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
    };

    let past = date.getTime();
    past -= this.faker.datatype.number(range); // some time from now to N years ago, in milliseconds
    date.setTime(past);

    return date;
  }

  /**
   * future
   *
   * @method faker.date.future
   * @param years
   * @param refDate
   */
  future(years?: number, refDate?: string | Date): Date {
    const date = this.toDate(refDate);
    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future += this.faker.datatype.number(range); // some time from now to N years later, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * between
   *
   * @method faker.date.between
   * @param from
   * @param to
   */
  between(from: string | Date, to: string | Date): Date {
    const fromMilliseconds = this.toMilliseconds(from);
    const toMilliseconds = this.toMilliseconds(to);
    const dateOffset = this.faker.datatype.number(
      toMilliseconds - fromMilliseconds
    );

    return new Date(fromMilliseconds + dateOffset);
  }

  /**
   * betweens
   *
   * @method faker.date.between
   * @param from
   * @param to
   * @param num
   */
  betweens(from: string | Date, to: string | Date, num?: number): Date[] {
    if (typeof num == 'undefined') {
      num = 3;
    }

    const newDates: Date[] = [];
    const toMilliseconds = this.toMilliseconds(to);
    let fromMilliseconds = this.toMilliseconds(from);
    const dateOffset = (toMilliseconds - fromMilliseconds) / (num + 1);
    let lastDate = this.toDate(from);

    for (let i = 0; i < num; i++) {
      fromMilliseconds = lastDate.getTime();
      lastDate = new Date(fromMilliseconds + dateOffset);
      newDates.push(lastDate);
    }

    return newDates;
  }

  /**
   * recent
   *
   * @method faker.date.recent
   * @param days
   * @param refDate
   */
  recent(days?: number, refDate?: string | Date): Date {
    const date = this.toDate(refDate);
    const range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future -= this.faker.datatype.number(range); // some time from now to N days ago, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * soon
   *
   * @method faker.date.soon
   * @param days
   * @param refDate
   */
  soon(days?: number, refDate?: string | Date): Date {
    const date = this.toDate(refDate);
    const range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000,
    };

    let future = date.getTime();
    future += this.faker.datatype.number(range); // some time from now to N days later, in milliseconds
    date.setTime(future);

    return date;
  }

  /**
   * month
   *
   * @method faker.date.month
   * @param options
   */
  month(options?: { abbr?: boolean; context?: boolean }) {
    options = options || {};

    let type = 'wide';
    if (options.abbr) {
      type = 'abbr';
    }
    if (
      options.context &&
      typeof this.faker.definitions.date.month[type + '_context'] !==
        'undefined'
    ) {
      type += '_context';
    }

    const source = this.faker.definitions.date.month[type];

    return this.faker.random.arrayElement(source);
  }

  /**
   * weekday
   *
   * @method faker.date.weekday
   * @param options
   */
  weekday(options?: { abbr?: boolean; context?: boolean }) {
    options = options || {};

    let type = 'wide';
    if (options.abbr) {
      type = 'abbr';
    }
    if (
      options.context &&
      typeof this.faker.definitions.date.weekday[type + '_context'] !==
        'undefined'
    ) {
      type += '_context';
    }

    const source = this.faker.definitions.date.weekday[type];

    return this.faker.random.arrayElement(source);
  }

  private toDate(date?: string | Date): Date {
    if (date != null) {
      return new Date(date instanceof Date ? date : Date.parse(date));
    }

    return new Date();
  }

  private toMilliseconds(date?: string | Date): number {
    if (date != null) {
      return date instanceof Date ? date.getTime() : Date.parse(date);
    }

    return new Date().getTime();
  }
}
