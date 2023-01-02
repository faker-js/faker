export default [
  { value: '{{person.first_name}} {{person.last_name}}', weight: 49 },
  {
    value: '{{person.prefix}} {{person.first_name}} {{person.last_name}}',
    weight: 7,
  },
  {
    value: '{{person.first_name}} {{person.last_name}} {{person.suffix}}',
    weight: 7,
  },
  {
    value:
      '{{person.prefix}} {{person.first_name}} {{person.last_name}} {{person.suffix}}',
    weight: 1,
  },
];
