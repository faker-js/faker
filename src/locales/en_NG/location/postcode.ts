/**
 * Nigerian postcodes have 11 letters and digits in five segments,
 * written with dashes, for example `EK-01-A03-FK-01`:
 *
 * - state: 2 letters
 * - LGA: 2 digits
 * - district: 3 letters or digits
 * - area: 2 letters
 * - unit: 2 digits
 *
 * NIPOST never uses `00` for the LGA or the unit,
 * so each pattern fixes the first digit of both to 1-9.
 *
 * @see https://docs.postcode.gov.ng/concepts/postcode-format
 */
const firstDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default firstDigits.flatMap((lga) =>
  firstDigits.map((unit) => `??-${lga}#-?##-??-${unit}#`)
);
