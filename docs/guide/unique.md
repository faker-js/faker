# Unique Values

In general, Faker methods do not return unique values.

```ts
faker.seed(55);
faker.animal.type(); //'cat'
faker.animal.type(); //'bird'
faker.animal.type(); //'horse'
faker.animal.type(); //'horse'
```

Some methods and locales use much smaller data sets than others. For example, `faker.animal.type` has only 44 possible animals to choose from. In contrast, `faker.person.fullName()` pulls from a list of hundreds of first names, surnames, and prefixes/suffixes, so it can generate hundreds of thousands of unique names. Even then, the [birthday paradox](https://en.wikipedia.org/wiki/Birthday_Paradox) means that duplicate values will quickly be generated.

Sometimes, you want to generate unique values. For example, you may wish to have unique values in a database email column.  
There are a few possible strategies for this:

1. Use `faker.helpers.uniqueArray()` if you want to generate all the values at one time. For example:

```ts
faker.helpers.uniqueArray(() => faker.internet.email(), 1000); // will generate 1000 unique email addresses
```

2. If there are insufficient values for your needs, consider prefixing or suffixing values with your own sequential values, for example you could prefix `1.`, `2.` to each generated email in turn.

3. Build your own logic to keep track of a set of previously generated values and regenerate values as necessary if a duplicate is generated

4. Use a third-party package to enforce uniqueness, such as [enforce-unique](https://github.com/MansurAliKoroglu/enforce-unique) or [@dpaskhin/unique](https://github.com/dPaskhin/unique).

## Weighted samples from your own data

When generating a catalog or a survey response, you may want some entries to be
more likely than others while still selecting each entry at most once. Use
[`weightedArrayElements()`](/api/helpers.html#weightedarrayelements) for this:

```ts
const categories = [
  { weight: 5, value: 'books' },
  { weight: 3, value: 'games' },
  { weight: 2, value: 'music' },
] as const;

faker.helpers.weightedArrayElements(categories, 2); // ['books', 'music']
faker.helpers.weightedArrayElements(categories, { min: 1, max: 3 }); // ['games']
```

On the first draw, `books` has probability 5/10. If `books` is selected, the next
draw chooses `games` with probability 3/5 or `music` with probability 2/5.
Results are returned in this selection order. These are successive draw
probabilities, not the probability that an entry appears anywhere in the result.
Selecting the entire population returns every entry in a weighted random order.

Each **entry** is selected at most once; equal values in different entries can
still produce duplicate values. Objects and functions are returned by reference,
and functions are not invoked. The input array and its entries are never changed.
For value uniqueness, supply distinct values or use `uniqueArray()` instead.

If repetitions are useful, for example when generating a set of subscription
tiers with unequal frequencies, use
[`weightedArraySamples()`](/api/helpers.html#weightedarraysamples):

```ts
const tiers = [
  { weight: 8, value: 'basic' },
  { weight: 2, value: 'premium' },
] as const;

faker.helpers.weightedArraySamples(tiers, 5); // ['basic', 'basic', 'premium', 'basic', 'basic']
```

Each draw uses the same weights independently, so entries can repeat and the
count can exceed the population size. Weights need not sum to one: `8, 2` and
`0.8, 0.2` express the same probabilities. Weights must be positive and finite;
zero, negative, `NaN`, and infinite weights throw `FakerError`. Remove excluded
entries before sampling instead of assigning them zero weight.

| Behavior                 | `weightedArrayElements`                     | `weightedArraySamples`      |
| ------------------------ | ------------------------------------------- | --------------------------- |
| Replacement              | No                                          | Yes                         |
| Count omitted            | Randomly selects 1 through the input length | Count required              |
| Count above input length | Limited to the input length                 | Returns the requested count |
| Count zero or negative   | Empty result                                | Empty result                |
| Empty input              | Empty result                                | Throws `FakerError`         |

Both methods accept a fixed count or an inclusive `{ min, max }` range, with safe
integer values. Reversed ranges and non-integer counts throw `FakerError`.
Weights are validated even when requesting zero entries. Calling `faker.seed()`
reproduces results for the same inputs and call order.

The standalone equivalents, `fakeHelpersWeightedArrayElements(fakerCore, ...)`
and `fakeHelpersWeightedArraySamples(fakerCore, ...)`, use the same signatures
with a `FakerCore` first argument and require no locale data.

Without-replacement sampling ranks independent exponential arrival times in
logarithmic space, taking O(n log n) time and O(n) working memory. It does not
retry duplicate draws and can still select extremely small weights after larger
ones are removed. Sampling with replacement builds normalized cumulative weights
once, then performs binary searches, taking O(n + k log n) time for k samples.
As with other floating-point random sampling, probabilities below the precision
of the randomizer or cumulative weights may be unobservable. These methods are
for fake data, not cryptographic selection.
