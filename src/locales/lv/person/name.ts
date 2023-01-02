export default [
  {
    value: '{{person.prefix}} {{person.first_name}} {{person.last_name}}',
    weight: 1,
  },
  {
    value: '{{person.first_name}} {{person.last_name}} {{person.suffix}}',
    weight: 1,
  },
  { value: '{{person.first_name}} {{person.last_name}}', weight: 7 },
  { value: '{{person.last_name}} {{person.first_name}}', weight: 2 },
  {
    value: '{{person.first_name}} {{person.first_name}} {{person.last_name}}',
    weight: 2,
  },
  {
    value: '{{person.first_name}} {{person.last_name}}-{{person.last_name}}',
    weight: 2,
  },
];
