export default [
  '{{company.prefix}} {{person.female_first_name}}',
  '{{company.prefix}} {{person.male_first_name}}',
  '{{company.prefix}} {{person.male_last_name}}',
  '{{company.prefix}} {{company.suffix}}{{company.suffix}}',
  '{{company.prefix}} {{company.suffix}}{{company.suffix}}{{company.suffix}}',
  '{{company.prefix}} {{address.city_name}}{{company.suffix}}',
  '{{company.prefix}} {{address.city_name}}{{company.suffix}}{{company.suffix}}',
  '{{company.prefix}} {{address.city_name}}{{company.suffix}}{{company.suffix}}{{company.suffix}}',
];
