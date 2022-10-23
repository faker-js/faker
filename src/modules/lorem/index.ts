import type { Faker } from '../..';
import { filterWordListByLength } from '../word/filterWordListByLength';

/**
 * Module to generate random texts and words.
 */
export class LoremModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(LoremModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a word of a specified length.
   *
   * @param options The expected length of the word or the options to use.
   * @param options.length The expected length of the word.
   * @param options.strategy The strategy to apply when no words with a matching length are found.
   *
   * Available error handling strategies:
   *
   * - `fail`: Throws an error if no words with the given length are found.
   * - `shortest`: Returns any of the shortest words.
   * - `closest`: Returns any of the words closest to the given length.
   * - `longest`: Returns any of the longest words.
   * - `any-length`: Returns a word with any length.
   *
   * Defaults to `'any-length'`.
   *
   * @example
   * faker.lorem.word() // 'temporibus'
   * faker.lorem.word(5) // 'velit'
   * faker.lorem.word({ strategy: 'shortest' }) // 'a'
   * faker.lorem.word({ length: { min: 5, max: 7 }, strategy: 'fail' }) // 'quaerat'
   *
   * @since 3.1.0
   */
  word(
    options:
      | number
      | {
          length?: number | { min: number; max: number };
          strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
        } = {}
  ): string {
    const opts = typeof options === 'number' ? { length: options } : options;
    return this.faker.helpers.arrayElement(
      filterWordListByLength({
        ...opts,
        wordList: this.faker.definitions.lorem.words,
      })
    );
  }

  /**
   * Generates a space separated list of words.
   *
   * @param wordCount The number of words to generate. Defaults to `3`.
   *
   * @example
   * faker.lorem.words() // 'qui praesentium pariatur'
   * faker.lorem.words(10) // 'debitis consectetur voluptatem non doloremque ipsum autem totam eum ratione'
   *
   * @since 2.0.1
   */
  words(wordCount: number | { min: number; max: number } = 3): string {
    wordCount = this.faker.helpers.toNumber(wordCount);

    return Array.from({ length: wordCount })
      .map(() => this.word())
      .join(' ');
  }

  /**
   * Generates a space separated list of words beginning a capital letter and ending with a dot.
   *
   * @param wordCount The number of words, that should be in the sentence. Defaults to a random number between `3` and `10`.
   *
   * @example
   * faker.lorem.sentence() // 'Voluptatum cupiditate suscipit autem eveniet aut dolorem aut officiis distinctio.'
   * faker.lorem.sentence(5) // 'Laborum voluptatem officiis est et.'
   *
   * @since 2.0.1
   */
  sentence(
    wordCount: number | { min: number; max: number } = { min: 3, max: 10 }
  ): string {
    const sentence = this.words(wordCount);
    return `${sentence.charAt(0).toUpperCase() + sentence.substring(1)}.`;
  }

  /**
   * Generates a slugified text consisting of the given number of hyphen separated words.
   *
   * @param wordCount The number of words to generate. Defaults to `3`.
   *
   * @example
   * faker.lorem.slug() // 'dolores-illo-est'
   *
   * @since 4.0.0
   */
  slug(wordCount: number | { min: number; max: number } = 3): string {
    const words = this.words(wordCount);
    return this.faker.helpers.slugify(words);
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
   *
   * @since 2.0.1
   */
  sentences(
    sentenceCount: number | { min: number; max: number } = { min: 2, max: 6 },
    separator: string = ' '
  ): string {
    sentenceCount = this.faker.helpers.toNumber(sentenceCount);

    return Array.from({ length: sentenceCount })
      .map(() => this.sentence())
      .join(separator);
  }

  /**
   * Generates a paragraph with the given number of sentences.
   *
   * @param sentenceCount The number of sentences to generate. Defaults to `3`.
   *
   * @example
   * faker.lorem.paragraph() // 'Non architecto nam unde sint. Ex tenetur dolor facere optio aut consequatur. Ea laudantium reiciendis repellendus.'
   * faker.lorem.paragraph() // 'Animi possimus nemo consequuntur ut ea et tempore unde qui. Quis corporis esse occaecati.'
   *
   * @since 2.0.1
   */
  paragraph(sentenceCount: number | { min: number; max: number } = 3): string {
    return this.sentences(sentenceCount);
  }

  /**
   * Generates the given number of paragraphs.
   *
   * @param paragraphCount The number of paragraphs to generate. Defaults to `3`.
   * @param separator The separator to use. Defaults to `'\n'`.
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
   *
   * @since 2.0.1
   */
  paragraphs(
    paragraphCount: number | { min: number; max: number } = 3,
    separator: string = '\n'
  ): string {
    paragraphCount = this.faker.helpers.toNumber(paragraphCount);

    return Array.from({ length: paragraphCount })
      .map(() => this.paragraph())
      .join(separator);
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
   *
   * @since 3.1.0
   */
  text(): string {
    const methods: Array<keyof LoremModule> = [
      'sentence',
      'sentences',
      'paragraph',
      'paragraphs',
      'lines',
    ];

    const method = this.faker.helpers.arrayElement(methods);

    return `${this[method]()}`;
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
   *
   * @since 3.1.0
   */
  lines(
    lineCount: number | { min: number; max: number } = { min: 1, max: 5 }
  ): string {
    lineCount = this.faker.helpers.toNumber(lineCount);

    return this.sentences(lineCount, '\n');
  }
}
