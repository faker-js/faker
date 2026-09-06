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
- [REAL FLIGHT SIMULATOR](https://themindplaying.web.app/real-flight-simulator.html)
- [DELTA FORCE AIRBORNE](https://learnquesters.pages.dev/delta-force-airborne.html)
- [SQUID GAME HUNTER](https://quizverses.pages.dev/squid-game-hunter.html)
- [CATEGORY INCREMENTAL](https://studyplayings.pages.dev/category-incremental.html)
- [CATEGORY BATTLE ROYALE25](https://studyplayings.pages.dev/category-battle-royale25.html)
- [BRAINROT BRIDGE RACE 3D](https://studyplayings.web.app/brainrot-bridge-race-3d.html)
- [CATEGORY SNAKE40](https://thelearnquester.web.app/category-snake40.html)
- [PAINT MASTER](https://studyquests.pages.dev/paint-master.html)
- [FASHION BATTLE FOR SURVIVAL](https://thelearnquester.web.app/fashion-battle-for-survival.html)
- [POPTROPICA](https://learnquester.github.io/poptropica.html)
- [MERGE SMITH](https://learnquesters.pages.dev/merge-smith.html)
- [SNAKE PUZZLE SLITHER TO EAT](https://learnquester.github.io/snake-puzzle-slither-to-eat.html)
- [ANIMAL RACING IDLE PARK](https://learnquesters.pages.dev/animal-racing-idle-park.html)
- [DEADFLIP FRENZY](https://studyplaying.github.io/deadflip-frenzy.html)
- [MOJICON EMOJI CONNECT](https://studyquests.pages.dev/mojicon-emoji-connect.html)
- [CATEGORY BIKE 2](https://studyplayings.web.app/category-bike-2.html)
- [SHAPE TRANSFORMING SHIFTING RUN](https://studyquesthub.web.app/shape-transforming-shifting-run.html)
- [HOLE AND FILL COLLECT MASTER](https://quizverses-9d2f2.web.app/hole-and-fill-collect-master.html)
- [HOLE AND FILL COLLECT MASTER](https://studyquesthub.web.app/hole-and-fill-collect-master.html)
- [GIRL COLORING DRESS UP GAMES](https://quizverses-9d2f2.web.app/girl-coloring-dress-up-games.html)
- [GOTHIC KNIFE](https://studyquests.pages.dev/gothic-knife.html)
- [MONSTER IMPACT](https://learnquester.github.io/monster-impact.html)
- [NUMBER TUBES](https://quizverses-9d2f2.web.app/number-tubes.html)
- [TILES MATCHING](https://learnquester.github.io/tiles-matching.html)
- [FIRESIDE SOLITAIRE](https://studyplaying.github.io/fireside-solitaire.html)
- [SLINGSHOT FORTRESS](https://learnquesters.pages.dev/slingshot-fortress.html)
- [HAWAII MATCH 6](https://quizverses-9d2f2.web.app/hawaii-match-6.html)
- [SHELF SHIFT MATCH](https://studyquests.pages.dev/shelf-shift-match.html)
- [TOPSY TURVY](https://learnquester.github.io/topsy-turvy.html)
- [HAPPY MONSTERS 2](https://learnquesters.pages.dev/happy-monsters-2.html)
- [CATEGORY 2D1 070](https://studyplaying.github.io/category-2d1-070.html)
- [SAND SORT COLOR PUZZLE GAME](https://studyquesthub.web.app/sand-sort-color-puzzle-game.html)
- [BLOCKY ARCHER RUN](https://learnquesters.pages.dev/blocky-archer-run.html)
- [CAR JAM TRAFFIC PUZZLE](https://studyquesthub.web.app/car-jam-traffic-puzzle.html)
- [ANGRY CITY SMASHER](https://studyplaying.github.io/angry-city-smasher.html)
- [BARBEE BLACK FRIDAY FASHION](https://quizverses-9d2f2.web.app/barbee-black-friday-fashion.html)
- [SQUAD ASSEMBLER](https://learnquester.github.io/squad-assembler.html)
- [HOBO SPEEDSTER](https://learnquesters.pages.dev/hobo-speedster.html)
- [ZOO SHAP](https://quizverses-9d2f2.web.app/zoo-shap.html)
- [CATEGORY SOCCER 2](https://studyplaying.github.io/category-soccer-2.html)
- [CHICKEN BANANA RUN](https://studyquests.pages.dev/chicken-banana-run.html)
- [AUTUMN GLAM GALA](https://studyplaying.github.io/autumn-glam-gala.html)
- [NONOGRAM DAILY](https://studyplaying.github.io/nonogram-daily.html)
- [SPIN SHOT SIEGE](https://quizverses-9d2f2.web.app/spin-shot-siege.html)
- [BUBBLE SHOOTER NEON](https://studyquesthub.web.app/bubble-shooter-neon.html)
- [CATEGORY RPG](https://studyquests.pages.dev/category-rpg.html)
- [K POP PUZZLE HUNTERS](https://learnquesters.pages.dev/k-pop-puzzle-hunters.html)
- [SNAKE 2048IO](https://quizverses-9d2f2.web.app/snake-2048io.html)
- [HOME ISLAND](https://learnquester.github.io/home-island.html)
- [SAILOR CHIC VS PIRATE CHARM](https://studyquesthub.web.app/sailor-chic-vs-pirate-charm.html)
- [LABUBU JETPACK RUSH](https://studyquesthub.web.app/labubu-jetpack-rush.html)
- [BR BR PATAPIM OBBY CHALLENGE](https://studyquesthub.web.app/br-br-patapim-obby-challenge.html)
- [WAVE CHIC OCEAN FASHION FRENZY](https://quizverses-9d2f2.web.app/wave-chic-ocean-fashion-frenzy.html)
- [BUS JAM ESCAPE](https://studyplaying.github.io/bus-jam-escape.html)
- [PUZZLE LAB](https://studyquesthub.web.app/puzzle-lab.html)
- [LOOP GHOST](https://studyquests.pages.dev/loop-ghost.html)
- [CATEGORY CAR](https://studyplayings.web.app/category-car.html)
- [FLIP IT 3D](https://quizverses-9d2f2.web.app/flip-it-3d.html)
- [BLOCK CRAFT 3D SCHOOL](https://learnquesters.pages.dev/block-craft-3d-school.html)
- [DOG MERGE MANIA](https://studyplaying.github.io/dog-merge-mania.html)
- [NETQUEL COM](https://learnquesters.pages.dev/netquel-com.html)
- [CATEGORY LANSCHOOL](https://studyplaying.github.io/category-lanschool.html)
- [MONA LISA FASHION EXPERIMENTS](https://learnquester.github.io/mona-lisa-fashion-experiments.html)
- [PAINT SPONGES PUZZLE](https://quizverses-9d2f2.web.app/paint-sponges-puzzle.html)
- [CATEGORY SCRATCH17](https://quizverses-9d2f2.web.app/category-scratch17.html)
- [WORD GAME 2026](https://learnquester.github.io/word-game-2026.html)
- [CATEGORY TOWER DEFENSE 2](https://studyplaying.github.io/category-tower-defense-2.html)
- [THREAD MATCH](https://quizverses-9d2f2.web.app/thread-match.html)
- [BASKET SPORT STARS](https://studyplayings.web.app/basket-sport-stars.html)
- [STICK COLOR WAR](https://quizverses-9d2f2.web.app/stick-color-war.html)
- [PATTERNS](https://quizverses-9d2f2.web.app/patterns.html)
- [CATEGORY PROXY](https://studyplayings.pages.dev/category-proxy.html)
- [THE ROMAN EMPIRE COLOSSEUM](https://quizverses-9d2f2.web.app/the-roman-empire-colosseum.html)
- [MERGE WAR](https://learnquesters.pages.dev/merge-war.html)
- [MERGE COMBO](https://studyplaying.github.io/merge-combo.html)
- [STEAL BRAINROT DUEL](https://quizverses-9d2f2.web.app/steal-brainrot-duel.html)
- [INDEX4](https://studyplayings.pages.dev/index4.html)
- [REAL MOTORBIKE SIMULATOR RACE 3D](https://quizverses-9d2f2.web.app/real-motorbike-simulator-race-3d.html)
- [INDEX5](https://studyquesthub.web.app/index5.html)
- [CATEGORY PUZZLE](https://studyplaying.github.io/category-puzzle.html)
- [WAVE ROAD 3D](https://studyquesthub.web.app/wave-road-3d.html)
- [CATEGORY MATCH 3117](https://quizverses.pages.dev/category-match-3117.html)
- [CATEGORY SOCCER60](https://studyplaying.github.io/category-soccer60.html)
- [BANG BANG MAHJONG](https://studyquests.github.io/bang-bang-mahjong.html)
- [KINGDOM WARS TD](https://studyplaying.github.io/kingdom-wars-td.html)
- [REAL STREET FIGHTER 3D](https://learnquesters.pages.dev/real-street-fighter-3d.html)
- [INDEX12](https://studyquests.github.io/index12.html)
- [CARD MASTER](https://quizverses-9d2f2.web.app/card-master.html)
- [CATEGORY IDLE448](https://studyplaying.github.io/category-idle448.html)
- [LIGHTS OUT](https://quizverses.pages.dev/lights-out.html)
- [GOODS TRIPLE MATCH 3D](https://studyquests.pages.dev/goods-triple-match-3d.html)
- [CATEGORY AVOID295](https://studyplayings.web.app/category-avoid295.html)
- [CATEGORY CASUAL 9](https://studyquests.github.io/category-casual-9.html)
- [ROBBIE STAND ON THE RIGHT COLOR](https://quizverses.pages.dev/robbie-stand-on-the-right-color.html)
- [FROG BYTE](https://studyquests.github.io/frog-byte.html)
- [CATEGORY POINT AND CLICK123](https://studyplayings.pages.dev/category-point-and-click123.html)
- [CATEGORY TURN BASED30](https://studyplaying.github.io/category-turn-based30.html)
- [SLAP AND RUN](https://quizverses.pages.dev/slap-and-run.html)
- [CATEGORY MINECRAFT81](https://studyplayings.pages.dev/category-minecraft81.html)
- [COLLECT HONEY PUZZLE](https://learnquesters.pages.dev/collect-honey-puzzle.html)
- [SUSHI PUZZLE](https://learnquesters.pages.dev/sushi-puzzle.html)
- [JEWEL COLORING](https://learnquesters.pages.dev/jewel-coloring.html)
- [CATEGORY SPOT THE DIFFERENCE](https://studyplayings.pages.dev/category-spot-the-difference.html)
- [CANDY RAIN 5](https://studyquests.github.io/candy-rain-5.html)
- [OBBY TOWER](https://learnquester.github.io/obby-tower.html)
- [MAD TRUCK](https://learnquesters.pages.dev/mad-truck.html)
- [PAWS OFF MY CLUES](https://learnquesters.pages.dev/paws-off-my-clues.html)
- [ROLLING BALLS SEA RACE](https://learnquester.github.io/rolling-balls-sea-race.html)
- [ASMR NAIL TREATMENT](https://studyplaying.github.io/asmr-nail-treatment.html)
- [CRYPTO GALS TIKTOK FASHION](https://learnquester.github.io/crypto-gals-tiktok-fashion.html)
- [MAHJONG RIDDLES EGYPT](https://studyquests.github.io/mahjong-riddles-egypt.html)
- [MOON LEAGUE SPORTS SEASON](https://learnquester.github.io/moon-league-sports-season.html)
- [ITALIAN BRAINROT CLICKER](https://quizverses-9d2f2.web.app/italian-brainrot-clicker.html)
- [WORD STARS](https://learnquester.github.io/word-stars.html)
- [CATEGORY CASUAL971](https://studyplaying.github.io/category-casual971.html)
- [DOWNHILL CAR RIDE CRASH TEST](https://studyplayings.web.app/downhill-car-ride-crash-test.html)
- [ROYAL GARDEN MATCH](https://studyquests.pages.dev/royal-garden-match.html)
- [SANTA VS SKRITCH](https://learnquester.github.io/santa-vs-skritch.html)
- [LINK FLOW](https://thelearnquester.web.app/link-flow.html)
- [NINJA OBBY PARKOUR](https://studyplaying.github.io/ninja-obby-parkour.html)
- [SUPER TANK WRESTLE](https://studyplaying.github.io/super-tank-wrestle.html)
- [SANTA GO](https://studyplaying.github.io/santa-go.html)
- [MERGE GALAXY](https://studyquests.pages.dev/merge-galaxy.html)
- [HERO TOWER WAR](https://learnquesters.pages.dev/hero-tower-war.html)
- [OVERFLOWING PALETTE](https://studyquesthub.web.app/overflowing-palette.html)
- [CATEGORY CONTROLLER 2](https://studyplaying.github.io/category-controller-2.html)
- [CATEGORY RACING DRIVING](https://learnquester.github.io/category-racing-driving.html)
- [3D BLOCK GLADIATOR SWORD DRAW](https://learnquesters.pages.dev/3d-block-gladiator-sword-draw.html)
- [LAST DAY ON EARTH SURVIVAL](https://thelearnquester.web.app/last-day-on-earth-survival.html)
- [PRISON MASTER ESCAPE JOURNEY](https://studyplayings.pages.dev/prison-master-escape-journey.html)
