export default [
  '{{person.male_first_name}} {{person.last_name}}',
  '{{person.last_name}} {{person.male_first_name}}',
  '{{person.prefix}} {{person.male_first_name}} {{person.last_name}}',
  '{{person.male_first_name}} {{person.last_name}}, {{person.suffix}}',
  '{{person.prefix}} {{person.male_first_name}} {{person.last_name}}, {{person.suffix}}',
  '{{person.female_first_name}} {{person.last_name}}',
  '{{person.last_name}} {{person.female_first_name}}',
  '{{person.prefix}} {{person.female_first_name}} {{person.last_name}}',
];
