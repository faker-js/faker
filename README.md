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
- [BFF HAPPY SPRING](https://learnquesters.pages.dev/bff-happy-spring.html)
- [FISHING CATCH THE SECRET BRAINROT](https://iskillquest.pages.dev/fishing-catch-the-secret-brainrot.html)
- [CAKE MERGE 2](https://learnquesters.pages.dev/cake-merge-2.html)
- [CATEGORY OBBY56](https://quizverses-9d2f2.web.app/category-obby56.html)
- [BARRY PRISON HIDE AND SEEK](https://studyquests.github.io/barry-prison-hide-and-seek.html)
- [HAPPY MONSTERS 2](https://learnquesters.pages.dev/happy-monsters-2.html)
- [CATEGORY SOLITAIRE27](https://studyplaying.github.io/category-solitaire27.html)
- [MAGIC BOTTLES](https://thelearnquester.web.app/magic-bottles.html)
- [BARK BLAST](https://learnquesters.pages.dev/bark-blast.html)
- [BATTLE TANKS FIRESTORM](https://learnquester.github.io/battle-tanks-firestorm.html)
- [FURY ROAD ZOMBIE CRASH](https://quizverses-9d2f2.web.app/fury-road-zombie-crash.html)
- [STICKMAN PUNISHMENT](https://quizverses.pages.dev/stickman-punishment.html)
- [RELAX MINI GAMES COLLECTION](https://studyquesthub.web.app/relax-mini-games-collection.html)
- [JIGSAW FANTASY](https://learnquester.github.io/jigsaw-fantasy.html)
- [RESTAURANT SIMULATOR BURGERS PIZZA](https://quizverses.pages.dev/restaurant-simulator-burgers-pizza.html)
- [INDEX40](https://thelearnquesters.pages.dev/index40.html)
- [SQUIRREL WITH A GUN](https://studyquests.github.io/squirrel-with-a-gun.html)
- [CATEGORY TOWER DEFENSE](https://studyquesthub.web.app/category-tower-defense.html)
- [MR LONG LEGS](https://studyquesthub.web.app/mr-long-legs.html)
- [INDEX14](https://studyquests.github.io/index14.html)
- [HEROIC KNIGHT](https://learnquesters.pages.dev/heroic-knight.html)
- [GRAFFITI TAGS SPRAY PAINTING](https://studyquests.pages.dev/graffiti-tags-spray-painting.html)
- [DEADFLIP FRENZY](https://studyplaying.github.io/deadflip-frenzy.html)
- [CATEGORY PUZZLE 3](https://learnquester.pages.dev/category-puzzle-3.html)
- [PUZZLES BALLS MERGE THE NEW YEAR](https://quizverses.github.io/puzzles-balls-merge-the-new-year.html)
- [CITY BIKE RACING CHAMPION](https://quizverses-9d2f2.web.app/city-bike-racing-champion.html)
- [CATEGORY CUTE62](https://studyquests.pages.dev/category-cute62.html)
- [VEHICLE FUN RACE](https://quizverses.github.io/vehicle-fun-race.html)
- [CATEGORY CASUAL](https://quizverses.pages.dev/category-casual.html)
- [WOODS OF NEVIA FOREST SURVIVAL](https://studyplayings.pages.dev/woods-of-nevia-forest-survival.html)
- [YUMMY TALES 4](https://studyplayings.pages.dev/yummy-tales-4.html)
- [FRUIT CATCHER](https://studyquesthub.web.app/fruit-catcher.html)
- [WORLD Z DEFENSE ZOMBIE DEFENSE](https://thelearnquester.web.app/world-z-defense-zombie-defense.html)
- [PRIVACY](https://learnquester.pages.dev/privacy.html)
- [MAD TRUCK](https://studyplaying.github.io/mad-truck.html)
- [IDLE FACTORY EMPIRE](https://quizverses-9d2f2.web.app/idle-factory-empire.html)
- [PEOPLE PLAYGROUND RAGDOLL ARENA](https://studyplayings.pages.dev/people-playground-ragdoll-arena.html)
- [GOING BALLS ADVENTURE 2](https://studyquests.github.io/going-balls-adventure-2.html)
- [PRIVACY](https://brainquests.netlify.app/privacy.html)
- [CATEGORY FASHION](https://studyplayings.web.app/category-fashion.html)
- [INDEX14](https://thelearnquesters.pages.dev/index14.html)
- [CATEGORY 3D1 371](https://quizverses.github.io/category-3d1-371.html)
- [INDEX21](https://thelearnquesters.pages.dev/index21.html)
- [PRIVACY](https://brainquests-fb2c5.web.app/privacy.html)
- [ICONIC HALLOWEEN COSTUMES](https://studyplaying.github.io/iconic-halloween-costumes.html)
- [MEMOJI](https://studyplayings.pages.dev/memoji.html)
- [CATEGORY RUNNING107](https://studyquests.github.io/category-running107.html)
- [CHRISTMAS SORTING](https://studyplaying.github.io/christmas-sorting.html)
- [HIDDEN OBJECTS BAKERY](https://learnquester.github.io/hidden-objects-bakery.html)
- [SWEET AND FRUITY MAKEUP](https://studyquests.pages.dev/sweet-and-fruity-makeup.html)
- [CATEGORY CARDS](https://studyquests.github.io/category-cards.html)
- [INDEX29](https://thelearnquesters.pages.dev/index29.html)
- [WOLF LIFE SIMULATOR](https://studyplaying.github.io/wolf-life-simulator.html)
- [GIANT CROWD IO HOUSE CAPTURE](https://quizverses.pages.dev/giant-crowd-io-house-capture.html)
- [MUSHROOM FEVER MATCH 3](https://studyquests.github.io/mushroom-fever-match-3.html)
- [POPS QUEST](https://studyquests.github.io/pops-quest.html)
- [BACKROOMS](https://studyplaying.github.io/backrooms.html)
- [BODY CARE SIMULATOR](https://quizverses.pages.dev/body-care-simulator.html)
- [INDEX21](https://learnquester.pages.dev/index21.html)
- [BUBBLE SHOOTER GO](https://learnquesters.pages.dev/bubble-shooter-go.html)
- [INDEX26](https://thelearnquesters.pages.dev/index26.html)
- [RAGDOLL PARKOUR SIMULATOR](https://learnquester.github.io/ragdoll-parkour-simulator.html)
- [CATEGORY CUTE62](https://studyplayings.web.app/category-cute62.html)
- [INDEX36](https://studyquests.github.io/index36.html)
- [LOVE TILE TRIO](https://studyquesthub.web.app/love-tile-trio.html)
- [INDEX7](https://learnquester.pages.dev/index7.html)
- [INDEX17](https://studyplayings.web.app/index17.html)
- [SUPER FOOTBALL FEVER](https://studyquests.github.io/super-football-fever.html)
- [ROBOTS GONE WILD](https://studyquests.pages.dev/robots-gone-wild.html)
- [WORDLING DAILY WORD CHALLENGE](https://quizverses.github.io/wordling-daily-word-challenge.html)
- [CATEGORY SIMULATION 2](https://studyquests.pages.dev/category-simulation-2.html)
- [COOKING FESTIVAL](https://studyquesthub.web.app/cooking-festival.html)
- [VAMPIRIC ROULETTE ROMANCE](https://studyquests.pages.dev/vampiric-roulette-romance.html)
- [INDEX3](https://quizverses.github.io/index3.html)
- [CONNECT BALLS NEW YEAR PUZZLES](https://studyquests.github.io/connect-balls-new-year-puzzles.html)
- [SHIP CONTROL 3D](https://studyplayings.pages.dev/ship-control-3d.html)
- [ORGANIZE IT](https://studyquests.github.io/organize-it.html)
- [ROYAL FAMILY TREE](https://thelearnquester.web.app/royal-family-tree.html)
- [ELLIE AND BEN CHRISTMAS EVE](https://quizverses.github.io/ellie-and-ben-christmas-eve.html)
- [OPENGUESSR](https://studyplaying.github.io/openguessr.html)
- [BLOCKY ARCHER RUN](https://learnquesters.pages.dev/blocky-archer-run.html)
- [CATEGORY CARTOON76](https://studyplayings.web.app/category-cartoon76.html)
- [CATEGORY CARE](https://thelearnquesters.pages.dev/category-care.html)
- [BOUNCY BLOB RACE OBSTACLE COURSE](https://quizverses.github.io/bouncy-blob-race-obstacle-course.html)
- [INDEX3](https://learnquester.github.io/index3.html)
- [MONSTER SCHOOL VS SIREN HEAD](https://thelearnquester.web.app/monster-school-vs-siren-head.html)
- [CATEGORY AGILITY 2](https://learnquester.github.io/category-agility-2.html)
- [INDEX28](https://thelearnquesters.pages.dev/index28.html)
- [BLOCKAPOLYPSE ZOMBIE SHOOTER](https://studyquesthub.web.app/blockapolypse-zombie-shooter.html)
- [SMASH THE BOTTLE](https://quizverses.github.io/smash-the-bottle.html)
- [OVERTIDE IO](https://thelearnquester.web.app/overtide-io.html)
- [INDEX10](https://learnquester.pages.dev/index10.html)
- [CATEGORY DRAWING](https://thelearnquesters.pages.dev/category-drawing.html)
- [SECRET GALAXY MATCH THREE](https://studyplayings.pages.dev/secret-galaxy-match-three.html)
- [CATEGORY 3D1 371](https://studyquests.github.io/category-3d1-371.html)
- [BUNNYHOP AND SURF MAPS](https://learnquesters.pages.dev/bunnyhop-and-surf-maps.html)
- [INDEX25](https://thelearnquesters.pages.dev/index25.html)
- [OBBY PARKOUR RACING](https://quizverses-9d2f2.web.app/obby-parkour-racing.html)
- [ANIMAL RACING IDLE PARK](https://quizverses.github.io/animal-racing-idle-park.html)
- [QUBE 2048 ELF](https://quizverses.github.io/qube-2048-elf.html)
- [CATEGORY CAN T STOP PLAYING215](https://thelearnquesters.pages.dev/category-can-t-stop-playing215.html)
- [CATEGORY UNBLOCKED](https://quizverses-9d2f2.web.app/category-unblocked.html)
- [CATEGORY POOL](https://learnquester.github.io/category-pool.html)
- [INDEX6](https://learnquester.pages.dev/index6.html)
- [ANTS PARTY](https://studyquests.pages.dev/ants-party.html)
- [WAR OF GUN](https://studyplaying.github.io/war-of-gun.html)
- [MERGE 2048 CAKE](https://quizverses.github.io/merge-2048-cake.html)
- [INDEX15](https://thelearnquesters.pages.dev/index15.html)
- [CATEGORY CARDS](https://studyplaying.github.io/category-cards.html)
- [MOON LEAGUE SPORTS SEASON](https://studyplayings.pages.dev/moon-league-sports-season.html)
- [CATEGORY CAN T STOP PLAYING212](https://studyquests.github.io/category-can-t-stop-playing212.html)
- [CATEGORY CARTOON76](https://thelearnquesters.pages.dev/category-cartoon76.html)
- [YUMMY TALES 3](https://learnquester.github.io/yummy-tales-3.html)
- [ONLINE PORTAL](https://brainquests.onrender.com/)
- [CAMERAMAN VS TOILETS PUZZLE](https://learnquesters.pages.dev/cameraman-vs-toilets-puzzle.html)
- [VICE CITY DRIVER](https://studyquests.pages.dev/vice-city-driver.html)
- [COSMO VOID](https://learnquesters.pages.dev/cosmo-void.html)
- [SORT BALLS CONES](https://studyquests.pages.dev/sort-balls-cones.html)
- [ALPHABET MERGE AND FIGHT](https://learnquesters.pages.dev/alphabet-merge-and-fight.html)
- [PET DOCTOR BUSINESS TYCOON PET CARE GAME](https://studyquests.github.io/pet-doctor-business-tycoon-pet-care-game.html)
- [CATEGORY COOKING46](https://studyquests.github.io/category-cooking46.html)
- [TERMS](https://learnquester.github.io/terms.html)
- [ROBLOX CHRISTMAS DRESSUP](https://quizverses-9d2f2.web.app/roblox-christmas-dressup.html)
- [INDEX19](https://thelearnquesters.pages.dev/index19.html)
- [ROAD TO 7](https://quizverses-9d2f2.web.app/road-to-7.html)
- [CATEGORY ARENA255](https://studyplayings.web.app/category-arena255.html)
- [CATEGORY PIXEL313](https://quizverses-9d2f2.web.app/category-pixel313.html)
- [AUTUMN GLAM GALA](https://studyplayings.pages.dev/autumn-glam-gala.html)
- [CATEGORY COOKING](https://learnquester.github.io/category-cooking.html)
- [FRUIT MATCH JUICY PUZZLE](https://quizverses.pages.dev/fruit-match-juicy-puzzle.html)
