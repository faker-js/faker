// Canadian postal codes alternate letters and digits, e.g. 'K1A 0B1'. The
// letters D, F, I, O, Q and U are never used, because they are easily confused
// with other characters when scanned. W and Z are additionally excluded from
// the first position, which identifies the postal district.
// See #1416 and https://en.wikipedia.org/wiki/Postal_codes_in_Canada
const letters = [
  'A',
  'B',
  'C',
  'E',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'R',
  'S',
  'T',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const firstLetters = letters.filter(
  (letter) => letter !== 'W' && letter !== 'Z'
);

export default firstLetters.flatMap((first) =>
  letters.flatMap((second) =>
    letters.map((third) => `${first}#${second} #${third}#`)
  )
);
