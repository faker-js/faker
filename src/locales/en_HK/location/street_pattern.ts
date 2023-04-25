// Hong Kong has a mix of street names
// Some are English, for example "Argyle Street"
// Some are Cantonese, usually with two syllables and an English suffix, e.g. "Choi Wan Road"
// Real life examples: https://geographic.org/streetview/hong_kong/index.html
export default [
  '{{location.street_english_part}} {{location.street_suffix}}',
  '{{location.street_cantonese_part}} {{location.street_cantonese_part}} {{location.street_suffix}}',
];
