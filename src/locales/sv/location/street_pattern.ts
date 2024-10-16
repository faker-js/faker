export default [
  '{{location.street_name}}{{location.street_suffix}}',
  '{{location.street_prefix}} {{location.street_name}}{{location.street_suffix}}',
  '{{person.first_name.generic}}{{location.common_street_suffix}}',
  '{{person.last_name.generic}}{{location.common_street_suffix}}',
];
