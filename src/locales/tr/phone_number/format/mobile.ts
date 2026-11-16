// BTK's public mobile and virtual mobile network prefixes.
const mobilePrefixes = [
  '501',
  '505',
  '506',
  '507',
  '510',
  '516',
  '53',
  '54',
  '551',
  '552',
  '553',
  '554',
  '555',
  '559',
  '561',
];

export default mobilePrefixes.map(
  (prefix) => `0${prefix}${'#'.repeat(10 - prefix.length)}`
);
