export class Time {
  /**
   * recent
   *
   * @method faker.time.recent
   * @param outputType 'abbr' || 'wide' || 'unix' (default choice)
   */
  recent(outputType: 'abbr' | 'wide' | 'unix' = 'unix'): string | number {
    let date: string | number | Date = new Date();

    switch (outputType) {
      case 'abbr':
        date = date.toLocaleTimeString();
        break;
      case 'wide':
        date = date.toTimeString();
        break;
      case 'unix':
        // TODO @Shinigami92 2022-01-10: add default case
        date = date.getTime();
        break;
    }

    return date;
  }
}
