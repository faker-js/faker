<div align="center">
  <img src="./docs/public/logo.svg" width="200"/>
  <h1>Faker</h1>
  <p>Generate massive amounts of fake (but realistic) data for testing and development.</p>

[![npm version](https://badgen.net/npm/v/@faker-js/faker)](https://www.npmjs.com/package/@faker-js/faker)
[![npm downloads](https://badgen.net/npm/dm/@faker-js/faker)](https://www.npmjs.com/package/@faker-js/faker)
[![Continuous Integration](https://github.com/faker-js/faker/actions/workflows/ci.yml/badge.svg)](https://github.com/faker-js/faker/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/faker-js/faker/branch/next/graph/badge.svg?token=N61U168G08)](https://codecov.io/gh/faker-js/faker)
[![Chat on Discord](https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord)](https://chat.fakerjs.dev)
[![Open Collective](https://img.shields.io/opencollective/backers/fakerjs)](https://opencollective.com/fakerjs#section-contributors)
[![sponsor](https://img.shields.io/opencollective/all/fakerjs?label=sponsors)](https://opencollective.com/fakerjs)
</div>

## ⚡️ Try it Online

[Open in StackBlitz](https://fakerjs.dev/new)

## 📙 API Documentation

<h1>⚠️ You are reading the docs for the <a href="https://github.com/faker-js/faker/tree/next">next</a> branch ⚠️</h1>

Please proceed to the [Getting Started Guide](https://fakerjs.dev/guide/) for the **stable** release of Faker.

For detailed API documentation, please select the version of the documentation you are looking for.

|   Version    | Website                   |
| :----------: | :------------------------ |
|  v11 (next)  | https://next.fakerjs.dev/ |
| v10 (stable) | https://fakerjs.dev/      |
|   v9 (old)   | https://v9.fakerjs.dev/   |

---

## 🚀 Features

- 🧍 Person - Generate Names, Genders, Bios, Job titles, and more.
- 📍 Location - Generate Addresses, Zip Codes, Street Names, States, and Countries!
- ⏰ Date - Past, present, future, recent, soon... whenever!
- 💸 Finance - Create stubbed out Account Details, Transactions, and Crypto Addresses.
- 👠 Commerce - Generate Prices, Product Names, Adjectives, and Descriptions.
- 👾 Hacker - “Try to reboot the SQL bus, maybe it will bypass the virtual application!”
- 🔢 Number and String - Of course, we can also generate random numbers and strings.
- 🌏 Localization - Pick from over 70 locales to generate realistic looking Names, Addresses, and Phone Numbers.

> **Note**: Faker tries to generate realistic data and not obvious fake data.
> The generated names, addresses, emails, phone numbers, and/or other data might be coincidentally valid information.
> Please do not send any of your messages/calls to them from your test setup.

## 📦 Install

```bash
npm install --save-dev @faker-js/faker
```

## 🪄 Usage

```ts
// ESM
import { faker } from '@faker-js/faker';

// CJS
const { faker } = require('@faker-js/faker');

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
```

## 💎 Modules

An in-depth overview of the API methods is available in the documentation for [v10 (stable)](https://fakerjs.dev/api/) and [v11 (next)](https://next.fakerjs.dev/api/).

### Templates

Faker contains a generator method `faker.helpers.fake` for combining faker API methods using a mustache string format.

```ts
console.log(
  faker.helpers.fake(
    'Hello {{person.prefix}} {{person.lastName}}, how are you today?'
  )
);
```

## 🌏 Localization

Faker has support for multiple locales.

The main `faker` instance uses the English locale.
But you can also import instances using other locales.

```ts
// ESM
import { fakerDE as faker } from '@faker-js/faker';

// CJS
const { fakerDE: faker } = require('@faker-js/faker');
```

See our documentation for a list of [provided languages](https://fakerjs.dev/guide/localization.html#available-locales).

Please note: Not every locale provides data for every module. In our pre-made faker instances,
we fall back to English in such a case as this is the most complete and most commonly used language.
If you don't want that or prefer a different fallback, you can also build your own instances.

```ts
import { de, de_CH, Faker } from '@faker-js/faker';

export const faker = new Faker({
  locale: [de_CH, de],
});
```

## ⚙️ Setting a randomness seed

If you want consistent results, you can set your own seed. If you are using `faker.date` methods, there are additional considerations. See [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results).

```ts
faker.seed(123);

const firstRandom = faker.number.int();

// Setting the seed again resets the sequence.
faker.seed(123);

const secondRandom = faker.number.int();

console.log(firstRandom === secondRandom);
```

## 🤝 Sponsors

Faker is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome backers

### Sponsors

![](https://opencollective.com/fakerjs/organizations.svg)

### Backers

![](https://opencollective.com/fakerjs/individuals.svg)

## ✨ Contributing

Please make sure to read the [Contributing Guide](https://github.com/faker-js/faker/blob/next/CONTRIBUTING.md) before making a pull request.

## 📘 Credits

Thanks to all the people who already contributed to Faker!

<a href="https://github.com/faker-js/faker/graphs/contributors"><img src="https://opencollective.com/fakerjs/contributors.svg?width=800" /></a>

The [fakerjs.dev](https://fakerjs.dev) website is generously hosted by [Netlify](https://www.netlify.com/), with search functionality powered by [Algolia](https://www.algolia.com/).

## 📝 Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/faker-js/faker/blob/next/CHANGELOG.md).

## 📜 What happened to the original faker.js?

Read the [team update](https://fakerjs.dev/update.html) (January 14th, 2022).

## 🔑 License

[MIT](https://github.com/faker-js/faker/blob/next/LICENSE)


## 🌐 Web Resources & Interactive Index
- [GLITCH](https://themindzone.pages.dev/glitch.html)
- [CATEGORY POINT AND CLICK123](https://ilearnworld.github.io/category-point-and-click123.html)
- [WORD VOYAGER](https://thelearnquester.web.app/word-voyager.html)
- [TILEMAN IO](https://studyquests.github.io/tileman-io.html)
- [CATEGORY DIRT BIKE](https://studyquests.pages.dev/category-dirt-bike.html)
- [UNBLOCK IT ATLANTIS](https://quizverses.github.io/unblock-it-atlantis.html)
- [STACK FALL](https://quizverses-9d2f2.web.app/stack-fall.html)
- [FUNNY FRUITS MERGE AND GATHER WATERMELON](https://studyquests.pages.dev/funny-fruits-merge-and-gather-watermelon.html)
- [CATEGORY GITHUB IO](https://studyquests.github.io/category-github-io.html)
- [ZIG SNAKE](https://studyquesthub.web.app/zig-snake.html)
- [HOUSE ROBBER](https://studyquests.github.io/house-robber.html)
- [CHICKEN SCREAM RACE](https://studyquests.github.io/chicken-scream-race.html)
- [TUNG SAHUR BOTS CHASE ROOM](https://studyquesthub.web.app/tung-sahur-bots-chase-room.html)
- [ROBOT TRANSFORM RACE](https://studyquests.github.io/robot-transform-race.html)
- [HAPPY EGG CATCH](https://quizverses.github.io/happy-egg-catch.html)
- [MAZE ESCAPE CRAFT MAN](https://studyquests.github.io/maze-escape-craft-man.html)
- [CATEGORY PLATFORM260](https://studyquests.github.io/category-platform260.html)
- [MEGA JUMP](https://quizverses.github.io/mega-jump.html)
- [CATEGORY CONTENTKEEPER](https://studyplaying.github.io/category-contentkeeper.html)
- [JOURNEY OF ESCAPE](https://studyquests.github.io/journey-of-escape.html)
- [HYPER NURSE HOSPITAL GAMES](https://studyquests.pages.dev/hyper-nurse-hospital-games.html)
- [CATEGORY BOOKMARK](https://studyplaying.github.io/category-bookmark.html)
- [STICKMAN FOOTBALL](https://quizverses-9d2f2.web.app/stickman-football.html)
- [MAGIC PIANO MUSIC](https://studyquests.github.io/magic-piano-music.html)
- [WORMSARENAIO](https://quizverses-9d2f2.web.app/wormsarenaio.html)
- [NINJA DASH COZY TACTIC PUZZLE](https://quizverses.github.io/ninja-dash-cozy-tactic-puzzle.html)
- [COIN BLITZ](https://studyquests.github.io/coin-blitz.html)
- [CATEGORY BUBBLE SHOOTER](https://quizverses.pages.dev/category-bubble-shooter.html)
- [CATEGORY CASUAL 10](https://studyquests.github.io/category-casual-10.html)
- [CATEGORY HORDE SURVIVAL67](https://studyquests.github.io/category-horde-survival67.html)
- [FOOTBALL HEADS 2025](https://studyquesthub.web.app/football-heads-2025.html)
- [GEOMETRY LITE](https://quizverses.github.io/geometry-lite.html)
- [CATEGORY CAT55](https://studyquests.github.io/category-cat55.html)
- [BUBBITS](https://studyquests.pages.dev/bubbits.html)
- [PUZZLE BLOCKS CLASSIC](https://studyquests.github.io/puzzle-blocks-classic.html)
- [MY LITTLE CAR WASH](https://quizverses.github.io/my-little-car-wash.html)
- [3D FPS TARGET SHOOTING](https://studyquests.github.io/3d-fps-target-shooting.html)
- [TUNG SAHUR COLORING](https://quizverses.github.io/tung-sahur-coloring.html)
- [ORGANIZE IT](https://studyquests.github.io/organize-it.html)
- [SWORD AND SPIN](https://quizverses.github.io/sword-and-spin.html)
- [MY LITTLE CAR WASH](https://studyquests.github.io/my-little-car-wash.html)
- [CATEGORY DESTROY](https://quizverses.github.io/category-destroy.html)
- [CATEGORY BRAIN](https://quizverses.pages.dev/category-brain.html)
- [CATEGORY AGILITY](https://studyquests.pages.dev/category-agility.html)
- [JEWELS BLITZ LEGENDS](https://quizverses-9d2f2.web.app/jewels-blitz-legends.html)
- [CATEGORY CASUAL 4](https://quizverses.pages.dev/category-casual-4.html)
- [CATEGORY EDUCATIONAL](https://studyplaying.github.io/category-educational.html)
- [THE ROMAN EMPIRE COLOSSEUM](https://quizverses-9d2f2.web.app/the-roman-empire-colosseum.html)
- [CATEGORY AGILITY](https://studyquests.github.io/category-agility.html)
- [CATEGORY HORROR](https://studyquests.github.io/category-horror.html)
- [CRAFTMART](https://quizverses.github.io/craftmart.html)
- [INDEX12](https://studyquests.github.io/index12.html)
- [STICKMAN SORT](https://studyquests.github.io/stickman-sort.html)
- [ROYAL REBELLION PUNK MAGIC](https://studyquests.pages.dev/royal-rebellion-punk-magic.html)
- [CATEGORY HORROR](https://quizverses.github.io/category-horror.html)
- [CATEGORY HERO71](https://quizverses.github.io/category-hero71.html)
- [SNAKE GO ESCAPE PUZZLE](https://quizverses-9d2f2.web.app/snake-go-escape-puzzle.html)
- [COSMO VOID](https://quizverses.github.io/cosmo-void.html)
- [ZOMBIE CHASE](https://quizverses.pages.dev/zombie-chase.html)
- [CATEGORY HAPARA](https://studyplaying.github.io/category-hapara.html)
- [FASHION BATTLE FOR SURVIVAL](https://studyquests.github.io/fashion-battle-for-survival.html)
- [CATEGORY DRAGON22](https://quizverses.github.io/category-dragon22.html)
- [ONLINE PORTAL](https://studyquests.pages.dev/)
- [DOG ESCAPE](https://studyquests.pages.dev/dog-escape.html)
- [WATERPARK SORT](https://studyquesthub.web.app/waterpark-sort.html)
- [CATEGORY SPORTS](https://studyquests.pages.dev/category-sports.html)
- [CATEGORY CASUAL 14](https://studyquests.github.io/category-casual-14.html)
- [IDLE AIRPORT CEO](https://quizverses-9d2f2.web.app/idle-airport-ceo.html)
- [FALLING MAN](https://studyquesthub.web.app/falling-man.html)
- [VEGA MIX FAIRY TOWN](https://studyquests.github.io/vega-mix-fairy-town.html)
- [WORDS FROM WORDS SEA](https://quizverses.github.io/words-from-words-sea.html)
- [DOCTOR CHICKEN](https://quizverses.github.io/doctor-chicken.html)
- [BARBEE MET GALA TRANSFORMATION](https://quizverses.pages.dev/barbee-met-gala-transformation.html)
- [INDEX8](https://quizverses.pages.dev/index8.html)
- [CATEGORY DRESS UP 2](https://quizverses.github.io/category-dress-up-2.html)
- [CATEGORY ESCAPE](https://quizverses.github.io/category-escape.html)
- [JEWEL COLORING](https://studyquests.github.io/jewel-coloring.html)
- [STICKMAN DOORS AND ISLAND](https://studyquests.pages.dev/stickman-doors-and-island.html)
- [CATEGORY BATTLE](https://studyquests.github.io/category-battle.html)
- [MOLANG MATCHN MUNCH](https://studyquesthub.web.app/molang-matchn-munch.html)
- [CATEGORY MATCH 3117](https://quizverses-9d2f2.web.app/category-match-3117.html)
- [GET TO THE CHOPPER](https://quizverses.github.io/get-to-the-chopper.html)
- [CATEGORY GAMES](https://studyquests.github.io/category-games.html)
- [HERO WIZARD SAVE YOUR GIRLFRIEND](https://quizverses.github.io/hero-wizard-save-your-girlfriend.html)
- [BARRY PRISON CHRISTMAS ADVENTURE](https://quizverses.pages.dev/barry-prison-christmas-adventure.html)
- [STICKMAN PUNISHMENT](https://quizverses.pages.dev/stickman-punishment.html)
- [FASHION MAKEOVER DASH](https://quizverses.github.io/fashion-makeover-dash.html)
- [CHESSFIELD](https://studyquests.github.io/chessfield.html)
- [CATEGORY BUILDING](https://quizverses.pages.dev/category-building.html)
- [SOLITAIRE FARM SEASONS 3](https://quizverses-9d2f2.web.app/solitaire-farm-seasons-3.html)
- [CATEGORY EDUCATIONAL](https://quizverses.pages.dev/category-educational.html)
- [ARROW ESCAPE](https://quizverses.github.io/arrow-escape.html)
- [ADVERSATOR](https://studyquesthub.web.app/adversator.html)
- [WOOP CRAWL UP](https://studyquesthub.web.app/woop-crawl-up.html)
- [SPRING MAGIC ENCHANTED WARDROBE](https://studyquests.pages.dev/spring-magic-enchanted-wardrobe.html)
- [NITRO SPEED 2 UNDERGROUND](https://studyquests.github.io/nitro-speed-2-underground.html)
- [CATEGORY BIKE](https://studyplaying.github.io/category-bike.html)
- [THE FLOWERS MERGE AND SELL BOUQUETS](https://quizverses.pages.dev/the-flowers-merge-and-sell-bouquets.html)
- [MAHJONG CONNECT SPOOKY](https://studyquests.pages.dev/mahjong-connect-spooky.html)
- [CATEGORY CARTOON](https://studyquests.github.io/category-cartoon.html)
- [POGO MASTERS](https://themindplay.pages.dev/pogo-masters.html)
- [INDEX6](https://studyquests.pages.dev/index6.html)
- [SWEET HAUNT 2](https://thequizzone.pages.dev/sweet-haunt-2.html)
- [CATEGORY INCREMENTAL](https://theskillquest.pages.dev/category-incremental.html)
- [GRANDMA RECIPE RAMEN](https://themindzone.pages.dev/grandma-recipe-ramen.html)
- [POPCAT CLICKER](https://themindzone.pages.dev/popcat-clicker.html)
- [MERMAIDS SPOT THE DIFFERENCES](https://thelearnquesters.pages.dev/mermaids-spot-the-differences.html)
- [FLYORDIEIO](https://iskillquest.pages.dev/flyordieio.html)
- [FARM BLOCK PUZZLE](https://themindzone.pages.dev/farm-block-puzzle.html)
- [FRUIT JAM MERGE PUZZLE GAME](https://themindplay.pages.dev/fruit-jam-merge-puzzle-game.html)
- [FOOTBALL PENALTY](https://quizverses.github.io/football-penalty.html)
- [CATEGORY BATTLE ROYALE GAMES](https://quizverses.github.io/category-battle-royale-games.html)
- [K POP HUNTER HALLOWEEN FASHION](https://themindzone.pages.dev/k-pop-hunter-halloween-fashion.html)
- [BOAT MANIA](https://thelearnquesters.pages.dev/boat-mania.html)
- [CAR RACING 3D DRIVE MAD](https://themindplay.pages.dev/car-racing-3d-drive-mad.html)
- [SNAKE KING](https://studyquests.github.io/snake-king.html)
- [STICKMAN ARCHER SHOOTING ARROWS AT REDS](https://themindplay.pages.dev/stickman-archer-shooting-arrows-at-reds.html)
- [CATEGORY DESTROY256](https://studyplaying.github.io/category-destroy256.html)
- [TRAFFIC LIGHT SIMULATOR 3D](https://theskillquest.pages.dev/traffic-light-simulator-3d.html)
- [CATEGORY STICKMAN](https://studyquests.pages.dev/category-stickman.html)
- [YUMMY TALES 4](https://thelearnquesters.pages.dev/yummy-tales-4.html)
- [CATEGORY GROW GAMES](https://quizverses.github.io/category-grow-games.html)
- [CATEGORY BLOCK94](https://thequizzone.pages.dev/category-block94.html)
- [MY CITY HOSPITAL](https://theskillquest.pages.dev/my-city-hospital.html)
- [MERGE BLOCKS 2048 STYLE](https://themindplay.github.io/merge-blocks-2048-style.html)
- [POTION SORT](https://quizverses.pages.dev/potion-sort.html)
- [MARBLE RUN ULTIMATE RACE](https://themindplays.pages.dev/marble-run-ultimate-race.html)
- [CONNECT THE DOTS COLOR LINES](https://quizverses.github.io/connect-the-dots-color-lines.html)
- [BIRD SORT CHALLENGES](https://themindplays.pages.dev/bird-sort-challenges.html)
- [QUEENS ROYAL SUDOKU PUZZLE](https://quizverses.pages.dev/queens-royal-sudoku-puzzle.html)
