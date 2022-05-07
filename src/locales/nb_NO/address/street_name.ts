export default [
  '{{address.street_root}}{{address.street_suffix}}',
  '{{address.street_prefix}} {{address.street_root}}{{address.street_suffix}}',
  '{{name.first_name}}{{address.common_street_suffix}}',
  '{{name.last_name}}{{address.common_street_suffix}}',
];
