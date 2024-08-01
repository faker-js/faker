export default [
  '{{location.city_prefix}} {{person.last_name.generic}}{{location.city_suffix}}',
  '{{location.city_prefix}} {{person.last_name.generic}}',
  '{{person.last_name.generic}}{{location.city_suffix}}',
  '{{person.last_name.generic}}{{location.city_infix}}{{person.last_name.generic}}',
];
