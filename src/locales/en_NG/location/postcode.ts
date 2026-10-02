// Nigerian postcodes have 11 characters, e.g. 'EK-01-A03-FK-01':
// state (2 letters), LGA (2 digits), district (3 letters or digits),
// area (2 letters) and building unit (2 digits).
// The LGA and unit segments run from 01 to 99. NIPOST never uses 00,
// so the numbers are listed instead of generated with '##'.
// See https://docs.postcode.gov.ng/concepts/postcode-format
const numbers = Array.from({ length: 99 }, (_, index) =>
  String(index + 1).padStart(2, '0')
);

export default numbers.flatMap((lga) =>
  numbers.map((unit) => `??-${lga}-?##-??-${unit}`)
);
