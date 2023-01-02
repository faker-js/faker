export default [
  {
    value: '{{person.prefix}} {{person.first_name}} {{person.last_name}}',
    weight: 1,
  },
  {
    value: '{{person.first_name}} {{person.middle_name}} {{person.last_name}}',
    weight: 2,
  },
  { value: '{{person.first_name}} {{person.last_name}}', weight: 5 },
];
