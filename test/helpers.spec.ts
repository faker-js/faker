import { afterEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../src';
import { luhnCheck } from './support/luhnCheck';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      randomize: 'b',
      slugify: '',
      replaceSymbolWithNumber: '',
      replaceSymbols: '',
      replaceCreditCardSymbols: '6453-3791-7755-1410-0481',
      repeatString: '',
      regexpStyleStringParse: '',
      shuffle: [],
      uniqueArray: [],
      mustache: '',
      createCard: {
        accountHistory: [
          {
            account: '62615449',
            amount: '266.78',
            business: 'Wolf - Kuvalis',
            date: expect.any(Date),
            name: 'Investment Account (...0023)',
            type: 'invoice',
          },
          {
            account: '83469635',
            amount: '552.89',
            business: 'McLaughlin LLC',
            date: expect.any(Date),
            name: 'Checking Account (...7322)',
            type: 'payment',
          },
          {
            account: '85362075',
            amount: '816.44',
            business: 'Schmeler Group',
            date: expect.any(Date),
            name: 'Savings Account (...3516)',
            type: 'deposit',
          },
        ],
        address: {
          city: 'Leopoldview',
          country: 'Aruba',
          geo: {
            lat: '51.3317',
            lng: '42.6190',
          },
          state: 'Connecticut',
          streetA: 'Estella Lodge',
          streetB: '1760 Mireya Causeway',
          streetC: '920 Christelle Estate Suite 365',
          streetD: 'Apt. 402',
          zipcode: '93240',
        },
        company: {
          bs: 'implement scalable communities',
          catchPhrase: 'Self-enabling exuding encryption',
          name: 'Weissnat, Wintheiser and MacGyver',
        },
        email: 'Isabel5@gmail.com',
        name: 'Darnell Deckow',
        phone: '559.640.8661',
        posts: [
          {
            paragraph:
              'Adipisci occaecati quae sapiente voluptas nulla iure. Enim ut eum officia ex delectus minima est. Ad qui exercitationem et dolorem architecto perferendis.',
            sentence:
              'Quia est dolores fugiat aperiam quia voluptates reprehenderit.',
            sentences:
              'Distinctio possimus enim nihil. Quia unde similique amet doloremque ut voluptas. Ducimus itaque qui saepe molestiae mollitia qui et voluptas.',
            words: 'nobis et odio',
          },
          {
            paragraph:
              'Aliquam quos ipsa cupiditate impedit molestiae aut accusantium odio. Sed doloremque eveniet. Voluptatum ipsam error molestias optio et eos magnam.',
            sentence:
              'Velit exercitationem consequatur perferendis illum velit.',
            sentences:
              'Qui temporibus est id architecto molestiae ea et. Repudiandae eos pariatur. Ducimus sit explicabo veritatis quis enim libero. Nam qui deserunt quidem ad. Natus rem eum sed ut quo pariatur omnis quisquam natus.',
            words: 'maiores nihil est',
          },
          {
            paragraph:
              'Sed enim laboriosam et earum dolorem quia eius. Iste nihil ea commodi et ut aliquam. Dolore magnam optio dolores quo ullam ratione veniam repellat eaque.',
            sentence: 'Sed tempora earum beatae animi nostrum optio neque aut.',
            sentences:
              'Consequatur exercitationem harum odit accusamus blanditiis aut. Amet esse saepe aut. Quia consequatur quia eveniet ex voluptatem et. Enim tempora est. Alias illum aliquid eos corporis consequatur. Excepturi provident esse atque.',
            words: 'id velit ut',
          },
        ],
        username: 'Moses_Satterfield',
        website: 'irritating-banyan.com',
      },
      contextualCard: {
        address: {
          city: 'Cicero',
          geo: {
            lat: '-18.0250',
            lng: '-129.7822',
          },
          street: 'Riley Walk',
          suite: 'Suite 201',
          zipcode: '36504-0256',
        },
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/974.jpg',
        company: {
          bs: 'reinvent dynamic relationships',
          catchPhrase: 'Compatible regional middleware',
          name: 'Feest - Klocko',
        },
        dob: new Date('1984-12-04T21:58:56.056Z'),
        email: 'Garnett.Schinner7344@yahoo.com',
        name: 'Garnett',
        phone: '(248) 461-7600',
        username: 'Garnett.Schinner73',
        website: 'ashamed-e-reader.org',
      },
      userCard: {
        address: {
          city: 'North Wainomouth',
          geo: {
            lat: '4.4562',
            lng: '-177.4562',
          },
          street: 'Estella Lodge',
          suite: 'Suite 176',
          zipcode: '92019-1636',
        },
        company: {
          bs: 'exploit seamless infomediaries',
          catchPhrase: 'Persistent holistic alliance',
          name: 'Langworth - Wyman',
        },
        email: 'Isabel5@gmail.com',
        name: 'Darnell Deckow',
        phone: '225-631-0293 x240',
        username: 'Moses_Satterfield',
        website: 'sparse-ottoman.biz',
      },
      createTransaction: {
        account: '00483617',
        amount: '374.54',
        business: 'Wiegand, Deckow and Renner',
        date: expect.any(Date),
        name: 'Auto Loan Account (...5514)',
        type: 'deposit',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      randomize: 'a',
      slugify: '',
      replaceSymbolWithNumber: '',
      replaceSymbols: '',
      replaceCreditCardSymbols: '6453-2512-2540-3255-2391',
      repeatString: '',
      regexpStyleStringParse: '',
      shuffle: [],
      uniqueArray: [],
      mustache: '',
      createCard: {
        accountHistory: [
          {
            account: '74726042',
            amount: '407.15',
            business: 'Tromp - Ullrich',
            date: expect.any(Date),
            name: 'Credit Card Account (...8720)',
            type: 'payment',
          },
          {
            account: '96491055',
            amount: '521.69',
            business: 'Bauch - Graham',
            date: expect.any(Date),
            name: 'Personal Loan Account (...4932)',
            type: 'withdrawal',
          },
          {
            account: '45684786',
            amount: '705.74',
            business: 'Hamill - Cronin',
            date: expect.any(Date),
            name: 'Money Market Account (...7936)',
            type: 'payment',
          },
        ],
        address: {
          city: 'Noelbury',
          country: 'Kyrgyz Republic',
          geo: {
            lat: '-57.8577',
            lng: '-129.2926',
          },
          state: 'Georgia',
          streetA: 'Donald Hill',
          streetB: '318 Murazik Junction',
          streetC: '1791 Patricia Loaf Suite 703',
          streetD: 'Apt. 435',
          zipcode: '86444',
        },
        company: {
          bs: 'orchestrate bleeding-edge infrastructures',
          catchPhrase: 'Polarised zero tolerance moratorium',
          name: 'Armstrong, Smitham and Renner',
        },
        email: 'Darron.Larson@gmail.com',
        name: 'Eugene Effertz',
        phone: '818-698-6199 x848',
        posts: [
          {
            paragraph:
              'Voluptatibus dolor est totam praesentium ducimus tempore. Rerum autem atque quos esse est. Autem eligendi aliquid. Voluptates quis quo.',
            sentence:
              'Aut alias cum consequatur pariatur inventore omnis temporibus.',
            sentences:
              'Illo cumque cupiditate quos cum. Placeat quo ut est ut error quo repellat id aliquam. Perferendis corporis sunt est itaque ad aut aut quos. Laboriosam molestias quisquam ratione aut. Omnis necessitatibus tempore ut consectetur voluptas nam praesentium. Libero neque iste voluptates temporibus quia officiis cumque eos ut.',
            words: 'esse autem harum',
          },
          {
            paragraph:
              'At perferendis asperiores et exercitationem. Reprehenderit placeat cumque modi ex modi doloremque reprehenderit. Corrupti atque velit ab laboriosam. Accusamus est rem est qui aspernatur hic eaque est quaerat.',
            sentence: 'Sed totam nam et ut harum.',
            sentences:
              'Sit labore voluptatem rerum non natus ratione. Quas ut corporis et vel qui doloribus excepturi autem. Eius nobis natus accusantium. Ut impedit id cupiditate recusandae sit laborum beatae.',
            words: 'deserunt eveniet deleniti',
          },
          {
            paragraph:
              'Aut aut voluptas at laboriosam. Omnis error suscipit autem culpa dolorem ipsum ex. Rerum enim animi maxime repellendus error dolorum ut eveniet. Velit accusantium eum vitae error tenetur deserunt. Fugiat ratione explicabo cum optio fuga.',
            sentence: 'Suscipit soluta nulla deleniti.',
            sentences:
              'Blanditiis culpa modi amet eum amet delectus laboriosam aperiam et. Beatae ad quidem quasi. Praesentium est ut.',
            words: 'nostrum consequuntur alias',
          },
        ],
        username: 'Dudley.Littel',
        website: 'lovable-principle.name',
      },
      contextualCard: {
        address: {
          city: 'Schimmeltown',
          geo: {
            lat: '46.8309',
            lng: '-46.8173',
          },
          street: 'Wilmer Creek',
          suite: 'Apt. 487',
          zipcode: '44355',
        },
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/347.jpg',
        company: {
          bs: 'synergize transparent channels',
          catchPhrase: 'Monitored client-server budgetary management',
          name: 'Ortiz, Jacobson and Kuphal',
        },
        dob: new Date('1980-12-16T23:18:00.988Z'),
        email: 'Devyn2132@yahoo.com',
        name: 'Devyn',
        phone: '1-623-927-3183 x063',
        username: 'Devyn21',
        website: 'dependent-ischemia.biz',
      },
      userCard: {
        address: {
          city: 'North Llewellyn',
          geo: {
            lat: '65.2766',
            lng: '104.2410',
          },
          street: 'Donald Hill',
          suite: 'Suite 318',
          zipcode: '17914',
        },
        company: {
          bs: 'e-enable back-end experiences',
          catchPhrase: 'Inverse secondary complexity',
          name: 'Daugherty - Connelly',
        },
        email: 'Darron.Larson@gmail.com',
        name: 'Eugene Effertz',
        phone: '803.543.5573 x1428',
        username: 'Dudley.Littel',
        website: 'queasy-guide.info',
      },
      createTransaction: {
        account: '55239273',
        amount: '262.02',
        business: 'Cronin - Effertz',
        date: expect.any(Date),
        name: 'Money Market Account (...5403)',
        type: 'deposit',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      randomize: 'c',
      slugify: '',
      replaceSymbolWithNumber: '',
      replaceSymbols: '',
      replaceCreditCardSymbols: '6453-9487-2190-6162-7436',
      repeatString: '',
      regexpStyleStringParse: '',
      shuffle: [],
      uniqueArray: [],
      mustache: '',
      createCard: {
        accountHistory: [
          {
            account: '22174368',
            amount: '362.33',
            business: 'Wisoky, Smitham and Harvey',
            date: expect.any(Date),
            name: 'Personal Loan Account (...6184)',
            type: 'invoice',
          },
          {
            account: '23584206',
            amount: '108.51',
            business: 'Hessel - Lesch',
            date: expect.any(Date),
            name: 'Money Market Account (...5696)',
            type: 'invoice',
          },
          {
            account: '51479656',
            amount: '253.29',
            business: 'Schuppe, Corkery and Windler',
            date: expect.any(Date),
            name: 'Personal Loan Account (...9398)',
            type: 'payment',
          },
        ],
        address: {
          city: 'Kansas City',
          country: 'Algeria',
          geo: {
            lat: '85.0485',
            lng: '-122.7807',
          },
          state: 'Rhode Island',
          streetA: 'Neil Divide',
          streetB: '076 Rickey Ports',
          streetC: '428 Yasmeen Way Apt. 459',
          streetD: 'Apt. 136',
          zipcode: '39054',
        },
        company: {
          bs: 'mesh 24/7 models',
          catchPhrase: 'Organized client-driven architecture',
          name: 'Jacobi and Sons',
        },
        email: 'Marlen.Effertz35@gmail.com',
        name: 'Henrietta Sanford',
        phone: '621-735-9398',
        posts: [
          {
            paragraph:
              'Cupiditate pariatur laudantium. Inventore autem qui totam quo sunt. Consequatur rerum perspiciatis. Non tenetur ut quod vel explicabo officiis.',
            sentence: 'Nulla quos quidem et sed voluptate et quia.',
            sentences:
              'Esse in similique deleniti beatae eaque facilis optio unde. Dolorum impedit et ad. Omnis libero excepturi optio. Atque eius sequi laborum perspiciatis officiis.',
            words: 'tempora eos ipsa',
          },
          {
            paragraph:
              'Harum vero eum facilis facere odio nulla. Voluptates earum sed libero nisi vitae sed eius ducimus earum. Ducimus eum perferendis velit quia. Doloribus explicabo labore dolore dolores eaque voluptas non quo quam. Sint sapiente mollitia magnam a quibusdam maiores et aliquid ea. Nisi placeat voluptas et distinctio magni eveniet.',
            sentence:
              'Nam fugiat quos laboriosam qui necessitatibus alias voluptatem.',
            sentences:
              'Vel omnis maiores totam ut vitae accusamus. Officia eos natus minima voluptates. Iusto voluptates saepe asperiores. Esse consequatur consectetur qui. Quia error et culpa vel et facere.',
            words: 'quia eius cumque',
          },
          {
            paragraph:
              'Esse perferendis voluptatem molestiae dolorem ut quas exercitationem. Quo maiores ut et pariatur dolor velit rem officiis praesentium. Hic quo aut quis facilis. Est aut sint dolor illum. Architecto asperiores velit aut qui.',
            sentence: 'Minus aut aliquam perspiciatis.',
            sentences:
              'Recusandae atque sequi magnam nihil est architecto nostrum iusto corrupti. Vero ipsam illum accusantium possimus tempora nihil incidunt. Molestiae saepe mollitia ea est velit sed incidunt. Assumenda mollitia voluptas eveniet sapiente ducimus voluptatem totam. Qui aspernatur omnis libero voluptatem sed sunt maxime totam. Odio facilis explicabo quidem.',
            words: 'cupiditate debitis est',
          },
        ],
        username: 'Dangelo.Christiansen67',
        website: 'fresh-geek.name',
      },
      contextualCard: {
        address: {
          city: 'Susieberg',
          geo: {
            lat: '-88.0651',
            lng: '-37.2858',
          },
          street: 'Wilton Greens',
          suite: 'Suite 924',
          zipcode: '36947',
        },
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/162.jpg',
        company: {
          bs: 'empower e-business models',
          catchPhrase: 'Decentralized context-sensitive leverage',
          name: 'Johnston - Witting',
        },
        dob: new Date('1982-03-04T22:21:46.523Z'),
        email: 'Tito_Koch22.Batz68@hotmail.com',
        name: 'Tito',
        phone: '531.778.0766 x7894',
        username: 'Tito_Koch22',
        website: 'forthright-tuxedo.com',
      },
      userCard: {
        address: {
          city: 'Reingerfield',
          geo: {
            lat: '73.0714',
            lng: '-108.2073',
          },
          street: 'Neil Divide',
          suite: 'Suite 076',
          zipcode: '42898-9245',
        },
        company: {
          bs: 'disintermediate sexy experiences',
          catchPhrase: 'Focused client-driven orchestration',
          name: 'Fahey LLC',
        },
        email: 'Marlen.Effertz35@gmail.com',
        name: 'Henrietta Sanford',
        phone: '469.570.3390',
        username: 'Dangelo.Christiansen67',
        website: 'mild-hearth.org',
      },
      createTransaction: {
        account: '62743167',
        amount: '928.52',
        business: 'Trantow - Sanford',
        date: expect.any(Date),
        name: 'Savings Account (...1906)',
        type: 'deposit',
      },
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'randomize',
  'slugify',
  'replaceSymbolWithNumber',
  'replaceSymbols',
  'replaceCreditCardSymbols',
  'repeatString',
  'regexpStyleStringParse',
  'shuffle',
  'uniqueArray',
  'mustache',
  'createCard',
  'contextualCard',
  'userCard',
  'createTransaction',
];

describe('helpers', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.helpers[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('randomize()', () => {
        // Will be marked as deprecated soon

        it('returns a random element from an array', () => {
          const arr = ['a', 'b', 'c'];
          const elem = faker.helpers.randomize(arr);
          expect(elem).toBeTruthy();
          expect(arr).toContain(elem);
        });
      });

      describe('slugify()', () => {
        it('removes unwanted characters from URI string', () => {
          expect(faker.helpers.slugify('Aiden.Harªann')).toBe('Aiden.Harann');
          expect(faker.helpers.slugify("d'angelo.net")).toBe('dangelo.net');
        });
      });

      describe('replaceSymbolWithNumber()', () => {
        describe('when no symbol passed in', () => {
          it("uses '#' by default", () => {
            const num = faker.helpers.replaceSymbolWithNumber('#AB');
            expect(num).toMatch(/\dAB/);
          });
        });

        describe('when symbol passed in', () => {
          it('replaces that symbol with integers', () => {
            const num = faker.helpers.replaceSymbolWithNumber('#AB', 'A');
            expect(num).toMatch(/#\dB/);
          });
        });
      });

      describe('replaceSymbols()', () => {
        it('returns empty string with no arguments', () => {
          expect(faker.helpers.replaceSymbols()).toBe('');
        });

        describe("when '*' passed", () => {
          it('replaces it with alphanumeric', () => {
            const num = faker.helpers.replaceSymbols('*AB');
            expect(num).toMatch(/\wAB/);
          });
        });
      });

      describe('replaceCreditCardSymbols()', () => {
        it('returns a credit card number given a schema', () => {
          const number = faker.helpers.replaceCreditCardSymbols(
            '6453-####-####-####-###L'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
        });

        it('supports different symbols', () => {
          const number = faker.helpers.replaceCreditCardSymbols(
            '6453-****-****-****-***L',
            '*'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
        });

        it('handles regexp style input', () => {
          let number = faker.helpers.replaceCreditCardSymbols(
            '6453-*{4}-*{4}-*{4}-*{3}L',
            '*'
          );
          expect(number).toMatch(
            /^6453\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
          number = faker.helpers.replaceCreditCardSymbols(
            '645[5-9]-#{4,6}-#{1,2}-#{4,6}-#{3}L'
          );
          expect(number).toMatch(
            /^645[5-9]\-([0-9]){4,6}\-([0-9]){1,2}\-([0-9]){4,6}\-([0-9]){4}$/
          );
          expect(luhnCheck(number)).toBeTruthy();
        });
      });

      describe('repeatString()', () => {
        it('returns empty string with no arguments', () => {
          expect(faker.helpers.repeatString()).toBe('');
        });
      });

      describe('regexpStyleStringParse()', () => {
        it('returns an empty string when called without param', () => {
          expect(faker.helpers.regexpStyleStringParse()).toBe('');
        });

        it('deals with range repeat', () => {
          const string = faker.helpers.regexpStyleStringParse('#{5,10}');
          expect(string.length).toBeLessThanOrEqual(10);
          expect(string.length).toBeGreaterThanOrEqual(5);
          expect(string).toMatch(/^\#{5,10}$/);
        });

        it('flips the range when min > max', () => {
          const string = faker.helpers.regexpStyleStringParse('#{10,5}');
          expect(string.length).toBeLessThanOrEqual(10);
          expect(string.length).toBeGreaterThanOrEqual(5);
          expect(string).toMatch(/^\#{5,10}$/);
        });

        it('repeats string {n} number of times', () => {
          expect(faker.helpers.regexpStyleStringParse('%{10}')).toBe(
            faker.helpers.repeatString('%', 10)
          );
          expect(faker.helpers.regexpStyleStringParse('%{30}')).toBe(
            faker.helpers.repeatString('%', 30)
          );
          expect(faker.helpers.regexpStyleStringParse('%{5}')).toBe(
            faker.helpers.repeatString('%', 5)
          );
        });

        it('creates a numerical range', () => {
          const string = faker.helpers.regexpStyleStringParse('Hello[0-9]');
          expect(string).toMatch(/^Hello[0-9]$/);
        });

        it('deals with multiple tokens in one string', () => {
          const string = faker.helpers.regexpStyleStringParse(
            'Test#{5}%{2,5}Testing**[1-5]**{10}END'
          );
          expect(string).toMatch(
            /^Test\#{5}%{2,5}Testing\*\*[1-5]\*\*{10}END$/
          );
        });
      });

      describe('shuffle()', () => {
        it('the output is the same length as the input', () => {
          const shuffled = faker.helpers.shuffle(['a', 'b']);

          expect(shuffled).toHaveLength(2);
        });

        it('empty array returns empty array', () => {
          const shuffled = faker.helpers.shuffle([]);
          expect(shuffled).toHaveLength(0);
        });

        it('mutates the input array in place', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          const shuffled = faker.helpers.shuffle(input);
          expect(shuffled).deep.eq(input);
        });

        it('all items shuffled as expected when seeded', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          faker.seed(100);
          const shuffled = faker.helpers.shuffle(input);
          expect(shuffled).deep.eq([
            'b',
            'e',
            'a',
            'd',
            'j',
            'i',
            'h',
            'c',
            'g',
            'f',
          ]);
        });
      });

      describe('uniqueArray()', () => {
        it('custom array returns unique array', () => {
          const input = ['a', 'a', 'a', 'a,', 'a', 'a', 'a', 'a', 'b'];
          const length = 2;
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('definition array returns unique array', () => {
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(
            faker.definitions.hacker.noun,
            length
          );
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('function returns unique array', () => {
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(faker.lorem.word, length);
          expect(unique).toHaveLength(length);
          expect(new Set(unique).size).toBe(length);
        });

        it('empty array returns empty array', () => {
          const input = [];
          const length = faker.datatype.number({ min: 1, max: 6 });
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).toHaveLength(input.length);
          expect(new Set(unique).size).toBe(input.length);
        });

        it('length longer than source returns max length', () => {
          const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
          const length = input.length + 1;
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).toHaveLength(input.length);
          expect(new Set(unique).size).toBe(input.length);
        });

        it('works as expected when seeded', () => {
          const input = ['a', 'a', 'a', 'a', 'a', 'f', 'g', 'h', 'i', 'j'];
          const length = 5;
          faker.seed(100);
          const unique = faker.helpers.uniqueArray(input, length);
          expect(unique).deep.eq(['g', 'a', 'i', 'f', 'j']);
        });
      });

      describe('mustache()', () => {
        it('returns empty string with no template input', () => {
          expect(faker.helpers.mustache(undefined, {})).toBe('');
        });

        it('returns empty string with empty template input', () => {
          expect(faker.helpers.mustache('', {})).toBe('');
        });

        it('supports string replace values', () => {
          const actual = faker.helpers.mustache('1{{value}}3', { value: '2' });

          expect(actual).toBe('123');
        });

        it('supports function replace values faker values', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: faker.datatype.string(2),
          });

          expect(actual).toHaveLength(4);
        });

        it('supports function replace values faker function', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: () => faker.datatype.string(3),
          });

          expect(actual).toHaveLength(5);
        });

        it('supports function replace values no args', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: () => '7',
          });

          expect(actual).toBe('173');
        });

        it('supports function replace values with args', () => {
          const actual = faker.helpers.mustache('1{{value}}3', {
            value: (key) => String(key.length),
          });

          expect(actual).toBe('193');
        });
      });

      describe('createCard()', () => {
        it('returns an object', () => {
          const card = faker.helpers.createCard();
          expect(card).toBeTypeOf('object');
        });
      });

      describe('contextualCard()', () => {
        it('returns an object', () => {
          const card = faker.helpers.contextualCard();
          expect(card).toBeTypeOf('object');
        });
      });
      describe('userCard()', () => {
        it('returns an object', () => {
          const card = faker.helpers.userCard();
          expect(card).toBeTypeOf('object');
        });
      });

      describe('createTransaction()', () => {
        it('should create a random transaction', () => {
          const transaction = faker.helpers.createTransaction();
          expect(transaction).toBeTruthy();
          expect(transaction.amount).toBeTruthy();
          expect(transaction.date).toBeTruthy();
          expect(transaction.business).toBeTruthy();
          expect(transaction.name).toBeTruthy();
          expect(transaction.type).toBeTruthy();
          expect(transaction.account).toBeTruthy();
        });
      });

      describe('deprecation warnings', () => {
        it.each([['randomize', 'random.arrayElement']])(
          'should warn user that function helpers.%s is deprecated',
          (functionName, newLocation) => {
            const spy = vi.spyOn(console, 'warn');

            faker.helpers[functionName]();

            expect(spy).toHaveBeenCalledWith(
              `[@faker-js/faker]: faker.helpers.${functionName}() is deprecated and will be removed in v7.0.0. Please use faker.${newLocation}() instead.`
            );
            spy.mockRestore();
          }
        );
      });
    }
  });
  describe('deprecation warnings', () => {
    it.each(['createCard', 'contextualCard', 'userCard'])(
      'should warn user that function random.%s is deprecated',
      (functionName) => {
        const spy = vi.spyOn(console, 'warn');

        faker.helpers[functionName]();

        expect(spy).toHaveBeenCalledWith(
          `[@faker-js/faker]: helpers.${functionName}() is deprecated since v6.1.0 and will be removed in v7.0.0. Please use a self-build function instead.`
        );
        spy.mockRestore();
      }
    );
  });
});
