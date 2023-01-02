export default [
  { value: '{{person.first_name}} {{person.last_name}}', weight: 9 },
  {
    value: '{{person.prefix}} {{person.first_name}} {{person.last_name}}',
    weight: 1,
  },
];
