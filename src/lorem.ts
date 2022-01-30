import type { Faker } from '.';
import type { Helpers } from './helpers';

export class Lorem {
  private readonly Helpers: Helpers;

  constructor(private readonly faker: Faker) {
    this.Helpers = faker.helpers;

    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Lorem.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a word of a specified length.
   *
   * @method faker.lorem.word
   * @param length length of the word that should be returned. Defaults to a random length
   */
  word(length?: number): string {
    const hasRightLength = (word: string) => word.length === length;
    let properLengthWords: string[];
    if (typeof length === 'undefined') {
      properLengthWords = this.faker.definitions.lorem.words;
    } else {
      properLengthWords =
        this.faker.definitions.lorem.words.filter(hasRightLength);
    }
    return this.faker.random.arrayElement(properLengthWords);
  }

  /**
   * Generates a space separated list of words.
   *
   * @method faker.lorem.words
   * @param num number of words, defaults to 3
   */
  words(num?: number): string {
    if (typeof num == 'undefined') {
      num = 3;
    }
    const words: string[] = [];
    for (let i = 0; i < num; i++) {
      words.push(this.faker.lorem.word());
    }
    return words.join(' ');
  }

  /**
   * sentence
   *
   * @method faker.lorem.sentence
   * @param wordCount defaults to a random number between 3 and 10
   * @param range
   */
  // TODO @Shinigami92 2022-01-11: `range` is not in use
  sentence(wordCount?: number, range?: number): string {
    if (typeof wordCount == 'undefined') {
      wordCount = this.faker.datatype.number({ min: 3, max: 10 });
    }
    // if (typeof range == 'undefined') { range = 7; }

    // strange issue with the node_min_test failing for capitalize, please fix and add faker.lorem.back
    //return  faker.lorem.words(wordCount + Helpers.randomNumber(range)).join(' ').capitalize();

    const sentence = this.faker.lorem.words(wordCount);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  }

  /**
   * slug
   *
   * @method faker.lorem.slug
   * @param wordCount number of words, defaults to 3
   */
  slug(wordCount?: number): string {
    const words = this.faker.lorem.words(wordCount);
    return this.Helpers.slugify(words);
  }

  /**
   * sentences
   *
   * @method faker.lorem.sentences
   * @param sentenceCount defaults to a random number between 2 and 6
   * @param separator defaults to `' '`
   */
  sentences(sentenceCount?: number, separator?: string): string {
    if (typeof sentenceCount === 'undefined') {
      sentenceCount = this.faker.datatype.number({ min: 2, max: 6 });
    }
    if (typeof separator == 'undefined') {
      separator = ' ';
    }
    const sentences: string[] = [];
    for (sentenceCount; sentenceCount > 0; sentenceCount--) {
      sentences.push(this.faker.lorem.sentence());
    }
    return sentences.join(separator);
  }

  /**
   * paragraph
   *
   * @method faker.lorem.paragraph
   * @param sentenceCount defaults to 3
   */
  paragraph(sentenceCount: number = 3): string {
    return this.faker.lorem.sentences(
      sentenceCount + this.faker.datatype.number(3)
    );
  }

  /**
   * paragraphs
   *
   * @method faker.lorem.paragraphs
   * @param paragraphCount defaults to 3
   * @param separator defaults to `'\n \r'`
   */
  paragraphs(paragraphCount: number = 3, separator: string = '\n \r'): string {
    const paragraphs: string[] = [];
    for (paragraphCount; paragraphCount > 0; paragraphCount--) {
      paragraphs.push(this.faker.lorem.paragraph());
    }
    return paragraphs.join(separator);
  }

  /**
   * Returns random text based on a random lorem method
   *
   * @method faker.lorem.text
   * @param times
   */
  // TODO @Shinigami92 2022-01-11: `times` is not in use
  text(times?: number): string {
    const loremMethods = [
      'lorem.word',
      'lorem.words',
      'lorem.sentence',
      'lorem.sentences',
      'lorem.paragraph',
      'lorem.paragraphs',
      'lorem.lines',
    ];
    const randomLoremMethod = this.faker.random.arrayElement(loremMethods);
    return this.faker.fake('{{' + randomLoremMethod + '}}');
  }

  /**
   * Returns lines of lorem separated by `'\n'`
   *
   * @method faker.lorem.lines
   * @param lineCount defaults to a random number between 1 and 5
   */
  lines(lineCount?: number): string {
    if (typeof lineCount === 'undefined') {
      lineCount = this.faker.datatype.number({ min: 1, max: 5 });
    }
    return this.faker.lorem.sentences(lineCount, '\n');
  }
}
