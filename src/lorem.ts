import type { Faker } from '.';
import type { Helpers } from './helpers';

/**
 * Module to generate random texts and words.
 */
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
   * @param length length of the word that should be returned. Defaults to a random length.
   *
   * @example
   * faker.lorem.word() // 'temporibus'
   * faker.lorem.word(5) // 'velit'
   */
  word(length?: number): string {
    const hasRightLength = (word: string) => word.length === length;
    let properLengthWords: readonly string[];
    if (length == null) {
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
   * @param num The number of words to generate. Defaults to `3`.
   *
   * @example
   * faker.lorem.words() // 'qui praesentium pariatur'
   * faker.lorem.words(10) // 'debitis consectetur voluptatem non doloremque ipsum autem totam eum ratione'
   */
  words(num: number = 3): string {
    const words: string[] = [];
    for (let i = 0; i < num; i++) {
      words.push(this.faker.lorem.word());
    }
    return words.join(' ');
  }

  /**
   * Generates a space separated list of words beginning a capital letter and ending with a dot.
   *
   * @param wordCount The number of words, that should be in the sentence. Defaults to a random number between `3` and `10`.
   *
   * @example
   * faker.lorem.sentence() // 'Voluptatum cupiditate suscipit autem eveniet aut dolorem aut officiis distinctio.'
   * faker.lorem.sentence(5) // 'Laborum voluptatem officiis est et.'
   */
  sentence(wordCount?: number): string {
    if (wordCount == null) {
      wordCount = this.faker.datatype.number({ min: 3, max: 10 });
    }

    const sentence = this.faker.lorem.words(wordCount);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  }

  /**
   * Generates a slugified text consisting of the given number of hyphen separated words.
   *
   * @param wordCount The number of words to generate. Defaults to `3`.
   *
   * @example
   * faker.lorem.slug() // 'dolores-illo-est'
   */
  slug(wordCount?: number): string {
    const words = this.faker.lorem.words(wordCount);
    return this.Helpers.slugify(words);
  }

  /**
   * Generates the given number of sentences.
   *
   * @param sentenceCount The number of sentences to generate. Defaults to a random number between `2` and `6`.
   * @param separator The separator to add between sentences. Defaults to `' '`.
   *
   * @example
   * faker.lorem.sentences() // 'Iste molestiae incidunt aliquam possimus reprehenderit eum corrupti. Deleniti modi voluptatem nostrum ut esse.'
   * faker.lorem.sentences(2) // 'Maxime vel numquam quibusdam. Dignissimos ex molestias quos aut molestiae quam nihil occaecati maiores.'
   * faker.lorem.sentences(2, '\n')
   * // 'Et rerum a unde tempora magnam sit nisi.
   * // Et perspiciatis ipsam omnis.'
   */
  sentences(sentenceCount?: number, separator?: string): string {
    if (sentenceCount == null) {
      sentenceCount = this.faker.datatype.number({ min: 2, max: 6 });
    }
    if (separator == null) {
      separator = ' ';
    }
    const sentences: string[] = [];
    for (sentenceCount; sentenceCount > 0; sentenceCount--) {
      sentences.push(this.faker.lorem.sentence());
    }
    return sentences.join(separator);
  }

  /**
   * Generates a paragraph with at least the given number of sentences.
   *
   * @param sentenceCount The minim number of sentences to generate. Defaults to `3`.
   *
   * @example
   * faker.lorem.paragraph() // 'Non architecto nam unde sint. Ex tenetur dolor facere optio aut consequatur. Ea laudantium reiciendis repellendus.'
   * faker.lorem.paragraph() // 'Animi possimus nemo consequuntur ut ea et tempore unde qui. Quis corporis esse occaecati.'
   */
  paragraph(sentenceCount: number = 3): string {
    return this.faker.lorem.sentences(
      sentenceCount + this.faker.datatype.number(3)
    );
  }

  /**
   * Generates the given number of paragraphs.
   *
   * @param paragraphCount The number of paragraphs to generate. Defaults to `3`.
   * @param separator The separator to use. Defaults to `'\n \r'`.
   *
   * @example
   * faker.lorem.paragraphs()
   * // 'Beatae voluptatem dicta et assumenda fugit eaque quidem consequatur. Fuga unde provident. Id reprehenderit soluta facilis est laborum laborum. Illum aut non ut. Est nulla rem ipsa.
   * // Voluptatibus quo pariatur est. Temporibus deleniti occaecati pariatur nemo est molestias voluptas. Doloribus commodi et et exercitationem vel et. Omnis inventore cum aut amet.
   * // Sapiente deleniti et. Ducimus maiores eum. Rem dolorem itaque aliquam.'
   *
   * faker.lorem.paragraphs(5)
   * // 'Quia hic sunt ducimus expedita quo impedit soluta. Quam impedit et ipsum optio. Unde dolores nulla nobis vero et aspernatur officiis.
   * // Aliquam dolorem temporibus dolores voluptatem voluptatem qui nostrum quia. Sit hic facilis rerum eius. Beatae doloribus nesciunt iste ipsum.
   * // Natus nam eum nulla voluptas molestiae fuga libero nihil voluptatibus. Sed quam numquam eum ipsam temporibus eaque ut et. Enim quas debitis quasi quis. Vitae et vitae.
   * // Repellat voluptatem est laborum illo harum sed reprehenderit aut. Quo sit et. Exercitationem blanditiis totam velit ad dicta placeat.
   * // Rerum non eum incidunt amet quo. Eaque laborum ut. Recusandae illo ab distinctio veritatis. Cum quis architecto ad maxime a.'
   *
   * faker.lorem.paragraphs(2, '<br/>\n')
   * // 'Eos magnam aut qui accusamus. Sapiente quas culpa totam excepturi. Blanditiis totam distinctio occaecati dignissimos cumque atque qui officiis.<br/>
   * // Nihil quis vel consequatur. Blanditiis commodi deserunt sunt animi dolorum. A optio porro hic dolorum fugit aut et sint voluptas. Minima ad sed ipsa est non dolores.'
   */
  // TODO ST-DDT 2022-02-09: The separator looks odd.
  paragraphs(paragraphCount: number = 3, separator: string = '\n \r'): string {
    const paragraphs: string[] = [];
    for (paragraphCount; paragraphCount > 0; paragraphCount--) {
      paragraphs.push(this.faker.lorem.paragraph());
    }
    return paragraphs.join(separator);
  }

  /**
   * Generates a random text based on a random lorem method.
   *
   * @example
   * faker.lorem.text() // 'Doloribus autem non quis vero quia.'
   * faker.lorem.text()
   * // 'Rerum eum reiciendis id ipsa hic dolore aut laborum provident.
   * // Quis beatae quis corporis veritatis corrupti ratione delectus sapiente ut.
   * // Quis ut dolor dolores facilis possimus tempore voluptates.
   * // Iure nam officia optio cumque.
   * // Dolor tempora iusto.'
   */
  text(): string {
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
    return this.faker.fake(`{{${randomLoremMethod}}}`);
  }

  /**
   * Generates the given number lines of lorem separated by `'\n'`.
   *
   * @param lineCount The number of lines to generate. Defaults to a random number between `1` and `5`.
   *
   * @example
   * faker.lorem.lines()
   * // 'Rerum quia aliquam pariatur explicabo sint minima eos.
   * // Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.
   * // Enim eveniet a qui.
   * // Consectetur velit eligendi animi nostrum veritatis.'
   *
   * faker.lorem.lines()
   * // 'Soluta deserunt eos quam reiciendis libero autem enim nam ut.
   * // Voluptate aut aut.'
   */
  lines(lineCount?: number): string {
    if (lineCount == null) {
      lineCount = this.faker.datatype.number({ min: 1, max: 5 });
    }
    return this.faker.lorem.sentences(lineCount, '\n');
  }
}
