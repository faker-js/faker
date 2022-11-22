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

import type { Faker } from '../..';

type OS = 'lin' | 'mac' | 'win';

type Browser = 'chrome' | 'iexplorer' | 'firefox' | 'safari' | 'opera';

/**
 * Generates a random user-agent.
 *
 * @param faker An existing faker instance.
 */
export function generate(faker: Faker): string {
  const weightedKeyFromObject = <T extends Record<string, number>>(
    obj: T
  ): keyof T => {
    //returns a random key from the passed object; keys are weighted by the decimal probability in their value
    const rand = faker.number.int(100) / 100;
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
  };

  const randomLang = (): string =>
    faker.helpers.arrayElement([
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

  const randomBrowserAndOS = (): [Browser, OS] => {
    const browser: Browser = weightedKeyFromObject({
      chrome: 0.45132810566,
      iexplorer: 0.27477061836,
      firefox: 0.19384170608,
      safari: 0.06186781118,
      opera: 0.01574236955,
    });
    const os: OS = weightedKeyFromObject(
      {
        chrome: { win: 0.89, mac: 0.09, lin: 0.02 },
        firefox: { win: 0.83, mac: 0.16, lin: 0.01 },
        opera: { win: 0.91, mac: 0.03, lin: 0.06 },
        safari: { win: 0.04, mac: 0.96 },
        iexplorer: { win: 1 },
      }[browser]
    );

    return [browser, os];
  };

  const randomProc = (arch: OS): string => {
    const procs = {
      lin: ['i686', 'x86_64'],
      mac: { Intel: 0.48, PPC: 0.01, 'U; Intel': 0.48, 'U; PPC': 0.01 },
      win: ['', 'WOW64', 'Win64; x64'],
    };
    const archValue = procs[arch];
    const proc = Array.isArray(archValue)
      ? faker.helpers.arrayElement(archValue)
      : weightedKeyFromObject(archValue);

    return proc;
  };

  const randomRevision = (dots: number): string => {
    let return_val = '';
    //generate a random revision
    //dots = 2 returns .x.y where x & y are between 0 and 9
    for (let x = 0; x < dots; x++) {
      return_val += `.${faker.string.numeric({ allowLeadingZeros: true })}`;
    }
    return return_val;
  };

  const version_string = {
    net() {
      return [
        faker.number.int({ min: 1, max: 4 }),
        faker.number.int(9),
        faker.number.int({ min: 10000, max: 99999 }),
        faker.number.int(9),
      ].join('.');
    },
    nt() {
      return [faker.number.int({ min: 5, max: 6 }), faker.number.int(3)].join(
        '.'
      );
    },
    ie() {
      return faker.number.int({ min: 7, max: 11 });
    },
    trident() {
      return [faker.number.int({ min: 3, max: 7 }), faker.number.int(1)].join(
        '.'
      );
    },
    osx(delim?: string) {
      return [
        10,
        faker.number.int({ min: 5, max: 10 }),
        faker.number.int(9),
      ].join(delim || '.');
    },
    chrome() {
      return [
        faker.number.int({ min: 13, max: 39 }),
        0,
        faker.number.int({ min: 800, max: 899 }),
        0,
      ].join('.');
    },
    presto() {
      return `2.9.${faker.number.int({ min: 160, max: 190 })}`;
    },
    presto2() {
      return `${faker.number.int({ min: 10, max: 12 })}.00`;
    },
    safari() {
      return [
        faker.number.int({ min: 531, max: 538 }),
        faker.number.int(2),
        faker.number.int(2),
      ].join('.');
    },
  };

  const browserMap = {
    firefox(arch: OS): string {
      //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
      const firefox_ver = `${faker.number.int({
          min: 5,
          max: 15,
        })}${randomRevision(2)}`,
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
        return `Mozilla/5.0 (Windows NT 6.${faker.number.int({
          min: 1,
          max: 3,
        })}; Trident/7.0; ${
          faker.datatype.boolean() ? 'Touch; ' : ''
        }rv:11.0) like Gecko`;
      }

      //http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx
      return `Mozilla/5.0 (compatible; MSIE ${ver}.0; Windows NT ${version_string.nt()}; Trident/${version_string.trident()}${
        faker.datatype.boolean() ? `; .NET CLR ${version_string.net()}` : ''
      })`;
    },

    opera(arch: OS): string {
      //http://www.opera.com/docs/history/
      const presto_ver = ` Presto/${version_string.presto()} Version/${version_string.presto2()})`,
        os_ver =
          arch === 'win'
            ? `(Windows NT ${version_string.nt()}; U; ${randomLang()}${presto_ver}`
            : arch === 'lin'
            ? `(X11; Linux ${randomProc(arch)}; U; ${randomLang()}${presto_ver}`
            : `(Macintosh; Intel Mac OS X ${version_string.osx()} U; ${randomLang()} Presto/${version_string.presto()} Version/${version_string.presto2()})`;

      return `Opera/${faker.number.int({
        min: 9,
        max: 14,
      })}.${faker.number.int(99)} ${os_ver}`;
    },

    safari(arch: OS): string {
      const safari = version_string.safari(),
        ver = `${faker.number.int({
          min: 4,
          max: 7,
        })}.${faker.number.int(1)}.${faker.number.int(10)}`,
        os_ver =
          arch === 'mac'
            ? `(Macintosh; ${randomProc('mac')} Mac OS X ${version_string.osx(
                '_'
              )} rv:${faker.number.int({
                min: 2,
                max: 6,
              })}.0; ${randomLang()}) `
            : `(Windows; U; Windows NT ${version_string.nt()})`;

      return `Mozilla/5.0 ${os_ver}AppleWebKit/${safari} (KHTML, like Gecko) Version/${ver} Safari/${safari}`;
    },

    chrome(arch: OS): string {
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

  const [browser, arch] = randomBrowserAndOS();
  return browserMap[browser](arch);
}
