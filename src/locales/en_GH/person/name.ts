export default [
  { value: '{{person.first_name}} {{person.last_name}}', weight: 1 },
  {
    value: '{{person.first_name}} {{person.last_name}}-{{person.last_name}}',
    weight: 1,
  },
];
