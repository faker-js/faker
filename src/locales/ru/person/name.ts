export default [
  { value: '{{person.first_name}} {{person.last_name}}', weight: 1 },
  { value: '{{person.last_name}} {{person.first_name}}', weight: 1 },
  {
    value: '{{person.first_name}} {{person.middle_name}} {{person.last_name}}',
    weight: 1,
  },
  {
    value: '{{person.last_name}} {{person.first_name}} {{person.middle_name}}',
    weight: 1,
  },
];
