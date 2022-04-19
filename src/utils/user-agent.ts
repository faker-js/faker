/**
 * Copyright (c) 2022 Faker
 *
 * This is a version of the original code migrated to TypeScript and modified
 * by the Faker team.
 *
 * Check LICENSE for more details about the copyright.
 *
 * -----------------------------------------------------------------------------
 *
 * Copyright (c) 2012-2014 Jeffrey Mealo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * -----------------------------------------------------------------------------
 *
 * Based loosely on Luka Pusic's PHP Script:
 * http://360percents.com/posts/php-random-user-agent-generator/
 *
 * The license for that script is as follows:
 *
 * "THE BEER-WARE LICENSE" (Revision 42):
 *
 * <pusic93@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return. Luka Pusic
 */

import type { Faker } from '..';

export type Arch = 'lin' | 'mac' | 'win';

export function generate(faker: Faker): string {
  function rnd(
    a?: string[] | number | Record<string, number>,
    b?: number
  ): string | number {
    //calling rnd() with no arguments is identical to rnd(0, 100)
    a = a || 0;
    b = b || 100;

    if (typeof b === 'number' && typeof a === 'number') {
      // 9/2018 - Added faker random to ensure mersenne and seed
      return faker.datatype.number({ min: a, max: b });
    }

    if (Array.isArray(a)) {
      //returns a random element from array (a), even weighting
      return faker.random.arrayElement(a);
    }

    if (a && typeof a === 'object') {
      //returns a random key from the passed object; keys are weighted by the decimal probability in their value
      return ((obj) => {
        const rand = (rnd(0, 100) as number) / 100;
        let min = 0;
        let max = 0;
        let return_val: string;

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            max = obj[key] + min;
            return_val = key;
            if (rand >= min && rand <= max) {
              break;
            }
            min = min + obj[key];
          }
        }

        return return_val;
      })(a);
    }

    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Invalid arguments passed to rnd. (${b ? `${a}, ${b}` : a})`
    );
  }

  function randomLang(): string | number {
    return rnd([
      'AB',
      'AF',
      'AN',
      'AR',
      'AS',
      'AZ',
      'BE',
      'BG',
      'BN',
      'BO',
      'BR',
      'BS',
      'CA',
      'CE',
      'CO',
      'CS',
      'CU',
      'CY',
      'DA',
      'DE',
      'EL',
      'EN',
      'EO',
      'ES',
      'ET',
      'EU',
      'FA',
      'FI',
      'FJ',
      'FO',
      'FR',
      'FY',
      'GA',
      'GD',
      'GL',
      'GV',
      'HE',
      'HI',
      'HR',
      'HT',
      'HU',
      'HY',
      'ID',
      'IS',
      'IT',
      'JA',
      'JV',
      'KA',
      'KG',
      'KO',
      'KU',
      'KW',
      'KY',
      'LA',
      'LB',
      'LI',
      'LN',
      'LT',
      'LV',
      'MG',
      'MK',
      'MN',
      'MO',
      'MS',
      'MT',
      'MY',
      'NB',
      'NE',
      'NL',
      'NN',
      'NO',
      'OC',
      'PL',
      'PT',
      'RM',
      'RO',
      'RU',
      'SC',
      'SE',
      'SK',
      'SL',
      'SO',
      'SQ',
      'SR',
      'SV',
      'SW',
      'TK',
      'TR',
      'TY',
      'UK',
      'UR',
      'UZ',
      'VI',
      'VO',
      'YI',
      'ZH',
    ]);
  }

  function randomBrowserAndOS(): Array<string | number> {
    const browser = rnd({
      chrome: 0.45132810566,
      iexplorer: 0.27477061836,
      firefox: 0.19384170608,
      safari: 0.06186781118,
      opera: 0.01574236955,
    });
    const os = {
      chrome: { win: 0.89, mac: 0.09, lin: 0.02 },
      firefox: { win: 0.83, mac: 0.16, lin: 0.01 },
      opera: { win: 0.91, mac: 0.03, lin: 0.06 },
      safari: { win: 0.04, mac: 0.96 },
      iexplorer: ['win'],
    };

    return [browser, rnd(os[browser])];
  }

  function randomProc(arch: Arch): string | number {
    const procs = {
      lin: ['i686', 'x86_64'],
      mac: { Intel: 0.48, PPC: 0.01, 'U; Intel': 0.48, 'U; PPC': 0.01 },
      win: ['', 'WOW64', 'Win64; x64'],
    };
    return rnd(procs[arch]);
  }

  function randomRevision(dots: number): string {
    let return_val = '';
    //generate a random revision
    //dots = 2 returns .x.y where x & y are between 0 and 9
    for (let x = 0; x < dots; x++) {
      return_val += `.${rnd(0, 9)}`;
    }
    return return_val;
  }

  const version_string = {
    net() {
      return [rnd(1, 4), rnd(0, 9), rnd(10000, 99999), rnd(0, 9)].join('.');
    },
    nt() {
      return `${rnd(5, 6)}.${rnd(0, 3)}`;
    },
    ie() {
      return rnd(7, 11);
    },
    trident() {
      return `${rnd(3, 7)}.${rnd(0, 1)}`;
    },
    osx(delim?: string) {
      return [10, rnd(5, 10), rnd(0, 9)].join(delim || '.');
    },
    chrome() {
      return [rnd(13, 39), 0, rnd(800, 899), 0].join('.');
    },
    presto() {
      return `2.9.${rnd(160, 190)}`;
    },
    presto2() {
      return `${rnd(10, 12)}.00`;
    },
    safari() {
      return `${rnd(531, 538)}.${rnd(0, 2)}.${rnd(0, 2)}`;
    },
  };

  const browser = {
    firefox(arch: Arch): string {
      //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
      const firefox_ver = `${rnd(5, 15)}${randomRevision(2)}`,
        gecko_ver = `Gecko/20100101 Firefox/${firefox_ver}`,
        proc = randomProc(arch),
        os_ver =
          arch === 'win'
            ? `(Windows NT ${version_string.nt()}${proc ? `; ${proc}` : ''}`
            : arch === 'mac'
            ? `(Macintosh; ${proc} Mac OS X ${version_string.osx()}`
            : `(X11; Linux ${proc}`;

      return `Mozilla/5.0 ${os_ver}; rv:${firefox_ver.slice(
        0,
        -2
      )}) ${gecko_ver}`;
    },

    iexplorer(): string {
      const ver = version_string.ie();

      if (ver >= 11) {
        //http://msdn.microsoft.com/en-us/library/ie/hh869301(v=vs.85).aspx
        return `Mozilla/5.0 (Windows NT 6.${rnd(1, 3)}; Trident/7.0; ${rnd([
          'Touch; ',
          '',
        ])}rv:11.0) like Gecko`;
      }

      //http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx
      return `Mozilla/5.0 (compatible; MSIE ${ver}.0; Windows NT ${version_string.nt()}; Trident/${version_string.trident()}${
        rnd(0, 1) === 1 ? `; .NET CLR ${version_string.net()}` : ''
      })`;
    },

    opera(arch: Arch): string {
      //http://www.opera.com/docs/history/
      const presto_ver = ` Presto/${version_string.presto()} Version/${version_string.presto2()})`,
        os_ver =
          arch === 'win'
            ? `(Windows NT ${version_string.nt()}; U; ${randomLang()}${presto_ver}`
            : arch === 'lin'
            ? `(X11; Linux ${randomProc(arch)}; U; ${randomLang()}${presto_ver}`
            : `(Macintosh; Intel Mac OS X ${version_string.osx()} U; ${randomLang()} Presto/${version_string.presto()} Version/${version_string.presto2()})`;

      return `Opera/${rnd(9, 14)}.${rnd(0, 99)} ${os_ver}`;
    },

    safari(arch: Arch): string {
      const safari = version_string.safari(),
        ver = `${rnd(4, 7)}.${rnd(0, 1)}.${rnd(0, 10)}`,
        os_ver =
          arch === 'mac'
            ? `(Macintosh; ${randomProc('mac')} Mac OS X ${version_string.osx(
                '_'
              )} rv:${rnd(2, 6)}.0; ${randomLang()}) `
            : `(Windows; U; Windows NT ${version_string.nt()})`;

      return `Mozilla/5.0 ${os_ver}AppleWebKit/${safari} (KHTML, like Gecko) Version/${ver} Safari/${safari}`;
    },

    chrome(arch: Arch): string {
      const safari = version_string.safari(),
        os_ver =
          arch === 'mac'
            ? `(Macintosh; ${randomProc('mac')} Mac OS X ${version_string.osx(
                '_'
              )}) `
            : arch === 'win'
            ? `(Windows; U; Windows NT ${version_string.nt()})`
            : `(X11; Linux ${randomProc(arch)}`;

      return `Mozilla/5.0 ${os_ver} AppleWebKit/${safari} (KHTML, like Gecko) Chrome/${version_string.chrome()} Safari/${safari}`;
    },
  };

  const random = randomBrowserAndOS();
  return browser[random[0]](random[1]);
}
