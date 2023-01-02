export default [
  {
    value: '{{person.prefix}} {{person.last_name}} {{person.first_name}}',
    weight: 1,
  },
  { value: '{{person.last_name}} {{person.first_name}}', weight: 9 },
];
